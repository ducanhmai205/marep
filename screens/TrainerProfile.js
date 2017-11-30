'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,

} from 'react-native';
import Dimensions from 'Dimensions';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';
class TrainerProfile extends Component {
   static navigationOptions = {
    drawerLabel: 'TrainerProfile',
    
  };

  render() {
    return (
    
          <Image  source={require('../img/user/enter_trainer2.png')} style={styles.backgroundImage}>
              <View style={styles.backgroundContainer}>
                          
                                <View style={styles.header}>
                                  <View style={styles.iconrightHeader}>
                                  <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
                                  onPress={ () => { props.navigation.navigate('DrawerOpen') } }>
                                     <Entypo name="menu" size={34} color="#7CE7D6" />
                                  
                                  
                                  </TouchableOpacity>
                                  </View> 
                                    <View style={styles.spaceHeader}>
                                    </View>
                                  <View style={styles.iconleftHeader}>
                                  <TouchableOpacity style={{flex:1}}>
                                            <Image  source={require('../img/user/grp.png')} style={styles.picIcon} />
                                    </TouchableOpacity>                                        
                                     
                           
                                  </View>
                                </View>

                                      <View style={styles.avatar}>
                                          <View style={styles.avatarImage}>

                                          </View>
                                      </View>

                                           <View style={styles.textName}>
                                              
                                                  <View style={styles.Name}>
                                                   
                                                  </View>
                                                  <View style={styles.busyButton} >
                                                    <TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                                                         
                                                    </TouchableOpacity>   
                                                  </View>
                                           </View>

                                                  <View style={styles.selectShow}>
                                                            <View style={styles.dropDownMenu}>

                                                            </View>
                                                  </View>

                                                              <View style={styles.flatlistHorizontal}>
                                                              
                                                              </View>

                                                                      <View style={styles.onlineButton}>
                                                                      
                                                                      </View>

                                                                            <View style={styles.textInfo}>
                             
                                                                            </View>
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
  resizeMode: 'stretch',
},
backgroundContainer:{
  flex:1,
 
},
header:{
flex: (Platform.OS === 'ios') ? 1 : 0.8 ,

flexDirection:'row',
},
iconrightHeader:{
  flex: 0.15,
  
  backgroundColor:'rgba(0,0,0,0)',
  justifyContent: 'center',
  alignItems: 'center',
  
},
iconleftHeader:{
  flex: 0.2,
  paddingTop: 20,
  
 justifyContent: 'center',
 alignItems: 'center',
},
picIcon:{

    height: 50,
    width: 50,
    
    borderRadius: 50/2,
resizeMode: 'cover',
},
spaceHeader:{
  flex: 0.65,
  
},
avatar:{
flex: 1,
justifyContent: 'center',
alignItems: 'center',

},
avatarImage:{
width: 70,
height: 70,
borderRadius: 140/2,

},
textName:{
flex: (Platform.OS === 'ios') ? 1 : 0.9 ,
},
Name:{

  flex: 0.5,
},
busyButton:{
  flex: 0.4,


 
},

selectShow:{
flex: 0.5,
marginBottom: 20,


},
dropDownMenu:{
  flex: 1,
  
},

flatlistHorizontal:{
flex: (Platform.OS === 'ios') ? 2.1 : 2 ,

},
onlineButton:{
flex: 0.5,

},
textInfo:{
flex: (Platform.OS === 'ios') ? 1.8 : 1.6 ,

},
});


export default TrainerProfile;