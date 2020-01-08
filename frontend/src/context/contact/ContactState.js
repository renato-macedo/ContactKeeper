import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

function ContactState(props) {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2221',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact

  function addContact(contact) {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  }

  // delete contact

  function deleteContact(contactId) {
    dispatch({
      type: DELETE_CONTACT,
      payload: contactId
    });
  }

  // set current contact
  function setCurrentContact(contact) {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  }

  // clear current contact
  function clearCurrentContact() {
    dispatch({
      type: CLEAR_CURRENT
    });
  }
  // update contact

  function updateContact(contact) {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  }

  // filter contacts

  function filterContacts(text) {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  }

  // clear filter
  function clearFilter() {
    dispatch({
      type: CLEAR_FILTER,
      payload: null
    });
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
