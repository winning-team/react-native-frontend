import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello there</Text>
        <Button
          title='Yeet'
          color='green'
          onPress={() => {
            Actions.push("Map");
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
