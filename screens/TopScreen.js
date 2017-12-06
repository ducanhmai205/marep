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
class TopScreen extends Component {
  render() {
        const { navigate } = this.props.navigation;
        const Backgrounds = {
        Login: require('../img/topbg.png')
};
  return (
      <View style={styles.container}>
        <Image  source={Backgrounds.Login} style={styles.backgroundImage}>
             <View style={styles.containerOne}>
               
             </View>
            
             <View style={styles.containerButton}>
               <View style={styles.loginButton}>
                  <View style={styles.rightSpace} /> 
                  <View style={styles.mainButtonLogin}>
                      <TouchableOpacity onPress={ ()=> {navigate('LoginScreen')}} style={{flex: 1,}}>
                            <Image source={require('../img/user/top3.png')} style={styles.loginImage} resizeMode="contain">
                            </Image>
                      </TouchableOpacity>
                  </View> 

                  <View style={styles.leftButton} />

                    
              </View>                                   
                <View style={styles.registerButton}>
                      <View style={styles.leftRegister} />

                      <View style={styles.mainButtonRegister}>
                            <TouchableOpacity onPress={ ()=> {navigate('RegisterScreen')}} style={{flex: 1,}}>
                                <Image source={require('../img/buttontop.png')} style={styles.registerImage}>
                                </Image>
                            </TouchableOpacity>
                      </View>

                      <View style={styles.rightRegister} />

                  
                </View>
            </View>
                  <View style={styles.bottom}>

                  </View>
            

        </Image>
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
  height: null,
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
},
containerOne:{
  flex: 4,

},
containerButton:{
  flex: 1.2,
 
},
loginButton:{
  flex: 1,
  flexDirection: 'row',
  
},
rightSpace:{
  flex: 1,

},
mainButtonLogin:{
  flex: 2.3,
  marginBottom: (Platform.OS === 'ios') ? 18 : 0,
  paddingRight:12,
  marginHorizontal:3,


},
leftButton:{
  flex: 0.9,

},
leftRegister:{
  flex: 1,
},
mainButtonRegister:{
  flex: 2.3,
  marginBottom: (Platform.OS === 'ios') ? 20 : 5,
  marginTop: (Platform.OS ==='ios') ? 0 : 11,
  marginRight:5
},
rightRegister:{
  flex: 0.9,
},
registerButton:{
  flex: 1,
  flexDirection: 'row',
  
},
bottom:{
  flex:0.8,
},

});


export default TopScreen;