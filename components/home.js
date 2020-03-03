import React from "react";
import { StyleSheet, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import styled from "styled-components";
import * as SecureStore from "expo-secure-store";
import { background, buttonBg } from "../styles";
import { Button } from "react-native-elements";

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Text style={styles.text}>Gamey McGame Face</Text>
        <ButtonView>
          <Button
            title='Map'
            titleStyle={styles.title}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              Actions.Map();
            }}
          />
        </ButtonView>
        <ButtonView>
          <Button
            title='Login'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.title}
            onPress={() => {
              Actions.Login();
            }}
          />
        </ButtonView>
        <ButtonView>
          <Button
            title='Register'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.title}
            onPress={() => {
              Actions.Register();
            }}
          />
        </ButtonView>
        <ButtonView>
          <Button
            title='Logout'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.title}
            onPress={() => {
              SecureStore.deleteItemAsync("token").then(token => {
                console.log(token);
              });
            }}
          />
        </ButtonView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${background};
  padding: 10px;
`;

const ButtonView = styled.View`
  width: 90%;
  margin-top: 10px;
`;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 20
  },
  title: {
    color: "#199515"
  },
  buttonStyle: {
    backgroundColor: buttonBg
  },
  inputView: {
    width: "80%"
  },
  text: {
    fontSize: 30,
    color: "#199515"
  }
});
