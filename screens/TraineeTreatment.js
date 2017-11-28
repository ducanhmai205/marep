'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
class TraineeTreatment extends Component {
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
              <Text style={styles.text2}>あなたの悩みを教えてください{"\n"}（2つまで選択可能です）</Text>

                 <View style={styles.inside}>
                  <RadioGroup
                  size={15}
                 
                  color='#FFFEFF'
                 
                  

                     onSelect = {( value) => this.onSelect( value)}>
                   
                     <RadioButton  activeColor='#B4FFE3' highlightColor='#B4FFE3'    value={'item1'} >
                       <Text style={styles.text3}>シェイプアップしたい</Text>
                                  </RadioButton>
                    
                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item2'}>
                       <Text style={styles.text3}>筋肉強化したい</Text>
                     </RadioButton>
 
                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item3'}>
                       <Text style={styles.text3}>肩が疑る</Text>
                     </RadioButton>

                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item4'}>
                       <Text style={styles.text3}>腰痛がある</Text>
                                  </RadioButton>
              
                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF'  value={'item5'}>
                       <Text style={styles.text3}>体の歪みが気になる</Text>
                     </RadioButton>
 
                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item6'}>
                       <Text style={styles.text3}>冷え性が気になる</Text>
                     </RadioButton>
                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item7'}>
                       <Text style={styles.text3}>便秘が気になる</Text>
                     </RadioButton>

                     <RadioButton activeColor='#FFFEFF' highlightColor='#FFFEFF' value={'item7'}>
                       <Text style={styles.text3}>むくみが気になる</Text>
                     </RadioButton>
                     
                   </RadioGroup>             
                    

                 </View>   
            </View>
            		           <View style={styles.nextButton}>
                					<TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                					navigate('SelectTrainer');}}>
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
	width: null,
	height: null,
  backgroundColor: 'white',
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


export default TraineeTreatment;