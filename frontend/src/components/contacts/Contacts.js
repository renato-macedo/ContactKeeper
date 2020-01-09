import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../../components/layout/Spinner';

export default function Contacts() {
  const contactContext = useContext(ContactContext);
  const { setAlert } = useContext(AlertContext);
  console.log(contactContext);

  const {
    contacts,
    filtered,
    getContacts,
    error,
    clearErrors,
    loading
  } = contactContext;

  useEffect(() => {
    async function loadContacts() {
      await getContacts();
    }
    loadContacts();
  }, []);
  useEffect(() => {
    if (error) {
      console.log('aaaaaa');
      setAlert(error, 'danger');
      clearErrors();
    } else {
      console.log('bbbbbb');
    }
  }, [error]);
  if (contacts && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}
