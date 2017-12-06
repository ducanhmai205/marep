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
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
class SelectTrainee extends Component {
  constructor(props){
    super(props);
    this.state={
         text: '',

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
      this.onSelect = this.onSelect.bind(this)
    }
  onSelect(value){
        this.setState({
        text: `${value}`
        })
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
                <View style={styles.select}>
                <RadioGroup
                size={12}
                color='#C2C2C2'
                style={{flexDirection: 'row' ,paddingLeft:20 }}
                  onSelect = {(value) => this.onSelect(value)}>
                  <RadioButton value={'item1'} color='#402868' >
                        <Text>オンライン</Text>
                  </RadioButton>

                    <RadioButton value={'item2'} color='#402868'>
                        <Text>評価が高い</Text>
                    </RadioButton>
                 </RadioGroup>
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
                                          <TouchableOpacity>
                                              <FontAwesome name="handshake-o" size={25} style={{ color: '#00E4BA',paddingRight:5 }} />
                                          </TouchableOpacity>
                                          <TouchableOpacity>
                                              <Foundation name="heart" size={25} style={{ color: '#00E4BA',paddingTop:3,paddingLeft:7}} />
                                          </TouchableOpacity>
                                          

                                          </View>
                                          <View style={styles.arrow}>
                                          <TouchableOpacity style={{}}  onPress={ ()=> {navigate('DetailTrainer')}}>
                                              <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#00E4BA',}} />
                                          </TouchableOpacity>

                                          </View>

                                         

                                          
                                  </View>
                                          }
                                

                  />

                </View>
            </View>
            <View style={styles.nextButton}>
                          <TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                          navigate('TraineeProfile',{Account: this.props.navigation.state.params.Account})}}>
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
  height: Dimensions.get('window').height,
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


},
flatList:{
flex: 0.8,
  marginRight: 45,
  marginLeft:43,
},
select:{
  backgroundColor:'rgba(0,0,0,0)',
justifyContent: 'center',
alignItems: 'center',

   marginRight: (Platform.OS === 'ios') ? 55 : 65,
   paddingTop:(Platform.OS === 'ios') ? 0 : 15,
  marginLeft:(Platform.OS === 'ios') ? 43 : 53,
flex: 0.07,

},

line:{
backgroundColor:'rgba(0,0,0,0)',
  flex: 1,
  borderTopWidth: 1,
  paddingTop:8,
  paddingBottom: 9,

  borderTopColor: '#6BF4B6',
    flexDirection: 'row' ,

 
 },
 avatar:{
flex: 1,
width: 60, 
height: 60, 
borderRadius: 120/2,
backgroundColor: 'pink',


 },
 text:{
flex: 2,
paddingTop:8,
paddingLeft:3,

 },
 icon:{
flex: 1.5,
justifyContent: 'center',
alignItems: 'center',
paddingTop:15,

flexDirection: 'row' ,
paddingRight:6
 },
 arrow:{
flex: 0.2,
paddingTop:17,

justifyContent: 'center',
alignItems: 'center',
 }

 



});


export default SelectTrainee;