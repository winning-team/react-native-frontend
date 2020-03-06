import React, { useEffect, useState, useReducer } from "react";
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
import { getSprite } from "./getSprite";
import Message from "./message";

export default function Game() {
  const [roomDescription, setRoomDescription] = useState(null);
  const [roomTitle, setRoomTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [playersInRoom, setPlayersInRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [state, dispatch] = useReducer(gridReducer, {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
  });

  function gridReducer(state, action) {
    const { player } = action;
    const { x, y, prevX, prevY } = player ? player : {};
    switch (action.type) {
      case "ADD_PLAYER": {
        const add = num => {
          const players = [...state[num]];
          const updated = { ...state };
          updated[num] = [...players, player];
          return { ...updated };
        };

        switch (x) {
          case 0:
            switch (y) {
              case 0:
                return add(7);
                break;
              case 1:
                return add(4);
                break;
              case 2:
                return add(1);
                break;
            }
            break;
          case 1:
            switch (y) {
              case 0:
                return add(8);
                break;
              case 1:
                return add(5);
                break;
              case 2:
                return add(2);
                break;
            }
            break;
          case 2:
            switch (y) {
              case 0:
                return add(9);
                break;
              case 1:
                return add(6);
                break;
              case 2:
                return add(3);
                break;
            }
            break;
        }
      }
      case "REMOVE_PLAYER": {
        const remove = num => {
          const players = state[num];
          const updated = { ...state };
          updated[num] = players.filter(p => p.username !== player.username);
          return updated;
        };

        switch (prevX) {
          case 0:
            switch (prevY) {
              case 0:
                return remove(7);
                break;
              case 1:
                return remove(4);
                break;
              case 2:
                return remove(1);
                break;
            }
            break;
          case 1:
            switch (prevY) {
              case 0:
                return remove(8);
                break;
              case 1:
                return remove(5);
                break;
              case 2:
                return remove(2);
                break;
            }
            break;
          case 2:
            switch (prevY) {
              case 0:
                return remove(9);
                break;
              case 1:
                return remove(6);
                break;
              case 2:
                return remove(3);
                break;
            }
            break;
        }
      }
      case "RESET": {
        return {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: []
        };
      }
      default:
        return { ...state };
    }
  }

  useEffect(() => {
    if (roomId) {
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
        forceTLS: true
      });
      const channel = pusher.subscribe(`room_${roomId}`);
      channel.bind(`room_${roomId}_event`, function({ message }) {
        setMessages(m => m.concat(message));
      });
      const moveChannel = pusher.subscribe(`move_${roomId}`);
      moveChannel.bind(`move_${roomId}_event`, ({ player }) => {
        const { x, y, prevX, prevY } = player;
        if (prevX !== undefined || prevY !== undefined) {
          dispatch({ type: "REMOVE_PLAYER", player });
        }
        dispatch({ type: "ADD_PLAYER", player });
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
              const { title, description, players, room_id, x, y } = data;
              setRoomTitle(title);
              setRoomDescription(description);
              setPlayersInRoom(players);
              setPlayerX(x);
              setPlayerY(y);
              setRoomId(room_id);

              for (const player of players) {
                dispatch({ type: "ADD_PLAYER", player });
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  }, [roomId]);

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
            // console.log(data);
            const {
              title,
              description,
              error_msg,
              players,
              room_id,
              x,
              y
            } = data;
            // console.log(x, y);
            if (error_msg) {
              setErrorMessage(error_msg);
            } else {
              setErrorMessage(null);
            }
            setRoomTitle(title);
            setRoomDescription(description);
            setPlayersInRoom(players);
            setPlayerX(x);
            setPlayerY(y);
            console.log(roomId, room_id);
            if (roomId !== room_id) {
              setRoomId(room_id);
              dispatch({ type: "RESET" });
              for (const player of players) {
                dispatch({ type: "ADD_PLAYER", player });
              }
            }
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
            Players in room:{" "}
            {playersInRoom.length ? playersInRoom.length.toString() : 0}
          </Text>
        )}
        {roomId !== null && (
          <Text style={styles.gameText}>Room id: {roomId}</Text>
        )}
        <Text style={styles.gameText}>X position: {playerX}</Text>
        <Text style={styles.gameText}>Y position: {playerY}</Text>
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
          <View style={styles.box}>
            {state["1"].length ? (
              getSprite(state["1"][state["1"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["2"].length ? (
              getSprite(state["2"][state["2"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["3"].length ? (
              getSprite(state["3"][state["3"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          {/* Columns */}
          <View style={styles.box}>
            {state["4"].length ? (
              getSprite(state["4"][state["4"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["5"].length ? (
              getSprite(state["5"][state["5"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["6"].length ? (
              getSprite(state["6"][state["6"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          {/* Columns */}
          <View style={styles.box}>
            {state["7"].length ? (
              getSprite(state["7"][state["7"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["8"].length ? (
              getSprite(state["8"][state["8"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
          <View style={styles.box}>
            {state["9"].length ? (
              getSprite(state["9"][state["9"].length - 1].sprite_id, 50)
            ) : (
              <></>
            )}
          </View>
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
  game_message_text: {
    flex: 3
  },
  message: {
    width: "100%",
    height: 100,
    paddingTop: 50
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
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  box: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black"
  },
  sprite: {
    width: 80,
    height: 80
  }
});
