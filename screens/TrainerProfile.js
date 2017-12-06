'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  FlatList

} from 'react-native';
import Dimensions from 'Dimensions';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';
class TrainerProfile extends Component {
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
          ]

        }
      }
   static navigationOptions = {
    drawerLabel: 'TrainerProfile',
    
  };

  render() {
     const { navigate } = this.props.navigation;
const {goBack} = this.props.navigation;
    return (
    
          <Image  source={require('../img/user/enter_trainerbg.png')} style={styles.backgroundImage}>
              <View style={styles.backgroundContainer}>
                          
                                <View style={styles.header}>
                                  <View style={styles.iconrightHeader}>
                                  <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
                                  onPress={()=> {
                          navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account  });}}>
                                     <Entypo name="menu" size={34} color="#00CA8F" />
                                  
                                  
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
                                                    <Text> {this.props.navigation.state.params.Account.trainer.name} </Text>
                                                  </View>
                                                  <View style={styles.busyButton} >
                                                    <TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                                                         <Image  resizeMode="contain" source={require('../img/user/busy.png')} style={{flex: 1,}}>

                                                         </Image>
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
flex: (Platform.OS === 'ios') ? 0.8 : 0.8 ,

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
  flex: 1,
   width: 90,
    height: 90,
    borderRadius: 180/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
},
textName:{
flex: (Platform.OS === 'ios') ? 1. : 0.9 ,

},
Name:{
backgroundColor:'rgba(0,0,0,0)',
  flex: 0.5,
justifyContent: 'center',
alignItems: 'center',
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
flex: (Platform.OS === 'ios') ? 1.8 : 2 ,


},
onlineButton:{
flex: 0.3,

},
textInfo:{
flex: (Platform.OS === 'ios') ? 1.8 : 1.6 ,

},
});


export default TrainerProfile;