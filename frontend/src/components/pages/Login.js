import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import axios from 'axios';
import { proxy } from '../../../package.json'

// import { Container } from './styles';
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a email')
    .required('Custom required message', {
    }),
  password: Yup.string()
    .min(4)
    .required(),
});

export default function Login() {

  async function handleSubmit(data) {
    console.log(data)
    const response = await axios.post(proxy + '/api/auth', data);
    //console.log(response)
    //console.log(response.headers);
    console.log(response.data)
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <button type="submit">Login</button>
    </Form>
  );
}
