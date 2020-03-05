import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Dpad from '../assets/dpad.svg';
import styled from 'styled-components';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { axiosWithAuth } from './axiosWithAuth';
import { Input, Button } from 'react-native-elements';
import { background, buttonBg, lightGreen, brightGreen } from '../styles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('start');

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        'https://5d0cdb07.ngrok.io/api/login/',
        {
          username,
          password,
        },
      );
      if (data && data.key) {
        SecureStore.setItemAsync('token', data.key);
        setMessage('Login successful :)');
      } else {
        throw 'invalid username/password';
      }
    } catch (err) {
      setMessage('Invalid username/password :(');
      console.log(err);
    }
  };

  const getToken = async () => {
    const response = await SecureStore.getItemAsync('token');
    console.log('yeet', response);
  };

  const init = async () => {
    try {
      const axiosFunction = await axiosWithAuth();
      const { data } = await axiosFunction.get('api/adv/init');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {message !== 'start' && <Text style={styles.message}>{message}</Text>}
      <View style={styles.inputView}>
        <Input
          onChangeText={text => setUsername(text)}
          label='Username'
          labelStyle={styles.label}
          placeholder='Username'
          placeholderTextColor={lightGreen}
          leftIcon={{ type: 'font-awesome', name: 'user', color: lightGreen }}
          inputStyle={styles.input}
        />
        <Input
          onChangeText={text => setPassword(text)}
          label='Password'
          labelStyle={styles.label}
          placeholder='Password'
          placeholderTextColor={lightGreen}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: lightGreen }}
          inputStyle={styles.input}
        />
        <Button
          title='Log in'
          onPress={() => handleSubmit()}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.title}
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${background};
`;

const styles = StyleSheet.create({
  input: {
    color: lightGreen,
    paddingLeft: 20,
  },
  button: {
    marginTop: 40,
  },
  inputView: {
    width: '80%',
  },
  title: {
    color: brightGreen,
  },
  label: {
    color: brightGreen,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: buttonBg,
  },
  message: {
    color: brightGreen,
  },
});
