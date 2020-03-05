import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Input, Button } from 'react-native-elements';
import { background, buttonBg, lightGreen, brightGreen } from '../styles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('start');

  const handleSubmit = async () => {
    try {
      if (!(username && password1 === password2)) {
        throw 'invalid username/passwords';
      }
      const { data } = await axios.post(
        'https://5d0cdb07.ngrok.io/api/registration/',
        {
          username,
          password1,
          password2,
        },
      );
      if (data && data.key) {
        SecureStore.setItemAsync('token', data.key);
        setMessage('Registration successful :)');
      }
    } catch (err) {
      console.log(err);
      setMessage('Registration unsuccessful :(');
    }
  };

  return (
    <Container>
      {message !== 'start' && <Text style={styles.message}>{message}</Text>}
      <View style={styles.inputView}>
        <Input
          onChangeText={text => setUsername(text)}
          labelStyle={styles.label}
          label='Username'
          placeholder='Username'
          placeholderTextColor={lightGreen}
          leftIcon={{ type: 'font-awesome', name: 'user', color: lightGreen }}
          inputStyle={styles.input}
        />
        <Input
          onChangeText={text => setPassword1(text)}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: lightGreen }}
          labelStyle={styles.label}
          label='Password'
          placeholder='Password'
          placeholderTextColor={lightGreen}
          secureTextEntry={true}
          inputStyle={styles.input}
        />
        <Input
          onChangeText={text => setPassword2(text)}
          label='Re-enter password'
          labelStyle={styles.label}
          placeholder='Re-enter password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color: lightGreen }}
          placeholderTextColor={lightGreen}
          secureTextEntry={true}
          inputStyle={styles.input}
        />
        <Button
          title='Register'
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
    margin: 20,
  },
  inputView: {
    width: '80%',
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: buttonBg,
  },
  title: {
    color: brightGreen,
  },
  label: {
    color: brightGreen,
  },
  message: {
    color: brightGreen,
  },
});
