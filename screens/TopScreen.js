  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
  } from 'react-native';
  import { LinearGradient } from 'expo';
  import Dimensions from 'Dimensions';
  class TopScreen extends Component {
    render() {
          const { navigate } = this.props.navigation;
          const Backgrounds = {
          background: require('../img/topbg.png'),
          loginButton: require('../img/user/top3.png'),
          registerButton: require('../img/buttontop.png')

  };
    return (
        
          <Image  source={Backgrounds.background} style={styles.backgroundImage}>
               <View style={styles.containerOne}>
               </View> 

               <View style={styles.containerButton}>

                  <View style={styles.loginButton}>
                      <View style={styles.rightSpace} /> 

                              <View style={styles.mainButtonLogin}>
                                    <TouchableOpacity onPress={ ()=> {navigate('LoginScreen')}} style={{flex: 1,}}>
                                         <Image source={Backgrounds.loginButton} style={styles.loginImage} resizeMode="contain">
                                         </Image>
                                    </TouchableOpacity>
                              </View>

                      <View style={styles.leftButton} /> 
                  </View> 

                  <View style={styles.registerButton}>
                        <View style={styles.leftRegister} />

                              <View style={styles.mainButtonRegister}>
                                    <TouchableOpacity onPress={ ()=> {navigate('RegisterScreen')}} style={{flex: 0.9,}}>
                                        <Image source={Backgrounds.registerButton}  style={styles.registerImage}>
                                        </Image>
                                    </TouchableOpacity>
                              </View>

                        <View style={styles.rightRegister} />
                                                       
                  </View>  

              </View>
                    <View style={styles.bottom}>

                    </View> 

              

          </Image>
        
      );
    }
  }

  const styles = StyleSheet.create({

  backgroundImage:{
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  loginImage:{
    flex:1,
    width: null,
    height: null,
  },
  registerImage:{
    flex:1,
    width: null,
    height: null,
    paddingTop: 30
  },
  containerOne:{
    flex: 4,

  },
  containerButton:{
    flex: 1.5,
  marginTop:50
  },
  loginButton:{
    flex: 0.9,

    flexDirection: 'row',
    
  },
  rightSpace:{
    flex: 1,

  },
  mainButtonLogin:{
    flex: 2.3,
    marginBottom: (Platform.OS === 'ios') ? 10 : 0,
    paddingRight:12,
    marginHorizontal:3,


  },
  leftButton:{
    flex: 0.9,

  },
  leftRegister:{
    flex: 1.1,
  },
  mainButtonRegister:{
    flex: 2.7,
    marginBottom: (Platform.OS === 'ios') ? 20 : 5,
    marginTop: (Platform.OS ==='ios') ? 0 : 11,
    marginRight:5,

  },
  rightRegister:{
    flex: 1,
  },
  registerButton:{
    flex: 1,



    flexDirection: 'row',
    
  },
  bottom:{
    flex:0.9,
  },

  });


  export default TopScreen;