import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';
import styled from 'styled-components';

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message() {
  const [message, setMessage] = useState({});
  return (
    <View>
      <Text>Messaging </Text>
      <Container>
        <StyledInput
          placeholder='Say something!!'
          onChangeText={text => setMessage(text)}
        />
        <Button title='Submit' color='blue' />
      </Container>
    </View>
  );
}

const Container = styled.View`
  background-color: #f5fcff;
  flex-direction: row;
`;

const StyledInput = styled.TextInput`
  padding: 10px;
  width: 80%;
  border: 1px solid red;
`;
