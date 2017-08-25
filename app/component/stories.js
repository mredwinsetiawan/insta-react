import React, {Component} from 'react'

import {
  View,
  StyleSheet,
  Dimensions,
  ListView,
  Image, Text
} from 'react-native'

const storiesData = [{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},
{name:'Jhoun Dhoe', picture:'https://www.dropbox.com/s/bt126qefy1gzblc/m3.jpeg?dl=1'},]
const width = Dimensions.get('window').width

export default class Stories extends Component{
  constructor(props) {
    super(props)
    const dStories = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    this.state = {
      data: dStories.cloneWithRows(storiesData)
    }
  }

  _renderRow(rowData){
    return (
      <View style={styles.pictureContainer}>
        <Image style={styles.pictureContent} source={{uri:rowData.picture}} />
        <Text style={styles.name}>{rowData.name}</Text>
      </View>
    )
  }

  render(){
    return(<View style={styles.container}>
      <ListView
      style={{width:width}}
      dataSource={this.state.data}
      horizontal={true}
      vertical={false}
      renderRow={this._renderRow.bind(this)}
      showHorizontalScrollIndicator={false}/></View>)
  }
}

const styles = StyleSheet.create({
  container:{padding:5, width: width, height:90, backgroundColor:'white'},
  pictureContainer:{flex:1, height:80, alignItems:'center'},
  pictureContent:{width:50, height:50, margin:5, borderRadius:50/2},
  name:{marginBottom:5, paddingRight:10, fontSize:12, fontWeight:'100'}
})
