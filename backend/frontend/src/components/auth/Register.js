import React, { useContext, useEffect } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required(),
  email: Yup.string()
    .email('Please enter a valid email')
    .max(100)
    .required('We need your email to continue', {}),
  password: Yup.string()
    .min(4, 'The password must have at least 4 character')
    .max(50)
    .required(),
  password2: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords are not equal')
    .required('Please confirm password')
});
export default function Register(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  console.log(authContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (localStorage.token || isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, props.history, isAuthenticated]); //

  function handleSubmit(data) {
    console.log(data);
    register(data);
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <Input type="password" name="password2" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </Form>
    </div>
  );
}
