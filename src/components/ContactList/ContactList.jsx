import PropTypes from 'prop-types';

export const ContactList = ({contacts, onDelete}) => {
  return (
    <ul>
      {contacts.map(({id,name,number}) => {
        return (<li key={id}>
          {name}: {number}
          <button onClick={()=> onDelete(id)} type="button">Delete</button>
        </li>)
      })}
    </ul>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func.isRequired
}