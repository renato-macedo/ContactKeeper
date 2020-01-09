import React, { useReducer } from 'react';

import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  UPDATE_ERROR,
  GET_CONTACTS,
  CLEAR_ERRORS,
  CLEAR_CONTACTS
} from '../types';

function ContactState(props) {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get contacts

  async function getContacts() {
    try {
      const response = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.error
      });
    }
  }

  // Add contact

  async function addContact(contact) {
    try {
      const response = await axios.post('/api/contacts', contact);
      dispatch({
        type: ADD_CONTACT,
        payload: response.data
      });
    } catch (error) {
      console.log('add error', error.response);
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.error });
    }
  }

  // delete contact

  async function deleteContact(contactId) {
    try {
      await axios.delete(`/api/contacts/${contactId}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: contactId
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.error
      });
    }
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

  async function updateContact(contact) {
    try {
      const response = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data
      });
    } catch (error) {
      console.log('sadassdasdas', error.response);
      dispatch({
        type: UPDATE_ERROR,
        payload: error.response.data.error
      });
    }
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
  // clear errors
  function clearErrors() {
    dispatch({
      type: CLEAR_ERRORS
    });
  }

  // clear contacts
  function clearContacts() {
    dispatch({
      type: CLEAR_CONTACTS
    });
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        clearErrors,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
