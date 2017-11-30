'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from 'Dimensions';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
class TrainerSpecialize extends Component {
  constructor(){
        super()
        this.state = {
            text: ''
        }
        this.onSelect = this.onSelect.bind(this)
    }

  onSelect(index, value){
  this.setState({
    text: `${value}`
  })
}
  render() {
  	const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
            		 <ImageBackground  source={require('../img/signin03_trainerscreen.png')} style={styles.backgroundImage}>
                  <View style={styles.icon}>
                <TouchableOpacity onPress={ () => goBack(null)  }>
                      <Ionicons  name="ios-arrow-back-outline" size={20}  />
                </TouchableOpacity>
            </View>
                <View style={styles.center}>
              <Text style={styles.text2}>あなたの得意分野を教えてください </Text>
                 <View style={styles.inside}>
                  <RadioGroup
                  size={15}
                  color='#fafafa'
                  
                  
                  thickness={8}
                     onSelect = {(index, value) => this.onSelect(index, value)}>
                   
                     <RadioButton  activeColor='#80d8ff' value={'item1'} >
                       <Text style={styles.text3}>シェイプアップ</Text>
                                  </RadioButton>
                    
                     <RadioButton activeColor='#80d8ff' highlightColor='#80d8ff' value={'item2'}>
                       <Text style={styles.text3}>筋肉強化</Text>
                     </RadioButton>
 
                     <RadioButton activeColor='#80d8ff' value={'item3'}>
                       <Text style={styles.text3}>体の痛みを取る</Text>
                     </RadioButton>

                     <RadioButton activeColor='#80d8ff' value={'item4'}>
                       <Text style={styles.text3}>体の歪みをとる</Text>
                                  </RadioButton>
              
                     <RadioButton activeColor='#80d8ff' value={'item5'}>
                       <Text style={styles.text3}>冷え性改善</Text>
                     </RadioButton>
 
                     <RadioButton activeColor='#80d8ff' highlightColor='#84ffff' value={'item6'}>
                       <Text style={styles.text3}>便秘改善</Text>
                     </RadioButton>
                     <RadioButton activeColor='#80d8ff' highlightColor='#80d8ff' value={'item7'}>
                       <Text style={styles.text3}>むくみを取る</Text>
                     </RadioButton>
                     
                   </RadioGroup>             
                    

                 </View>   
            </View>
            		           <View style={styles.nextButton}>
                					<TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                					navigate('SelectTrainee');}}>
                					    <Text style={{fontWeight: 'bold'}}> 
                              NEXT <Ionicons  name="ios-arrow-forward-outline" size={15}  />

                               </Text> 
            					 	</TouchableOpacity> 
            					 	</View>
              					
            		</ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
backgroundImage:{
	flex: 1,
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height,
},
icon:{
backgroundColor:'rgba(0,0,0,0)',
marginTop:40,
marginLeft:30,

},
center:{
  flex: 1,
paddingTop: 60,
  alignItems: 'center',
  
},
inside:{
  paddingTop:30,
},
text2:{
  backgroundColor:'rgba(0,0,0,0)',
  fontSize: 15,
  
 justifyContent: 'center',
 alignItems: 'center',
},
text3:{
  backgroundColor:'rgba(0,0,0,0)',
  
  color: 'black',
 justifyContent: 'center',
 alignItems: 'center',
},
nextButton:{
   flex: 1,
   flexDirection: 'row' , 
   position:'absolute',
   bottom: 0,
   height: (Platform.OS === 'ios') ? 70 : 55,
   backgroundColor:'white',
   width: '100%',
  
},
TouchableOpacity:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});


export default TrainerSpecialize;