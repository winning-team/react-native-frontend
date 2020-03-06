import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
import styled from "styled-components";
import { lightGreen, brightGreen, background } from "../styles/index";
import { Overlay } from "react-native-elements";
import Xicon from "../assets/xIcon.svg";
import Plane from "../assets/send_it.svg";
import { UpArrow } from "../assets";
import { axiosWithAuth } from "./axiosWithAuth";

// Display chat box right above the map.
// Have it only display the last 3 messages
// Messages can be when a player enters and players talk to each other.
// When expanded they can type to talk to the player and see all previous messages with scrolling

export default function Message({ messages }) {
  const [isVisible, setIsvisable] = useState(false);
  const [scrollView, setScrollView] = useState(null);
  const [text, setText] = useState("");

  console.log(text);

  const sendMessage = () => {
    if (text.length > 1) {
      axiosWithAuth().then(axios => {
        axios
          .post("api/adv/say/", { message: text })
          .then(({ data }) => {
            console.log(data);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
    setText("");
  };

  return (
    <Container>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <Text style={styles.text}>
            >{" "}
            {messages.length > 0
              ? messages[messages.length - 1]
              : "No messages yet..."}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.openMessages}
            onPress={() => setIsvisable(true)}
          >
            <UpArrow width={20} fill={brightGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <Overlay
        style={styles.overlay}
        isVisible={isVisible}
        windowBackgroundColor='rgba(255, 255, 255, .1)'
        overlayBackgroundColor={background}
        width='80%'
        height='80%'
      >
        <View style={styles.overlay}>
          <View style={styles.messagesTop}>
            <View style={styles.messagesTopTitle}>
              <Text style={{ color: brightGreen, fontSize: 20 }}>
                Game Messages
              </Text>
            </View>
            <Xicon onPress={() => setIsvisable(false)} fill={brightGreen} />
          </View>
          <View style={styles.underTitle}>
            <ScrollView
              ref={ref => setScrollView(ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollView.scrollToEnd({ animated: true });
              }}
              style={styles.scrollView}
            >
              <View>
                {messages.length > 0 ? (
                  messages.map((message, i) => (
                    <Text key={i} style={styles.message}>
                      > {message}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.message}>
                    > There is nothing to show!
                  </Text>
                )}
              </View>
            </ScrollView>
            <View style={styles.bottomChat}>
              <Input
                inputStyle={styles.input}
                value={text}
                placeholder='Say Something!'
                placeholderTextColor={brightGreen}
                onChangeText={e => setText(e)}
              />
              <TouchableOpacity
                onPress={() => {
                  sendMessage();
                }}
              >
                <Plane style={styles.Plane} fill={brightGreen} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  background-color: ${background};
`;

const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    padding: 2,
    borderBottomColor: "black",
    textAlignVertical: "top",
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  scrollView: {
    maxHeight: "85%",
    padding: 10,
    paddingBottom: 4,
    marginTop: "2%",
    borderColor: brightGreen,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 40
  },
  text: {
    color: brightGreen,
    fontSize: 20
  },
  message: {
    color: brightGreen
  },
  overlay: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  xIcon: {
    width: "25%",
    height: 50
  },
  bottomChat: {
    flexDirection: "row",
    width: "90%"
  },
  Plane: {
    width: 50,
    height: 50,
    marginTop: "65%"
  },
  openMessages: {
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "solid"
  },
  messagesTop: {
    flex: 1,
    flexDirection: "row"
  },
  messagesTopTitle: {
    width: "90%"
  },
  input: {
    color: brightGreen,
    paddingLeft: 20,
    width: "90%"
  },
  underTitle: {
    height: "100%",

    flexDirection: "column"
  }
});
