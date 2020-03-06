import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styled from 'styled-components';
import {
  lightGreen,
  brightGreen,
  brightRed,
  background,
} from '../styles/index';
import { Overlay } from 'react-native-elements';
import xIcon from '../assets/xIcon.svg';

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message() {
  const [isVisible, setIsvisable] = useState(false);
  const [scrollView, setScrollView] = useState(null);

  var _scrollToBottomY;

  return (
    <Container>
      <View style={styles.inputView}>
        <Text style={styles.text}>Someone entered the room!</Text>
        <Button
          title='Open'
          buttonStyle={styles.buttonStyle}
          onPress={() => setIsvisable(true)}
        />
      </View>
      <Overlay
        style={styles.Overlay}
        isVisible={isVisible}
        windowBackgroundColor='rgba(255, 255, 255, .5)'
        overlayBackgroundColor={background}
        width='80%'
        height='80%'>
        <View style={styles.overlay}>
          <Button
            title='X'
            buttonStyle={styles.BackButton}
            onPress={() => setIsvisable(false)}
          />
          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
              ref={ref => setScrollView(ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollView.scrollToEnd({ animated: true });
              }}
              style={styles.scrollView}>
              <Text>This is the Top</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>Hello Player!!</Text>
              <Text>This is the End</Text>
            </ScrollView>
          </SafeAreaView>
          <Input
            style={styles.input}
            placeholder='Say Something!'
            placeholderTextColor={lightGreen}
          />
        </View>
      </Overlay>
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
  scrollView: {
    height: '88%',
  },
  text: {
    color: lightGreen,
    fontSize: 20,
  },
  BackButton: {
    width: '20%',
    alignSelf: 'flex-start',
  },
  buttonStyle: {
    width: '35%',
    marginLeft: '31%',
    marginTop: '.5%',
  },
  overlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
