import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styled from 'styled-components';
import {
  lightGreen,
  brightGreen,
  brightRed,
  background,
} from '../styles/index';

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message() {
  const [message, setMessage] = useState('');
  return (
    <Container>
      <View style={styles.inputView}>
        <Text>Hello World!</Text>
        <Input
          onChangeText={text => setMessage(text)}
          placeholder='Say something!'
        />
        <Button title='Submit' />
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  background-color: ${background};
`;

const styles = StyleSheet.create({
  Container: {
    padding: 8,
    marginTop: 32,
    borderBottomColor: 'black',
    textAlignVertical: 'top',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  Input: {
    width: '100%',
  },
  inputView: {
    width: '100%',
    borderBottomColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
  },
});
