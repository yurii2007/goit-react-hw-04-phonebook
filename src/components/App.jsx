import { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useLocalStorage } from 'hooks/useLocalStorage';

const initializedState = [];
const LOCAL_STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    initializedState
  );
  const [filter, setFilter] = useState('');

  const handleAddContact = newContact => {
    const isExist = contacts.find(
      contact => newContact.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) return alert(`${newContact.name} is already in contacts`);
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    return [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    )
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts=>prevContacts.filter(({ id }) => id !== contactId));
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>You didn't have any contacts yet</p>
      ) : (
        <>
          <Filter onChange={handleFilter} />
          <ContactList
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
};
