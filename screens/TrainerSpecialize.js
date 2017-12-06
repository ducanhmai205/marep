'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from 'Dimensions';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
class TrainerSpecialize extends Component {
  constructor(){
        super()
        this.state = {
            text: '',
            Data:'',
            type:'',
            id:'',
            access_token:'',
            customer_issue:''
        }
        this.onSelect = this.onSelect.bind(this)
    }

  onSelect(index, value){
  this.setState({
    text: `${value}`
  })
}
sendIssuesTrainer = () =>{
 console.log("ok",this.state.value)
fetch('http://35.185.68.16/api/v1/trainer/storeTrainerSpecializes', {

  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },

  body: JSON.stringify({
 
  type  : this.props.navigation.state.params.Account.type,
    id  : this.props.navigation.state.params.Account.trainer.id,
  access_token  : this.props.navigation.state.params.Account.trainer.access_token,

    trainer_specializes: this.state.value,
    
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
  if(responseJson.status === true){
  this.props.navigation.navigate('SelectTrainee',{Account: this.props.navigation.state.params.Account });
      }
        else{
          
           if(typeof(responseJson.message) === 'string'){
                 
                   Alert.alert(responseJson.message);
           }
           else{
            console.log("abc",responseJson.message)
            var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
            
            Object.keys(responseJson.message)[0];
             
                  
              Alert.alert(error_object[0] );
             
            }
         }
 
        
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }

  componentWillMount() {
let formdata = new FormData();

formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
formdata.append("type", this.props.navigation.state.params.Account.type);
formdata.append("id", this.props.navigation.state.params.Account.trainer.id);

    fetch('http://35.185.68.16/api/v1/trainer/getSpecializes', {
  method: 'post',
  headers: {
      'Content-Type': 'multipart/form-data',
  },
  body: formdata
 
}).then((response) => response.json())
      .then((responseJson) => {
        // var rawData = Object.values(responseJson.trainer_specializes);
        var rawData = responseJson.trainer_specializes;
        console.log('raw data', rawData);

        var data = Object.keys(responseJson.trainer_specializes).map(function(data){
          // return [data,responseJson.trainer_specializes[data]];
          return {
            label: responseJson.trainer_specializes[data],
            value: data
          }
        });
        // var data = rawData.map((item, index) => {
        //   return {
        //     label: item,
        //     value: index
        //   }
        // });

        console.log("data",data);  
        this.setState({
          Data:data 
        })
       
      
      })


}
  render() {
  	const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
            		 <ImageBackground  source={require('../img/signin03bg.png')} style={styles.backgroundImage}>
                  <View style={styles.icon}>
                <TouchableOpacity onPress={ () => goBack(null)  }>
                      <Ionicons  name="ios-arrow-back-outline" size={20}  />
                </TouchableOpacity>
            </View>
                <View style={styles.center}>
              <Text style={styles.text2}>あなたの得意分野を教えてください </Text>
                 <View style={styles.inside}>
                              
        <RadioForm
            style={{flex: 1, }}
          radio_props={this.state.Data}
          buttonColor={'#50C900'}
          onPress={(value) => {
            var issues = [];
            issues.push(value);
            console.log("test_press",value)
            this.setState({value:issues})}}>    
        </RadioForm>


                 </View>   
            </View>
            		           <View style={styles.nextButton}>
                					<TouchableOpacity style={styles.TouchableOpacity} onPress={ this.sendIssuesTrainer}>
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
  backgroundColor:'rgba(0,0,0,0)',
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