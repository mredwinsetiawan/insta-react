import React, {Component} from 'react'
import {Router, Scene} from 'react-native-router-flux'

import LoginForm from './component/loginForm'
import Register from './component/registerForm'
import Main from './component/main'

import {AsyncStorage} from 'react-native'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'

const ENDPOINT = 'https://api.graph.cool/simple/v1/cj6n1l6pk0ss30178zldvfex0'
const networkInterface = createNetworkInterface({uri:ENDPOINT})

networkInterface.use([{
  applyMiddleware(req, next){
    if (req.options.headers) {
      req.options.headers = {}
    }
    AsyncStorage.getItem('token').then((value) => {
      if (!isEmpty(value)) {
        req.options.headers.authorization = `Bearer ${value}`
      }
    }).done()
    next()
  }
}])

const isEmpty = (value) => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0)

const client = new ApolloClient({networkInterface})

export default class App extends Component {
  render(){
    return(
      <ApolloProvider client={client} >
        <Router>
          <Scene key="root">
            <Scene key="login" component={LoginForm} title="Login" hideNavBar/>
            <Scene key="register" component={Register} title="Register" />
            <Scene key="main" component={Main} title="Home" />
          </Scene>
        </Router>
      </ApolloProvider>
    )
  }
}
