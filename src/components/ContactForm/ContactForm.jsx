import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({name: '', number:'' });

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({...contact,id: nanoid()});
    setContact({ name: '', number: '' });
  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setContact({...contact,[name]: value})
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={contact.name}
          onChange={handleOnChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          value={contact.number}
          onChange={handleOnChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
