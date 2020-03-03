import React, { useEffect } from "react";
import { MapView, Home, Login, Register, Game } from "./components";
import * as SecureStore from "expo-secure-store";
import { Scene, Router, Actions, Stack } from "react-native-router-flux";
import { StyleSheet } from "react-native";
import { background, brightGreen } from "./styles";

export default function App() {
  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      if (!token) {
        Actions.Login();
      }
    });
  });

  return (
    <Router>
      <Stack key='root' headerLayoutPreset='center'>
        <Scene
          key='Home'
          component={Home}
          title='Home'
          hideNavBar={true}
          titleStyle={styles.title}
          navigationBarStyle={styles.navbar}
        />
        <Scene
          key='Map'
          leftButtonStyle={{ color: "white" }}
          component={MapView}
          title='Map'
          titleStyle={styles.title}
          navigationBarStyle={styles.navbar}
        />
        <Scene
          key='Login'
          component={Login}
          title='Login'
          titleStyle={styles.title}
          navigationBarStyle={styles.navbar}
        />
        <Scene
          key='Register'
          component={Register}
          title='Register'
          titleStyle={styles.title}
          navigationBarStyle={styles.navbar}
        />
        <Scene
          key='Game'
          component={Game}
          title='Game'
          titleStyle={styles.title}
          navigationBarStyle={styles.navbar}
        />
      </Stack>
    </Router>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: background,
  },
  title: {
<<<<<<< HEAD
    color: '#199515',
  },
=======
    color: brightGreen
  }
>>>>>>> 87e10b2d0df98e5dba7cf7ca1ab26b3509f4657a
});
