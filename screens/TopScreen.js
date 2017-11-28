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
          Login: require('../img/topscreen.png')
};
    return (
      <View style={styles.container}>
        <Image  source={Backgrounds.Login} style={styles.backgroundImage}>
             <View style={styles.one}>
               
             </View>
            
              <View style={styles.two}>
               <View style={styles.two2}>
                  <View style={styles.two4}>

                </View>
                  <View style={styles.two5}>
                      <TouchableOpacity onPress={ ()=> {navigate('LoginScreen')}} style={{flex: 1,}}>
                      <Image source={require('../img/user/top3.png')} style={{flex:1,
                        width: null,
                      height: null,
                    }}
                    resizeMode="contain">
                      </Image>

                     
                </TouchableOpacity>
                </View>
                  <View style={styles.two6}>

                </View>
                </View>
                <View style={styles.two3}>
                      <View style={styles.two7}>

                       </View>

                       <View style={styles.two8}>
                            <TouchableOpacity 
                 onPress={ ()=> {navigate('RegisterScreen')}} style={{flex: 1,}}>
                      <Image source={require('../img/buttontop.png')} style={{flex:1,
                        width: null,
                      height: null,
                    }}
                    >
                      </Image>
                         </TouchableOpacity>
                       </View>

                       <View style={styles.two9}>

                        </View>
                </View>
              </View>
                  <View style={styles.three}>

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
one:{
  flex: 4,
  
  
},
two:{
  flex: 1.2,
},
two2:{
  flex: 1,
 
flexDirection: 'row',

},
two4:{
  flex: 1,
},
two5:{
  flex: 2.3,
  marginBottom: (Platform.OS === 'ios') ? 18 : 0,
paddingRight:12,
marginHorizontal:3
},
two6:{
  flex: 0.9,
},
two7:{
  flex: 1,
},
two8:{
  flex: 2.3,
  marginBottom: (Platform.OS === 'ios') ? 20 : 5,
  marginTop: (Platform.OS ==='ios') ? 0 : 11,
  marginRight:5

},
two9:{
  flex: 0.9,
  


},
two3:{
  flex: 1,
  flexDirection: 'row',

},
three:{
  flex:0.8,


},

});


export default TopScreen;