import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Text>Hello there</Text>
        <ButtonsView>
          <ButtonView>
            <Button
              title='Yeet'
              color='green'
              onPress={() => {
                Actions.push('Map');
              }}
            />
          </ButtonView>
          <ButtonView>
            <Button
              title='Login'
              color='green'
              onPress={() => {
                Actions.push('Login');
              }}
            />
          </ButtonView>
          <ButtonView>
            <Button
              title='Register'
              color='green'
              onPress={() => {
                Actions.push('Register');
              }}
            />
          </ButtonView>
          <ButtonView>
            <Button
              title='Message'
              color='green'
              onPress={() => {
                Actions.push('Message');
              }}
            />
          </ButtonView>
        </ButtonsView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const ButtonView = styled.View`
  width: 90%;
  margin: 10px;
`;

const ButtonsView = styled.View`
  width: 100%;
  flex: 1;
  height: 50px;
`;
