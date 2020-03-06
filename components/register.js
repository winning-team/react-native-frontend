import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Input, Button } from 'react-native-elements';
import { background, buttonBg, lightGreen, brightGreen } from '../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import King from '../assets/king.svg';
import {Audio} from 'expo-av';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('start');
  const [sprite, setSprite] = useState(0);
  const [music, setMusic] = useState(null);
  const highlight = 'rgba(0,0,0,0.3)'


  useEffect(() => {
    if (music === null){
      try {
        const playback = Audio.Sound.createAsync(
          {uri: "https://p16.muscdn.com/obj/musically-maliva-obj/1616594337002502"},
          {shouldPlay: true}
        ).then(
          ({sound}) => setMusic(sound)
        )
      } catch(e) {
        console.log('error' + e)
      }
  }
  })

  const mute = () => {
    music.pauseAsync().then(result => {})
  }
  

  const handleSubmit = async () => {
    mute()
    try {
      if (!(sprite > 0 && username && password1 === password2)) {
        throw 'invalid username/passwords';
      }
      const { data } = await axios.post(
        'https://5d0cdb07.ngrok.io/api/registration/',
        {
          username,
          password1,
          password2,
          sprite
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

  const chooseSprite = (sprite_id) => {
    setSprite(sprite_id)
  }

  const toggle = (id) => {
      return sprite == id ? {backgroundColor: highlight}: {}
  }

  

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
        <Text style={styles.select}>Choose a Character</Text>
        <ScrollView horizontal={true} style={{height: "40%"}}>
          <TouchableHighlight onPress = {() => chooseSprite(1)} underlayColor={highlight} style={toggle(1)}>
            <King height={"100%"} width={200}/>
          </TouchableHighlight>
        </ScrollView>
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
  select: {
    color: brightGreen,
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center"
  }


});
