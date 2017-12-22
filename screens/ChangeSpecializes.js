  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
    Platform,
    Alert,
    FlatList
  } from 'react-native';

  import Dimensions from 'Dimensions';
  import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  import CheckBox from 'react-native-check-box'
  class ChangeSpecializes extends Component {
    constructor(){
          super()
          this.state = {
              text: '',
              Data:'',
              type:'',
              id:'',
              value :false,
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

     let items = this.state.Data;
     let selectedItems = [];


     //Lay ra nhung id co gia tri checked = true

      items.forEach(function(item) {
            if(item.checked) {
              selectedItems.push(item.id);
            }
      });

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

      trainer_specializes: selectedItems,
      
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
    if(responseJson.status === true){

          this.props.navigation.state.params.Account.mySpecializes = selectedItems;
    this.props.navigation.navigate('MenuTrainer',{Account: this.props.navigation.state.params.Account });
    console.log("abc",selectedItems)
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
          var testData = [];
           Object.keys(responseJson.trainer_specializes).forEach(function(item){
            var raw = {
              name: responseJson.trainer_specializes[item],
              id: item,
              checked:false
            }

            testData.push(raw);
          });


         
          this.setState({
            Data:testData 
          })
         
        
        })


  }
    render() {
    	const { navigate } = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
              		 <ImageBackground  source={require('../img/signin03bg.png')} style={styles.backgroundImage}>
                    <View style={styles.icon}>
                  
              </View>
                  <View style={styles.center}>
                <Text style={styles.text2}>あなたの得意分野を教えてください </Text>
                   <View style={styles.inside}>
                                
                      <FlatList
                            data={this.state.Data}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 
                                  <CheckBox
                                        style={{flex: 1,paddingTop:10}}
                                        isChecked={item.checked}
                                        onClick={()=>{
                                        item.checked = !item.checked; 
                                        }}
                                        rightText={item.name}
                                      checkedImage=  {<MaterialCommunityIcons name="checkbox-marked-circle" size={20} color="green" />}
                                      unCheckedImage= {<MaterialCommunityIcons name="checkbox-blank-circle" size={20} color="white" />}
                                  />
                                      }
                      />

                   </View>   
              </View>
              		           <View style={styles.nextButton}>
                  					<TouchableOpacity style={styles.TouchableOpacity} onPress={ this.sendIssuesTrainer}>
                  					    <Text style={{fontWeight: 'bold'}}> 
                               SAVE

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
  paddingTop: 40,
   paddingLeft:100
  },
  inside:{
    paddingTop:30,

    backgroundColor:'rgba(0,0,0,0)',
  },
  text2:{
    backgroundColor:'rgba(0,0,0,0)',
    fontSize: 15,
    
     paddingRight:20,
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


  export default ChangeSpecializes;