import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";
import { Actions } from "react-native-router-flux";
import styled from "styled-components";
import * as SecureStore from "expo-secure-store";
import { background, buttonBg, brightGreen } from "../styles";
import { Button } from "react-native-elements";

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require("../assets/pbBananerrs.png")}
          style={{
            width: 250,
            height: 200,
            resizeMode: "contain",
            marginBottom: 20
          }}
        />
        <Text style={styles.text}>THE LEGEND OF FNU</Text>
        <Text style={styles.subText}>Journey to Poty Creek</Text>
        <ButtonView>
          <Button
            title='Play'
            titleStyle={styles.title}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              Actions.Game();
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
    color: brightGreen
  },
  buttonStyle: {
    backgroundColor: buttonBg
  },
  inputView: {
    width: "80%"
  },
  text: {
    fontSize: 30,
    color: brightGreen
  },
  subText: {
    fontSize: 20,
    color: brightGreen
  }
});
