import React, { useEffect, useState } from "react";
import Dpad from "../assets/dpad.svg"
import { StyleSheet, View, Text, TouchableHighlight, Alert, Dimensions } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import { axiosWithAuth } from "./axiosWithAuth";
import { background } from "../styles";
import { render } from "react-dom";

function Move(dir) {
    console.log(dir)
    axiosWithAuth().then(axios => {
      axios.post("api/adv/move/",{
        direction: dir
      })
      .then(function ({data}) {
        console.log(data)
      })
      .catch(function (error){
        console.log(error)
      })
    })
  };

export default function Game(){
    return (
    <View style={styles.container}>
        <View>
            <Text style={styles.game_response_text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        </View>
        <View style={styles.dpad}>
          <Dpad width={250} height={250}/>
        </View>
        <View style={styles.dpad_overlay}>
          {/* up */}
          <TouchableHighlight onPress={() => Move("n")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
          <View style={styles.mid_row}>
            {/* left */}
            <TouchableHighlight onPress={() => Move("w")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
            {/* spacing */}
            <View style={styles.dpad_button}/>
            {/* right */}
            <TouchableHighlight onPress={() => Move("e")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
          </View>
          {/* down */}
          <TouchableHighlight onPress={() => Move("s")} style={styles.dpad_button} underlayColor='rgba(0,0,0,0.2)'>
            <View/>
          </TouchableHighlight>
        </View>
       </View>
    );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: background
    },
    game_response_text: {
        width: width - 32,
        padding: 8,
        marginTop: 32,
        borderBottomColor: 'black',
        textAlignVertical: 'top',
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: 'solid',
        color: 'red'
    },
    dpad: {
        position: "absolute",
        bottom: -37,
        left: 0,
      },
      dpad_overlay:{
        position: "absolute",
        left: 39,
        bottom: 31,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 3.1
      },
      dpad_button: {
        height: 56,
        width: 56,
      },
      mid_row: {
        flexDirection: 'row',
      },
})