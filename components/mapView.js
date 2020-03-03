import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import { axiosWithAuth } from "./axiosWithAuth";
import { background } from "../styles";

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: background
  }
});
