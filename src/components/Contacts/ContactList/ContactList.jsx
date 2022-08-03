import { ContactItem } from '../ContactItem/ContactItem';
import { PropTypes } from 'prop-types';
import { ListContacts } from './ContactList.styled';

export const ContactList = ({ contacts, handleContactDelete }) => {
  return (
    <ListContacts>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          handleContactDelete={handleContactDelete}
        />
      ))}
    </ListContacts>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleContactDelete: PropTypes.func.isRequired,
};
