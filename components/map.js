import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

export default function Map() {
  const data1 = [{ x: 2, y: 3 }];
  const data2 = [{ x: 2, y: 3 }];

  const data = [
    {
      index: 5,
      item: 5,
      svg: { stroke: "#8800cc" }
    },
    {
      index: 5,
      item: 5,
      svg: { stroke: "green" }
    }
  ];

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" }
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 }
        ]}
      />
    </VictoryChart>
  );
}
