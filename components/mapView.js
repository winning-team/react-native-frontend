import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import { axiosWithAuth } from "./axiosWithAuth";
import { background, lightGreen, brightGreen, mapNode } from "../styles";
import LottieView from "lottie-react-native";

export default function MapView() {
  const [data, setData] = useState(null);
  const [playerX, setPlayerX] = useState(null);
  const [playerY, setPlayerY] = useState(null);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (!data && !playerX && !playerY) {
      if (animation) {
        animation.play();
      }
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
    <View style={styles.animationContainer}>
      <Text style={styles.loadingText}>Loading map...</Text>
      <LottieView
        resizeMode='cover'
        ref={animation => {
          setAnimation(animation);
        }}
        style={{
          backgroundColor: background,
          width: 300,
          height: 300
        }}
        source={require("../assets/animations/mapLoading.json")}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <VictoryGroup width={450} height={550}>
        {data.map((list, i) => {
          return (
            <VictoryLine
              key={i}
              data={list}
              style={{ data: { stroke: "grey", strokeWidth: 8 } }}
            />
          );
        })}
        <VictoryScatter
          style={{
            labels: { fill: "white", fontSize: 20 },
            data: {
              fill: ({ datum }) =>
                datum.x === playerX && datum.y === playerY
                  ? brightGreen
                  : mapNode
            }
          }}
          size={8}
          data={data.flat().map(x =>
            x.x === playerX && x.y === playerY
              ? {
                  x: x.x,
                  y: x.y,
                  symbol: "star",
                  size: 15
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
  },
  animationContainer: {
    backgroundColor: background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flex: 1
  },
  loadingText: {
    color: lightGreen,
    paddingLeft: 20,
    fontSize: 40
  }
});
