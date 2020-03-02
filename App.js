import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  VictoryLine,
  VictoryGroup,
  VictoryTheme,
  VictoryScatter
} from "victory-native";

const data = [
  [
    { x: 5, y: 7 },
    { x: 5, y: 8 }
  ],
  [
    { x: 6, y: 6 },
    { x: 6, y: 7 }
  ],
  [
    { x: 7, y: 7 },
    { x: 7, y: 8 }
  ],
  [
    { x: 5, y: 6 },
    { x: 5, y: 7 }
  ],
  [
    { x: 6, y: 5 },
    { x: 6, y: 6 }
  ],
  [
    { x: 5, y: 5 },
    { x: 5, y: 6 }
  ],
  [
    { x: 4, y: 8 },
    { x: 4, y: 9 }
  ],
  [
    { x: 6, y: 8 },
    { x: 6, y: 9 }
  ],
  [
    { x: 8, y: 6 },
    { x: 8, y: 7 }
  ],
  [
    { x: 6, y: 4 },
    { x: 6, y: 5 }
  ],
  [
    { x: 5, y: 4 },
    { x: 5, y: 5 }
  ],
  [
    { x: 4, y: 9 },
    { x: 4, y: 10 }
  ],
  [
    { x: 6, y: 9 },
    { x: 6, y: 10 }
  ],
  [
    { x: 6, y: 3 },
    { x: 6, y: 4 }
  ],
  [
    { x: 9, y: 8 },
    { x: 9, y: 9 }
  ],
  [
    { x: 4, y: 4 },
    { x: 4, y: 5 }
  ],
  [
    { x: 5, y: 3 },
    { x: 5, y: 4 }
  ],
  [
    { x: 3, y: 5 },
    { x: 3, y: 6 }
  ],
  [
    { x: 3, y: 9 },
    { x: 3, y: 10 }
  ],
  [
    { x: 4, y: 10 },
    { x: 4, y: 11 }
  ],
  [
    { x: 3, y: 7 },
    { x: 3, y: 8 }
  ],
  [
    { x: 2, y: 8 },
    { x: 2, y: 9 }
  ],
  [
    { x: 7, y: 9 },
    { x: 7, y: 10 }
  ],
  [
    { x: 6, y: 10 },
    { x: 6, y: 11 }
  ],
  [
    { x: 9, y: 5 },
    { x: 9, y: 6 }
  ],
  [
    { x: 7, y: 3 },
    { x: 7, y: 4 }
  ],
  [
    { x: 6, y: 2 },
    { x: 6, y: 3 }
  ],
  [
    { x: 8, y: 4 },
    { x: 8, y: 5 }
  ],
  [
    { x: 9, y: 9 },
    { x: 9, y: 10 }
  ],
  [
    { x: 4, y: 3 },
    { x: 4, y: 4 }
  ],
  [
    { x: 5, y: 2 },
    { x: 5, y: 3 }
  ],
  [
    { x: 5, y: 10 },
    { x: 5, y: 11 }
  ],
  [
    { x: 4, y: 11 },
    { x: 4, y: 12 }
  ],
  [
    { x: 1, y: 8 },
    { x: 1, y: 9 }
  ],
  [
    { x: 8, y: 9 },
    { x: 8, y: 10 }
  ],
  [
    { x: 7, y: 10 },
    { x: 7, y: 11 }
  ],
  [
    { x: 6, y: 11 },
    { x: 6, y: 12 }
  ],
  [
    { x: 10, y: 7 },
    { x: 10, y: 8 }
  ],
  [
    { x: 7, y: 2 },
    { x: 7, y: 3 }
  ],
  [
    { x: 6, y: 1 },
    { x: 6, y: 2 }
  ],
  [
    { x: 4, y: 2 },
    { x: 4, y: 3 }
  ],
  [
    { x: 3, y: 3 },
    { x: 3, y: 4 }
  ],
  [
    { x: 5, y: 1 },
    { x: 5, y: 2 }
  ],
  [
    { x: 1, y: 5 },
    { x: 1, y: 6 }
  ],
  [
    { x: 2, y: 4 },
    { x: 2, y: 5 }
  ],
  [
    { x: 10, y: 6 },
    { x: 10, y: 7 }
  ],
  [
    { x: 10, y: 4 },
    { x: 10, y: 5 }
  ],
  [
    { x: 7, y: 1 },
    { x: 7, y: 2 }
  ],
  [
    { x: 6, y: 0 },
    { x: 6, y: 1 }
  ],
  [
    { x: 4, y: 1 },
    { x: 4, y: 2 }
  ],
  [
    { x: 5, y: 0 },
    { x: 5, y: 1 }
  ],
  [
    { x: 1, y: 4 },
    { x: 1, y: 5 }
  ],
  [
    { x: 6, y: 7 },
    { x: 7, y: 7 }
  ],
  [
    { x: 5, y: 7 },
    { x: 6, y: 7 }
  ],
  [
    { x: 6, y: 6 },
    { x: 7, y: 6 }
  ],
  [
    { x: 5, y: 8 },
    { x: 6, y: 8 }
  ],
  [
    { x: 7, y: 6 },
    { x: 8, y: 6 }
  ],
  [
    { x: 6, y: 5 },
    { x: 7, y: 5 }
  ],
  [
    { x: 7, y: 8 },
    { x: 8, y: 8 }
  ],
  [
    { x: 4, y: 6 },
    { x: 5, y: 6 }
  ],
  [
    { x: 4, y: 8 },
    { x: 5, y: 8 }
  ],
  [
    { x: 8, y: 6 },
    { x: 9, y: 6 }
  ],
  [
    { x: 7, y: 5 },
    { x: 8, y: 5 }
  ],
  [
    { x: 8, y: 8 },
    { x: 9, y: 8 }
  ],
  [
    { x: 3, y: 6 },
    { x: 4, y: 6 }
  ],
  [
    { x: 3, y: 8 },
    { x: 4, y: 8 }
  ],
  [
    { x: 6, y: 9 },
    { x: 7, y: 9 }
  ],
  [
    { x: 8, y: 7 },
    { x: 9, y: 7 }
  ],
  [
    { x: 6, y: 3 },
    { x: 7, y: 3 }
  ],
  [
    { x: 4, y: 4 },
    { x: 5, y: 4 }
  ],
  [
    { x: 2, y: 6 },
    { x: 3, y: 6 }
  ],
  [
    { x: 3, y: 9 },
    { x: 4, y: 9 }
  ],
  [
    { x: 4, y: 10 },
    { x: 5, y: 10 }
  ],
  [
    { x: 3, y: 7 },
    { x: 4, y: 7 }
  ],
  [
    { x: 2, y: 8 },
    { x: 3, y: 8 }
  ],
  [
    { x: 5, y: 9 },
    { x: 6, y: 9 }
  ],
  [
    { x: 7, y: 9 },
    { x: 8, y: 9 }
  ],
  [
    { x: 9, y: 7 },
    { x: 10, y: 7 }
  ],
  [
    { x: 9, y: 5 },
    { x: 10, y: 5 }
  ],
  [
    { x: 7, y: 3 },
    { x: 8, y: 3 }
  ],
  [
    { x: 8, y: 4 },
    { x: 9, y: 4 }
  ],
  [
    { x: 9, y: 9 },
    { x: 10, y: 9 }
  ],
  [
    { x: 3, y: 4 },
    { x: 4, y: 4 }
  ],
  [
    { x: 1, y: 6 },
    { x: 2, y: 6 }
  ],
  [
    { x: 2, y: 5 },
    { x: 3, y: 5 }
  ],
  [
    { x: 2, y: 7 },
    { x: 3, y: 7 }
  ],
  [
    { x: 1, y: 8 },
    { x: 2, y: 8 }
  ],
  [
    { x: 10, y: 7 },
    { x: 11, y: 7 }
  ],
  [
    { x: 10, y: 5 },
    { x: 11, y: 5 }
  ],
  [
    { x: 7, y: 2 },
    { x: 8, y: 2 }
  ],
  [
    { x: 8, y: 3 },
    { x: 9, y: 3 }
  ],
  [
    { x: 9, y: 10 },
    { x: 10, y: 10 }
  ],
  [
    { x: 10, y: 9 },
    { x: 11, y: 9 }
  ],
  [
    { x: 0, y: 6 },
    { x: 1, y: 6 }
  ],
  [
    { x: 2, y: 10 },
    { x: 3, y: 10 }
  ],
  [
    { x: 3, y: 11 },
    { x: 4, y: 11 }
  ],
  [
    { x: 1, y: 7 },
    { x: 2, y: 7 }
  ],
  [
    { x: 0, y: 8 },
    { x: 1, y: 8 }
  ],
  [
    { x: 3, y: 2 },
    { x: 4, y: 2 }
  ],
  [
    { x: 2, y: 3 },
    { x: 3, y: 3 }
  ],
  [
    { x: 0, y: 5 },
    { x: 1, y: 5 }
  ]
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryGroup width={450} height={450}>
          {data.map((list, i) => {
            return (
              <VictoryLine
                key={i}
                data={list}
                style={{ data: { stroke: "#00cc66" } }}
              />
            );
          })}
          <VictoryScatter
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.x === 0 && datum.y === 5 ? "#ff3300" : "#000000"
              }
            }}
            size={6}
            data={data
              .flat()
              .map(x =>
                x.x === 0 && x.y === 5
                  ? { x: x.x, y: x.y, symbol: "star", size: 20 }
                  : x
              )}
          />
        </VictoryGroup>
        <Button
          title='Yeet'
          color='green'
          onPress={() => {
            alert("Yolo swag 420 blaze it 69");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
