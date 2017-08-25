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
  AsyncStorage
} from "react-native";

import {graphql, gql, compose} from 'react-apollo'
const createUser = gql`
    mutation($email: String!, $password: String!, $name: String!){
        createUser(authProvider:{email:{email: $email, password: $password}},
        name:$name){
            id
        }
    }
`
const signinUser = gql`
    mutation($email:String!,$password:String!){
        signinUser(email:{email:$email,password:$password}){
            token
        }
    }
`

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      email: '',
      password: ''
    };
  }
  render() {
    const Button =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    const animating = this.state.loading;
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
    return (
      <View style={styles.container}>
        <Text style={styles.textContent}>REGISTER</Text>
        <View style={styles.containerForm}>
          <TextInput
            style={styles.inputForm}
            placeholder="name"
            placeholderTextColor="black"
            underlineColorAndroid={"rgba(0,0,0,0)"}
            onChangeText={(text)=>this.setState({name:text})}
          />
          <TextInput
            style={styles.inputForm}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="black"
            underlineColorAndroid={"rgba(0,0,0,0)"}
            onChangeText={(text)=>this.setState({email:text})}
          />
          <TextInput
            style={styles.inputForm}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="black"
            underlineColorAndroid={"rgba(0,0,0,0)"}
            onChangeText={(text)=>this.setState({password:text})}
          />
          <Button
            accessbilityComponentType="button"
            accessibilityLabel="Login"
            disabled={false}
            onPress={this._onLoginClicked.bind(this)}
          >
            <View style={styles.btnLogin}>
              <Text>Submit</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }

  _onLoginClicked() {
    //this.setState({ loading: true });
    const { name, email, password } = this.state
    if (isEmpty(name)) {
        alert('Please input your name.')
    }else if (isEmpty(email)) {
        alert('Please input your email.')
    }else if (isEmpty(password)) {
        alert('Please input your password')
    }else{
        this.setState({loading:true})
        this.props.createUser({variables:{email,password,name}})
            .then((response)=>{
                this.props.signinUser({variables:{email, password}})
                    .then((response)=>{
                        AsyncStorage.setItem('token', response.data.signinUser.token)
                        this.setState({loading:false})
                        alert('User register is success and have loggedin.')
                    }).catch((e)=>{
                        this.setState({loading:false})
                        console.error(e)
                        alert('User login is failed.')
                    })
            }).catch((e)=>{
                this.setState({loading:false})
                console.error(e)
                alert('User register is failed.')
            })
    }

    //alert(name+email+password)
  }
}

const isEmpty = (value) => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

const styles =
 StyleSheet.create({
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

const Register = compose(graphql(createUser, {name:'createUser'}),
    graphql(signinUser, {name:'signinUser'})
)(RegisterForm)
export default Register
