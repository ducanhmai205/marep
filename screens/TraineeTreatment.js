'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  FlatList
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'

class TraineeTreatment extends Component {
  constructor(){
    super()
    this.state = {
      text: '',
      hideSelect:false,
      Data:'',
      type:'',
      id:'',
       value :false,
      access_token:'',
      customer_issues:''
    }
    
  }
handleOnChange(val) {
    this.setState({ value: val })
  }
 
  sendIssues = () =>{
   let items = this.state.Data;
   let selectedItems = [];
   console.log("ducanh data",items);

   //Lay ra nhung id co gia tri checked = true

    items.forEach(function(item) {
          if(item.checked) {
            selectedItems.push(item.id);
          }
           console.log("ducanh data",selectedItems);
    });

fetch('http://35.185.68.16/api/v1/customer/storeCustomerIssues', {

  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },

  body: JSON.stringify({

    type  : this.props.navigation.state.params.Account.type,
    id  : this.props.navigation.state.params.Account.customer.id,
    access_token  : this.props.navigation.state.params.Account.customer.access_token,
    customer_issue: selectedItems,
    
  })

}).then((response) => response.json())
.then((responseJson) => {
  if(responseJson.status === true){
    this.props.navigation.state.params.Account.myIssues = selectedItems;
    
    this.props.navigation.navigate('SelectTrainer',{Account: this.props.navigation.state.params.Account});
  }
  else{

   if(typeof(responseJson.message) === 'string'){

     Alert.alert(responseJson.message);
   }
   else{
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

  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);

  fetch('http://35.185.68.16/api/v1/customer/getIssue', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata

  }).then((response) => response.json())
  .then((responseJson) => {
        
         var rawData = responseJson.customer_issues;

       
         var testData = [];
         Object.keys(responseJson.customer_issues).forEach(function(item){
          var raw = {
            name: responseJson.customer_issues[item],
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
   <Text style={styles.text2}>あなたの悩みを教えてください </Text>
   <Text style={styles.text2}>（2つまで選択可能です）</Text>
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
        <TouchableOpacity style={styles.TouchableOpacity} onPress={ this.sendIssues }>
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
    flex: 1,
    paddingTop:30,


  },
  text2:{
    backgroundColor:'rgba(0,0,0,0)',
    fontSize: 15,

   paddingRight:20
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