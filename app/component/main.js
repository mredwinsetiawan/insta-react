import React from 'react'
import {
  View,
  Text,
  AsyncStorage,
  ListView,
  Image,
  StyleSheet,
  Dimensions, ActivityIndicator
} from 'react-native'
import {Actions} from 'react-native-router-flux'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import Stories from './stories'

const jsonUrl = 'http://instareact.herokuapp.com/data.json'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Main extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      loading:true,
      isSuccess:false
    }
  }

  componentDidMount(){
    return fetch(jsonUrl)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      this.setState({
        loading: false, isSuccess:true,
        data: ds.cloneWithRows(resJson)
      })
    }).catch((err) => {
      this.setState({ loading: false, isSuccess:false })
      alert('Failed get data from API.')
    })
  }

  _renderRow(rowData){
    return(
        <View style={{flex:1}}>
          <View style={styles.header}>
            <Text>{rowData.title}</Text>
          </View>
          <View style={styles.itemContent}>
            <Image source={{uri: rowData.image}} style={styles.image}/>
          </View>
        </View>
    )
  }

  _renderListView(){
    return (
      <View style={{flex:1}}>
      </View>
    )
  }
  render(){
    if (this.state.loading) {
      return(<ActivityIndicator
        style={{flex:1, alignItems:'center', justifyContent:'center'}} size='large'/>)
    }
    return(<View style={{flex:1}}>
      <ListView
        enableEmptySections={true}
        dataSource={this.state.data}
        renderRow={this._renderRow.bind(this)}
        renderHeader={() => <Stories />} />
      </View>)
  }
}

const styles = StyleSheet.create({
  image:{width: width, height: height/3},
  header:{
    padding:10
  },
  itemContent: {
    flex:0,
    height: height/3 + 5
  }
})
