import { useEffect, useState, useRef } from 'react';
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

  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = (name, number) => {
    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} is olready in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => {
      return [contact, ...prevContacts];
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.includes(normalizedFilter));
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
      </div>
      <ContactForm value={filter} onSubmit={addContact} />
      <div>
        <h2>Contacts</h2>
        <Filter onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          handleContactDelete={deleteContact}
        />
      </div>
    </>
  );
}
