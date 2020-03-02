import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Map from "./components/map";
import Home from "./components/home";
import Login from "./components/login";
// import { NativeRouter, Route, Link } from "react-router-native";
import { Scene, Router, Actions, Stack } from "react-native-router-flux";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key='root'>
          <Scene key='Home' component={Home} title='Home' />
          <Scene key='Map' component={Map} title='Mapperdoodle' />
          <Scene key='Login' component={Login} title='Login' />
        </Stack>
      </Router>
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
