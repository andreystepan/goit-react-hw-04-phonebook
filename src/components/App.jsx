import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './Contacts/ContactList';
import { Filter } from './Filter';

const LS_KEY = 'contacts';

export function App() {
  

 
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
    
    const [filter, setFilter] = useState('')
  
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

 const addContact = ({ name, number }) => {
    const existingContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (existingContact) {
      alert(`${name} is olready in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.includes(normalizedFilter));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <div>
          <h2>Phonebook</h2>
        </div>
        <ContactForm value={filter} onSubmit={this.addContact} />
        <div>
          <h2>Contacts</h2>
          <Filter onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            handleContactDelete={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
