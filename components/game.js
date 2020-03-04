import React, { useEffect, useState } from "react";
import Dpad from "../assets/dpad.svg";
import Map from "../assets/yeetusmappymaps.svg";
import Pusher from "pusher-js/react-native";
import { PUSHER_KEY, PUSHER_CLUSTER } from "react-native-dotenv";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Image
} from "react-native";
import { axiosWithAuth } from "./axiosWithAuth";
import { background, brightGreen, lightGreen } from "../styles";
import { Actions } from "react-native-router-flux";

export default function Game() {
  const [roomDescription, setRoomDescription] = useState(null);
  const [roomTitle, setRoomTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [playersInRoom, setPlayersInRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);

  const pusher = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTER,
    forceTLS: true
  });

  useEffect(() => {
    if (roomId) {
      const channel = pusher.subscribe(`room_${roomId}`);
      channel.bind(`room_${roomId}_event`, function({ message }) {
        setMessages(m => m.concat(message));
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomDescription) {
      axiosWithAuth().then(axios => {
        axios
          .get("api/adv/init/")
          .then(function({ data }) {
            if (data) {
              const { title, description, players, room_id } = data;
              setRoomTitle(title);
              setRoomDescription(description);
              setPlayersInRoom(players);
              setRoomId(room_id);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  function Move(dir) {
    axiosWithAuth().then(axios => {
      axios
        .post("api/adv/move/", {
          direction: dir
        })
        .then(function({ data }) {
          if (data) {
            console.log(data);
            const { title, description, error_msg, players, room_id } = data;
            if (error_msg) {
              setErrorMessage(error_msg);
            } else {
              setErrorMessage(null);
            }
            setRoomTitle(title);
            setRoomDescription(description);
            setPlayersInRoom(players);
            setRoomId(room_id);
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
        {playersInRoom !== null && (
          <Text style={styles.gameText}>
            Other players in room:{" "}
            {playersInRoom.length ? playersInRoom.length.toString() : 0}
          </Text>
        )}
        {errorMessage && (
          <Text style={styles.gameError}>Error: {errorMessage}</Text>
        )}
      </View>
      <View style={styles.dpad}>
        <Dpad fill={lightGreen} width={250} height={250} />
      </View>
      <View style={styles.dpad_overlay}>
        {/* up */}
        <TouchableHighlight
          onPress={() => Move("n")}
          style={styles.dpad_button}
          underlayColor='rgba(0,0,0,0.3)'
        >
          <View />
        </TouchableHighlight>
        <View style={styles.mid_row}>
          {/* left */}
          <TouchableHighlight
            onPress={() => Move("w")}
            style={styles.dpad_button}
            underlayColor='rgba(0,0,0,0.3)'
          >
            <View />
          </TouchableHighlight>
          {/* spacing */}
          <View style={styles.dpad_button} />
          {/* right */}
          <TouchableHighlight
            onPress={() => Move("e")}
            style={styles.dpad_button}
            underlayColor='rgba(0,0,0,0.3)'
          >
            <View />
          </TouchableHighlight>
        </View>
        {/* down */}
        <TouchableHighlight
          onPress={() => Move("s")}
          style={styles.dpad_button}
          underlayColor='rgba(0,0,0,0.3)'
        >
          <View />
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        style={styles.map}
        onPress={() => Actions.Map()}
        underlayColor='rgba(0,0,0,0.3)'
      >
        <Map fill={lightGreen} />
      </TouchableHighlight>
    
    {/* Grid */}
    <View style={styles.grid}>
      {/* Row 1 */}
      <View style={styles.row}>
        {/* Columns */}
        <View style={styles.box}><Image source={require('../assets/sanic.exe.png')} style={styles.sprite}/></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        {/* Columns */}
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        {/* Columns */}
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </View>
        
    </View>

    </View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: background
  },
  game_response_text: {
    width: width - 32,
    padding: 8,
    marginTop: 32,
    borderBottomColor: "black",
    textAlignVertical: "top",
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "solid"
  },
  dpad: {
    position: "absolute",
    bottom: -37,
    left: 0
  },
  dpad_overlay: {
    position: "absolute",
    left: 39,
    bottom: 31,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3.1
  },
  gameText: {
    color: brightGreen
  },
  gameError: {
    color: "red"
  },
  dpad_button: {
    height: 56,
    width: 56,
    borderRadius: 18
  },
  mid_row: {
    flexDirection: "row"
  },
  map: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 80,
    bottom: 16,
    right: 16
  },
  grid: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  box: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: 'black'
  },
  sprite:{
    width: 80,
    height: 80
  }
});
