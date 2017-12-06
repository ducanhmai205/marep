'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from 'react-native';

class WelcomeTrainee extends Component {

  render() {
        const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
              
          <ImageBackground  source={require('../img/signin02.png')} style={styles.backgroundImage}>
              <View style={styles.imageAvatar}>
                       <Image  source={require('../img/user/avt.png')} style={styles.avtImage} resizeMode="contain">
                       </Image>
                      <Text style={styles.text}> ようこそ、{this.props.navigation.state.params.Account.customer.name} さん ! </Text>
                      <Text style={styles.text2}> 
                           トレーニングの効果を出す為に
                       </Text>
                       <Text style={styles.text2}> 
                           もう少しあなたの事を教えてください

                       </Text>
                    </View>



          <View style={styles.nextButton}>
                <TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {

                navigate('TraineeTreatment',{ Account: this.props.navigation.state.params.Account  });}}>

                    <Text style={{fontWeight: 'bold',color:'#3C2C6C'}}> START ! </Text> 
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
  width: null,
  height: null
},
imageAvatar:{
  flex: 0.7,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 40,
  
},
avtImage:{
  flex: 0.6,
  width: 150,
  marginTop: 60
},
text:{
  backgroundColor:'rgba(0,0,0,0)',
  fontSize: 20,
  color: '#402677',

  marginBottom: 15,
  justifyContent: 'center',
 alignItems: 'center',
 paddingHorizontal: 40
},
text2:{
  backgroundColor:'rgba(0,0,0,0)',
  fontSize: 15,
    marginBottom: 5,
  color: '#402677',
 justifyContent: 'center',
 alignItems: 'center',
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
});


export default WelcomeTrainee;