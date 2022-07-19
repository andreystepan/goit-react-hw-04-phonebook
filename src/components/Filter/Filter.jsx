import { PropTypes } from 'prop-types';
import { Label } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      Find contacts by name
      <input value={value} onChange={onChange} />
    </Label>
  );
};

Filter.prototype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
