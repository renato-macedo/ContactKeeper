import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext'
import * as Yup from 'yup';
// import { Container } from './styles';

export default function ContactForm() {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrentContact, updateContact } = contactContext;
  
  
  
  useEffect(() => {
    if(current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })

  function onFieldChange(e) {
    return setContact({ ...contact, [e.target.name]: e.target.value })
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (current) {
      updateCurrentContact()
    } else {
      addContact()
    }
  }
  function addNewContact() {
   
    addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  }

  function updateCurrentContact() {

    updateContact(contact);

    clearCurrentContact();
  }

  function clearAll() {
    clearCurrentContact();
  }

  const {name, email, phone, type } = contact
  return (
  <form onSubmit={handleSubmit}>
    <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
    <input name="name" type="text" value={name} placeholder="Name" onChange={onFieldChange}/>
    <input name="email" type="email" value={email} placeholder="Email" onChange={onFieldChange} />
    <input name="phone" type="text" value={phone} placeholder="Phone" onChange={onFieldChange} />

    <h5>Contact type</h5>
    <input type="radio" name="type" onChange={onFieldChange}
      value="personal"
      checked={type==='personal'}
    />Personal{' '}

    <input type="radio" name="type" onChange={onFieldChange}
      value="professional"
      checked={type==='professional'}
    /> Professional
    <div>
      <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
    </div>
    {current && (
      <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>
      )}
  </form>
  );
}
