import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
// import { Container } from './styles';
import AuthContext from '../../context/auth/AuthContext';
export default function Home() {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
}
