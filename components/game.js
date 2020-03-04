import React, { useEffect, useState } from 'react';
import Dpad from '../assets/dpad.svg';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { axiosWithAuth } from './axiosWithAuth';
import { background, brightGreen } from '../styles';
import { Message } from './message';

export default function Game() {
  const [roomDescription, setRoomDescription] = useState(null);
  const [roomTitle, setRoomTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function Move(dir) {
    console.log(dir);
    axiosWithAuth().then(axios => {
      axios
        .post('api/adv/move/', {
          direction: dir,
        })
        .then(function({ data }) {
          if (data) {
            console.log(data);
            const { title, description, error_msg } = data;
            if (error_msg) {
              setErrorMessage(error_msg);
            } else {
              setErrorMessage(null);
            }
            setRoomTitle(title);
            setRoomDescription(description);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.game_response_text}>
        <Text style={styles.gameText}>Room name: {roomTitle}</Text>
        <Text style={styles.gameText}>Room description: {roomDescription}</Text>
        {errorMessage && (
          <Text style={styles.gameError}>Error: {errorMessage}</Text>
        )}
      </View>
      <View>
        <Message />
      </View>
      <View style={styles.dpad}>
        <Dpad width={250} height={250} />
      </View>
      <View style={styles.dpad_overlay}>
        {/* up */}
        <TouchableHighlight
          onPress={() => Move('n')}
          style={styles.dpad_button}
          underlayColor='rgba(0,0,0,0.2)'>
          <View />
        </TouchableHighlight>
        <View style={styles.mid_row}>
          {/* left */}
          <TouchableHighlight
            onPress={() => Move('w')}
            style={styles.dpad_button}
            underlayColor='rgba(0,0,0,0.2)'>
            <View />
          </TouchableHighlight>
          {/* spacing */}
          <View style={styles.dpad_button} />
          {/* right */}
          <TouchableHighlight
            onPress={() => Move('e')}
            style={styles.dpad_button}
            underlayColor='rgba(0,0,0,0.2)'>
            <View />
          </TouchableHighlight>
        </View>
        {/* down */}
        <TouchableHighlight
          onPress={() => Move('s')}
          style={styles.dpad_button}
          underlayColor='rgba(0,0,0,0.2)'>
          <View />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: background,
  },
  game_response_text: {
    width: width - 32,
    padding: 8,
    marginTop: 32,
    borderBottomColor: 'black',
    textAlignVertical: 'top',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  game_message_text: {
    flex: 3,
  },
  dpad: {
    position: 'absolute',
    bottom: -37,
    left: 0,
  },
  dpad_overlay: {
    position: 'absolute',
    left: 39,
    bottom: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3.1,
  },
  gameText: {
    color: brightGreen,
  },
  gameError: {
    color: 'red',
  },
  dpad_button: {
    height: 56,
    width: 56,
  },
  mid_row: {
    flexDirection: 'row',
  },
});
