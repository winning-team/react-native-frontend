import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import styled from "styled-components";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Input, Button } from "react-native-elements";
import { background } from "../styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("start");

  const handleSubmit = async () => {
    try {
      if (!(username && password1 === password2)) {
        throw "invalid username/passwords";
      }
      const { data } = await axios.post(
        "https://83f4615b.ngrok.io/api/registration/",
        {
          username,
          password1,
          password2
        }
      );
      if (data && data.key) {
        SecureStore.setItemAsync("token", data.key);
        setMessage("Registration successful :)");
      }
    } catch (err) {
      console.log(err);
      setMessage("Registration unsuccessful :(");
    }
  };

  return (
    <Container>
      <View style={styles.inputView}>
        {message !== "start" && <Text>{message}</Text>}
        <Input
          onChangeText={text => setUsername(text)}
          placeholder='Username'
          leftIcon={{ type: "font-awesome", name: "user" }}
          inputStyle={styles.input}
        />
        <Input
          onChangeText={text => setPassword1(text)}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          placeholder='Password'
          secureTextEntry={true}
          inputStyle={styles.input}
        />
        <Input
          onChangeText={text => setPassword2(text)}
          placeholder='Re-enter password'
          leftIcon={{ type: "font-awesome", name: "lock" }}
          secureTextEntry={true}
          inputStyle={styles.input}
        />
        <Button
          title='Register'
          onPress={() => handleSubmit()}
          buttonStyle={styles.button}
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${background};
`;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 20
  },
  button: {
    margin: 20
  },
  inputView: {
    width: "80%"
  }
});
