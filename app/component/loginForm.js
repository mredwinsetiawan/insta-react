import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";

import {Actions} from 'react-native-router-flux'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  render() {
    const Button =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    const animating = this.state.loading;

    AsyncStorage.getItem('token').then((value)=> {
        if (!isEmpty(value)) {
            Actions.main()
        }
    }).done()

    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={animating}
          size="large"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 80
          }}
        />
      );
    }
    return <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.textContent}>InstaReact</Text>
        <View style={styles.containerForm}>
          <TextInput style={styles.inputForm} keyboardType="email-address" placeholder="Email" placeholderTextColor="black" underlineColorAndroid={"rgba(0,0,0,0)"} />
          <TextInput style={styles.inputForm} secureTextEntry placeholder="Password" placeholderTextColor="black" underlineColorAndroid={"rgba(0,0,0,0)"} />
          <Button accessbilityComponentType="button" accessibilityLabel="Login" disabled={false} onPress={this._onLoginClicked.bind(this)}>
            <View style={styles.btnLogin}>
              <Text>Login</Text>
            </View>
          </Button>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
            <Text style={{ flex: 0, color: "white" }}>
              Dont have account?
            </Text>
            <TouchableOpacity style={{ flex: 0 }} onPress={() => Actions.register()} disabled={false} accessibilityComponentType="button" accessibilityLabel="Register">
              <Text style={{ flex: 0, color: "#FF9800" }}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>;
  }

  _onLoginClicked() {
    this.setState({ loading: true });
  }
}

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    justifyContent: "center"
  },
  textContent: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 15
  },
  containerForm: {
    flex: 0,
    paddingLeft: 25,
    paddingRight: 25
  },
  inputForm: {
    color: "black",
    backgroundColor: "white",
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  btnLogin: {
    backgroundColor: "#64B5F6",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
