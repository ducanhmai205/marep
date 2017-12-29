'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import Dimensions from 'Dimensions';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
class ChatTrainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: [
      {id: '1',send:'nguyen van a',retrive:'abc'},
      {id: '2',send:'nguyen van b',retrive:'xyz'},
      {id: '3',send:'nguyen van c',retrive:'xyz'},
      {id: '4',send:'nguyen van d',retrive:'xyz'},
      {id: '5',send:'nguyen van e',retrive:'xyz'},
      {id: '6',send:'nguyen van f',retrive:'xyz'},
      {id: '7',send:'nguyen van g',retrive:'xyz'},
      {id: '8',send:'nguyen van h',retrive:'xyz'},
      {id: '9',send:'nguyen van z',retrive:'xyz'},
       
       ]
    };
  }
  render() {
    return (
      <Image  source={require('../img/user/chat.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
      <View style={styles.headerContent}>

              <TouchableOpacity style={styles.icon}   >
                                <Ionicons name="ios-arrow-back" size={20} />
              </TouchableOpacity>


      <View style={styles.text}>
                                <Text numberOfLines={1} style={{flex:1,paddingHorizontal: 40,justifyContent: 'center', alignItems: 'center',}}> ssssssssssssssssssssss</Text>

      </View>

      </View>

      <View style={styles.mainContent}>
             <View style={styles.date}>
                    <View  style={{ flex:0.2,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:1,alignItems: 'center',justifyContent: 'center',backgroundColor: 'white' }}>
                                <Text
                                style={{
                                  backgroundColor: 'transparent',                                      
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                30/4
                                </Text>
                   </View>
            </View>


            <View style={styles.chatContent}>
                  
            </View>


      </View>

      <KeyboardAvoidingView style={styles.bottomContent}      behavior="padding">
      <View style={styles.showPoint}>
                                <Text> POINT/10000</Text>
                                <Text style={{fontSize: 10,alignItems: 'flex-end'  }}>pt </Text>
      </View>

      <View style={styles.formSentMess}>
      <View style={styles.formInput}>

            <View style={{flex: 0.5,backgroundColor: '#DCDCDC',borderRadius: 50,flexDirection: 'row'  }}>
                                <TextInput

                                style={{flex: 0.9,backgroundColor: '#DCDCDC',borderRadius: 50,paddingLeft:20}}
                                underlineColorAndroid='transparent'      
                                autoCapitalize="none"
                                placeholder="メッセージ入力"
                                placeholderTextColor = "#717171"
                                returnKeyType = {"next"}
                                />
              <TouchableOpacity style={{justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row' }}>
                                <Text style={{color: '#717171'}}> 送信</Text>
              </TouchableOpacity>
            </View>

   
      </View>

            <View style={styles.buttonMedia}>
              <TouchableOpacity style={{flex:1,paddingRight:10}}>
                                <FontAwesome name="video-camera" size={20} color="black"  />
              </TouchableOpacity>

              <TouchableOpacity  style={{flex:1,}}>
                                <FontAwesome name="camera" size={20} color="black" />
              </TouchableOpacity>
            </View>
      </View>
      </KeyboardAvoidingView>
      </View>
      </Image>
      );
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container:{
    flex: 1,

  },
  headerContent:{
    flex: 0.7,
    flexDirection: 'row' ,
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  icon:{
    flex:0.2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text:{
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent:{
    flex: 7.7,
    marginHorizontal: 20,
  },
  date:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row' ,

  },
  chatContent:{
    flex: 15,

  },
  bottomContent:{
    flex: 1.3,

  },
  showPoint:{
    flex:0.7,
    flexDirection:  'row' ,
    backgroundColor:'#DCDCDC',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight:15
  },
  formSentMess:{
    flex:2,
    backgroundColor: 'white',
    flexDirection: 'row' ,
  },
  formInput:{
    flex: 7.6,
    justifyContent: 'center',
    paddingHorizontal: 20


  },
  buttonMedia:{
    flex: 2.4,
    flexDirection: 'row' ,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:15
  }

});


export default ChatTrainer;