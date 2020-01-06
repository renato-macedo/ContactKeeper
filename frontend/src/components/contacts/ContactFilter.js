import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export default function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  useEffect(() => {
    if (contactContext.filtered === null) {
      text.current.value = "";
    }
  });

  function onChange(e) {
    if (text.current.value !== "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
}
