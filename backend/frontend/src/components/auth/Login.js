import React, { useContext, useEffect } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

// import { Container } from './styles';
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .max(100)
    .required('We need your email to continue', {}),
  password: Yup.string()
    .min(4, 'The password must have at least 4 character')
    .max(50)
    .required('Please type your password')
});
export default function Login(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated, loadUser } = authContext;
  const { setAlert } = alertContext;
  async function handleSubmit(data) {
    login(data);
  }

  useEffect(() => {
    if (localStorage.token) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history, authContext]);
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </Form>
    </div>
  );
}
