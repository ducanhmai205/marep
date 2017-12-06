'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import Dimensions from 'Dimensions';
import { Ionicons, FontAwesome,Foundation} from '@expo/vector-icons';
class SelectTrainee extends Component {
  constructor(props){
    super(props);
    this.state={
        hidePassword: true,
         mang:[
          {key:'0',hoten:"guest 1"},
          {key:'1',hoten:"guest 2"},
          {key:'2',hoten:"guest 3"},
          {key:'3',hoten:"guest 4"},
          {key:'4',hoten:"guest 5"},
          {key:'5',hoten:"guest 6"},
          {key:'6',hoten:"guest 7"},
          {key:'7',hoten:"guest 8"},
          {key:'8',hoten:"guest 9"},
          {key:'10',hoten:"guest 10"},
          {key:'11',hoten:"guest 11"},
          {key:'12',hoten:"guest 12"},


         ]
      }
    }
  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  render() {
const { navigate } = this.props.navigation;
const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
           <ImageBackground  source={require('../img/signin04_trainerscreen.png')} style={styles.backgroundImage}>
            <View style={styles.containerImage}>
                <View style={styles.header}>
                <TouchableOpacity style={{flex: 0.3}} onPress={() => goBack()}>
                       <Ionicons name="ios-arrow-back" size={20} style={{ backgroundColor:'rgba(0,0,0,0)'}} />
                </TouchableOpacity>
                <Text style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',paddingTop:15}}> お悩みを解決できそうな
                {"\n"}
                 

                ユーザーを選んでください</Text>

                </View>

                <View style={styles.flatList}>
                  <FlatList
                    data={this.state.mang}
                    renderItem={({item}) =>
                                  <View style={styles.line}>
                                          <View style={styles.avatar}>


                                          </View>
                                            
                                          <View style={styles.text}>
                                            <Text> namename </Text>
                                              <Text style={{paddingTop:5,fontSize: 9}}> シェイプアップ,腰痛 </Text>

                                          </View>

                                          <View style={styles.icon}>
                                           <TouchableOpacity onPress = { this.managePasswordVisibility }>
                                            <FontAwesome name="handshake-o" size={25} color={( this.state.hidePassword ) ? 'green':'#dcdcdd'} style={{paddingRight:5 }} />
                                           </TouchableOpacity>
                                            <TouchableOpacity onPress = { this.managePasswordVisibility }>
                                            <Foundation name="heart" size={25} style={{ color: 'green',paddingTop:3}} />
                                             </TouchableOpacity>
                                          </View>

                                         

                                          <View style={styles.point}>
<Text style={{fontSize:12}}> 10000pt</Text>

                                          </View>
                                  </View>
                                          }
                                

                  />

                </View>
            </View>
            <View style={styles.nextButton}>
                          <TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                          navigate('TrainerProfile',{Account: this.props.navigation.state.params.Account });}}>
                              <Text style={{fontWeight: 'bold'}}> FINISH <Ionicons  name="ios-arrow-forward" size={15}  /> </Text> 
                        </TouchableOpacity> 
                        </View>
           </ImageBackground>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
container:{
  flex: 1,
},
backgroundImage:{
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
},
nextButton:{
   flex: 1,
   flexDirection: 'row' , 
   position:'absolute',
   bottom: 0,
   height: 70,
   backgroundColor:'white',
   width: '100%',
  
},
TouchableOpacity:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
containerImage:{
  flex: 1,
},
header:{
flex:(Platform.OS === 'ios') ? 0.15 : 0.1,
flexDirection: 'row' ,
justifyContent: 'center',
alignItems: 'center',
marginHorizontal: 25,
marginBottom:4
},
flatList:{

  flex: 0.9,
  marginRight: 45,
  marginLeft:43,
  paddingTop:(Platform.OS === 'ios') ? 0 : 20,
 
},
line:{
  flex: 1,
  borderBottomWidth: 1,
  paddingVertical: 8,
  borderBottomColor: '#6BF4B6',
    flexDirection: 'row' ,
 
 
 },
 avatar:{
flex: 1,
 width: 60,
height: 60,
    borderRadius: 100/2,
    backgroundColor: 'red'

 },
 text:{
flex: 2,
paddingTop:8,
paddingLeft:3,
backgroundColor:'rgba(0,0,0,0)',
 },
 icon:{
flex: 1,
backgroundColor:'rgba(0,0,0,0)',
justifyContent: 'center',
alignItems: 'center',
paddingTop:15,
flexDirection: 'row' 
 },

 point:{
flex: 0.9,
paddingTop:15,

backgroundColor:'rgba(0,0,0,0)',
justifyContent: 'center',
alignItems: 'center',
 },

left:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
right:{
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
},


});


export default SelectTrainee;