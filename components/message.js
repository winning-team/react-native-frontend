import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';
import styled from 'styled-components';
import { lightGreen, brightGreen, brightRed } from '../styles/index';
import { GiftedChat } from 'react-native-gifted-chat';
import { render } from 'react-dom';

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message() {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
}
