import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import styled from 'styled-components';
import {
  lightGreen,
  brightGreen,
  brightRed,
  background,
} from '../styles/index';
import { Overlay } from 'react-native-elements';
import Xicon from '../assets/xIcon.svg';
import Plane from '../assets/send_it.svg';

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message() {
  const [isVisible, setIsvisable] = useState(false);
  const [scrollView, setScrollView] = useState(null);
  const [text, setText] = useState('');

  console.log(text);

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
          <Xicon onPress={() => setIsvisable(false)} />
          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
              ref={ref => setScrollView(ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollView.scrollToEnd({ animated: true });
              }}
              style={styles.scrollView}>
              <Text>This is the Front</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>Hello World!!!!!</Text>
              <Text>This is the end!!!</Text>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.bottomChat}>
            <Input
              style={styles.input}
              placeholder='Say Something!'
              placeholderTextColor={lightGreen}
              onChangeText={e => setText(e)}
            />
            <TouchableOpacity>
              <Plane style={styles.Plane} />
            </TouchableOpacity>
          </View>
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
  inputView: {
    flexDirection: 'row',
    height: 50,
    padding: 2,
    marginTop: 32,
    borderBottomColor: 'black',
    textAlignVertical: 'top',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  scrollView: {
    height: '88%',
    padding: 2,
    paddingBottom: 4,
    marginTop: '2%',
  },
  text: {
    color: brightGreen,
    fontSize: 20,
  },
  BackButton: {
    width: '20%',
    height: 50,
    alignSelf: 'flex-start',
  },
  buttonStyle: {
    width: '35%',
    marginLeft: '31%',
    height: 40,
  },
  overlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  xIcon: {
    width: '25%',
    height: 50,
  },
  bottomChat: {
    flexDirection: 'row',
    width: '90%',
  },
  Plane: {
    width: 50,
    height: 50,
    marginTop: '65%',
  },
});
