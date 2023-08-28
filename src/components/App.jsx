import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import storage from 'utils/storage';

const LOCAL_STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLs = storage.load(LOCAL_STORAGE_KEY);
    if (contactsFromLs) this.setState({ contacts: [...contactsFromLs] });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts)
      storage.save(LOCAL_STORAGE_KEY, contacts);
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;
    const isExist = contacts.find(
      contact => newContact.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) return alert(`${newContact.name} is already in contacts`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const filteredContacts = [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <p>You didn't have any contacts yet</p>
        ) : (
          <>
            <Filter onChange={this.handleFilter} />
            <ContactList
              contacts={filteredContacts}
              onDelete={this.handleDeleteContact}
            />
          </>
        )}
      </div>
    );
  }
}
