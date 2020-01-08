import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';

// import { Container } from './styles';

export default function ContactItem({ contact }) {
  const contactContext = useContext(ContactContext);

  const { id, name, email, phone, type } = contact;

  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact
  } = contactContext;

  function removeContact() {
    clearCurrentContact();
    deleteContact(id);
  }

  function updateContact() {
    setCurrentContact(contact);
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={updateContact}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={removeContact}>
          Delete
        </button>
      </p>
    </div>
  );
}
