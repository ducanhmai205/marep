'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Dimensions from 'Dimensions';
import { Entypo } from '@expo/vector-icons'
class TraineeProfile extends Component {
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
  render() {
    const { navigate } = this.props.navigation;
const {goBack} = this.props.navigation;
    return (
   <Image  source={require('../img/user/enter_userbg.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
        <View style={styles.header}>
             <View style={styles.iconrightHeader}>
                                  <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
                                  onPress={()=> {
                          navigate('MenuUser',{ Account: this.props.navigation.state.params.Account  });}}>
                                     <Entypo name="menu" size={34} color="#00CA8F" />
                                  
                                  
                                  </TouchableOpacity>
              </View> 
              <View style={styles.spaceHeader}>
               </View>
               <View style={styles.iconleftHeader}>
                                  <TouchableOpacity style={{flex:1}}>
                                            <Image  source={require('../img/user/grp.png')} style={styles.round} />
                                    </TouchableOpacity>                                        
                                     
                           
               </View>
       </View>
       


       <View style={styles.avatar}>
                     <View style={styles.avatarImage}>
                         <Image   resizeMode="cover" source={require('../img/profile/circle.png')} style={styles.picIcon}>

                         </Image>
                     </View>
         </View>

        <View style={styles.textName}>
          <Text style={{color:'#3D2C66'}}> {this.props.navigation.state.params.Account.customer.name}</Text>
          

        </View>

        <View style={styles.flatList}>
              
        </View>

        

        <View style={styles.six}>
        <TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
            <Image  resizeMode="contain" source={require('../img/profile/point.png')} style={{flex: 0.4,}}>

            </Image>
             </TouchableOpacity>
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
container:{
flex: 1,

},
header:{
  flex: 0.3,
  flexDirection: 'row' 

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
 height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100/2,
  },
spaceHeader:{
  flex: 0.65,
  
},
round:{

    height: 50,
    width: 50,
    
    borderRadius: 50/2,
resizeMode: 'cover',
},
avatar:{
  flex: 0.5,
  alignSelf: 'center',
    height: 90,
    width: 90,
   
    borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center',
    
},
avatarImage:{
height: null,
width: null,
},
pic1:{
flex: 1,

},
pic2:{
flex: 1,
},
pic3:{
flex: 1,
marginLeft: 15
},
textName:{
  flex: 0.3,
paddingBottom: 60,
justifyContent: 'center',
alignItems: 'center',
backgroundColor:'rgba(0,0,0,0)',
},
flatList:{
  flex: 0.8,
  marginHorizontal: 20,
  paddingBottom: 20
},

six:{
  flex: 0.7,
  justifyContent: 'center',
  alignItems: 'center',
},
});


export default TraineeProfile;