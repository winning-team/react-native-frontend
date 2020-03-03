import React, { useEffect, useState } from "react";
import Dpad from "../assets/dpad.svg"
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import { axiosWithAuth } from "./axiosWithAuth";
import { background } from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MapView() {
  const [data, setData] = useState(null);
  const [playerX, setPlayerX] = useState(null);
  const [playerY, setPlayerY] = useState(null);

  useEffect(() => {
    if (!data && !playerX && !playerY) {
      axiosWithAuth().then(axios => {
        axios
          .get("api/adv/map")
          .then(({ data }) => {
            if (data.Coordinates) {
              setData(data.Coordinates);
            }
            if (data.playerCoords) {
              setPlayerX(data.playerCoords.x);
              setPlayerY(data.playerCoords.y);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  });

  return !data && !playerX && !playerY ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <VictoryGroup width={450} height={450}>
        {data.map((list, i) => {
          return (
            <VictoryLine
              key={i}
              data={list}
              style={{ data: { stroke: "grey" } }}
            />
          );
        })}
        <VictoryScatter
          style={{
            labels: { fill: "white", fontSize: 20 },
            data: {
              fill: ({ datum }) =>
                datum.x === playerX && datum.y === playerY ? "yellow" : "green"
            }
          }}
          size={6}
          data={data.flat().map(x =>
            x.x === playerX && x.y === playerY
              ? {
                  x: x.x,
                  y: x.y,
                  symbol: "star",
                  size: 10,
                  label: "[YOU ARE HERE]"
                }
              : x
          )}
        />
      </VictoryGroup>
      <View style={styles.container}>
        <View style={styles.dpad}>
          <Dpad width={250} height={250}/>
        </View>
        <View style={styles.dpad_overlay}>
          {/* up */}
          <TouchableHighlight onPress={() => ("")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
          <View style={styles.mid_row}>
            {/* left */}
            <TouchableHighlight onPress={() => ("")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
            {/* spacing */}
            <View style={styles.dpad_button}/>
            {/* right */}
            <TouchableHighlight onPress={() => ("")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
          </View>
          {/* down */}
          <TouchableHighlight onPress={() => ("")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
        </View>
       </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: background
  },
  dpad: {
    position: "absolute",
    bottom: -37,
  },
  dpad_overlay:{
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3.1
  },
  dpad_button: {
    height: 56,
    width: 56,
  },
  mid_row: {
    flexDirection: 'row',
  },
});
