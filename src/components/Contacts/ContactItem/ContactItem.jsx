import { PropTypes } from 'prop-types';
import { ItemContact, BtnDelete } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, handleContactDelete }) => {
  return (
    <ItemContact>
      {name} : {number}
      <BtnDelete
        onClick={() => {
          handleContactDelete(id);
        }}
      >
        Delete
      </BtnDelete>
    </ItemContact>
  );
};

ContactItem.prototype = {
  id: PropTypes.string.isRequried,
  name: PropTypes.string.isRequried,
  number: PropTypes.string.isRequried,
  handleContactDelete: PropTypes.func.isRequried,
};
