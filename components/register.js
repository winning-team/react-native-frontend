import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import styled from 'styled-components';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Text>Register</Text>
      <StyledInput onChangeText={text => setUsername(text)} />
      <StyledInput onChangeText={text => setPassword(text)} />
      <Button title='Submit' color='blue' />
      <Text>Username: {username}</Text>
      <Text>Password: {password}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const StyledInput = styled.TextInput`
  padding: 10px;
  width: 200px;
  border: 1px solid red;
`;
