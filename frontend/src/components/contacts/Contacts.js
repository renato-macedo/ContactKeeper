import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

export default function Contact() {
  const contactContext = useContext(ContactContext);
  console.log(contactContext)
  
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map( contact => 
        <ContactItem key={contact.id} contact={contact} />
      )}
    </Fragment>
  );
}
