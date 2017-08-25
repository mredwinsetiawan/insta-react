import React, {Component} from 'react'

import {
  Animated,
  View,
  Text,
  StyleSheet
} from 'react-native'

import{
  TabViewAnimated, TabBar, SceneMap
} from 'react-native-tab-view'
import Mian from './main'
import Register from './registerForm'

export default class TabView extends Component{
  constructor(props){
    super(props)
    this.state = {
      index:0;
      routes: [
        { key: '1', title: 'Home', icon:'home'},
        { key: '2', title: 'Seacrh', icon:'seacrh'}
      ]
    }
  }
}
