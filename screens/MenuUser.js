'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Alert,
  Button,
  Switch,
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
// import { Switch } from 'react-native-switch';
import { ImagePicker } from 'expo';
import SimplePicker from 'react-native-simple-picker';
import ModalFilterPicker from 'react-native-modal-filter-picker'

const optionsSex = [
 {
        key: 'male',
        label: '男性',
      },
      {
        key: 'female',
        label: '女性',
      },
];


var optionsHeight = [];

for (var i = 50; i <=250; i++) {
    optionsHeight.push({
        key: i,
        label: i,
    });
}
var optionsYear = [];

for (var i = 1950; i <=2017; i++) {
    optionsYear.push({
        key: i,
        label: i,
    });
}
const optionsWeight = [];
for (var i = 30; i <= 200; i++) {
    optionsWeight.push({
        key: i,
        label: i,
    });
}
class MenuUser extends Component {
  constructor(props) {
    super(props);
    var pushStatus = `${this.props.navigation.state.params.Account.customer.push_status}`;
    let defaultSwitch = this.getSwitchDefaultValue();
    var sexStatus = `${this.props.navigation.state.params.Account.customer.gender}`;
    this.state = {
      sex: '性別',
      type:'',
      id:'',
      access_token:'',
      Data:'',
      pickedHeight: `${this.props.navigation.state.params.Account.customer.customer_height}`,
      pickedWeight: `${this.props.navigation.state.params.Account.customer.customer_weight}`,
      pickedYear: `${this.props.navigation.state.params.Account.customer.birth_year}`,
      pickedSex: `${this.props.navigation.state.params.Account.customer.gender}`,
      name:  `${this.props.navigation.state.params.Account.customer.name}`,
      email:  `${this.props.navigation.state.params.Account.customer.email}`,
      issueCustomer: `${this.props.navigation.state.params.Account.rawMyIssues}`,     
      SwitchOnValueHolder : defaultSwitch ,
      push:`${this.props.navigation.state.params.Account.customer.push_status}`,
      oldName:'',
      account2:'',
      image: `${this.props.navigation.state.params.Account.avatar}`,
      size:15,
      visibleHeight: false,
      visibleWeight:false,
      visibleSex:false,
      visibleYear:false,
      
    };

  }

getSwitchDefaultValue = ()=>{
  let pushStatus = this.props.navigation.state.params.Account.customer.push_status;
  if(pushStatus === 'on') return true;
  return false;
}

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64:true
    });

    

    if (!result.cancelled) {
      this.setState({ image: result.uri});
      console.log("ducanhpic",result.uri);
    }else {
      Alert.alert('Cancel image')
    }
  };


 ShowAlert = (isSelected) =>{
  this.setState({ 
    SwitchOnValueHolder: isSelected
  })
 
}
 

  logoutUser = () => {

console.log("ducanh account", this.props.navigation.state.params.Account)

     
fetch('http://35.185.68.16/api/v1/customer/logout', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 type  : this.props.navigation.state.params.Account.type,
    id  : this.props.navigation.state.params.Account.customer.id,
  access_token  : this.props.navigation.state.params.Account.customer.access_token,
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        // console.log('token2',this.props.navigation.state.params.Account.customer.access_token)
 

         if(responseJson.status === true)
         {
          
          this.props.navigation.navigate('LoginScreen');
         }
         else{
           
             
                  
               Alert.alert('ok');

            
           }
       
      }).catch((error) => {
        console.error(error);
      });
 
  }
   confirm = () => {
  Alert.alert(
    

    '本当にログアウトしますか？',
      '',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'OK',  onPress: () => this.logoutUser()},
      
    ],
   { cancelable: false }
  )
 }

componentWillMount() {
  let formdata = new FormData();
  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);

  fetch('http://35.185.68.16/api/v1/customer/getProfile', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata

  }).then((response) => response.json())
  .then((responseJson) => {  
    var oldname = this.props.navigation.state.params.Account.customer.name  
    var issue = responseJson.account.rawMyIssues;
    var account = responseJson.account.customer;
    var height = responseJson.account.customer.customer_height;
    var weight = responseJson.account.customer.customer_weight;
    var sex = responseJson.account.customer.gender;
    console.log("ducanh",responseJson.account.customer.gender);
    this.setState({
     
      issue : issue,
      account : account,
      height: height,
      weight : weight ,
      sex : sex,
 
    })
   
  
   })


}

getPushValue=()=>{
    let isSwitchSelected = this.state.SwitchOnValueHolder;
  if(isSwitchSelected) return 'on';
  return 'off';
}

UserUpdate = () =>{     
  let formdata = new FormData();

let push = this.getPushValue();
let height = this.state.pickedHeight;
let weight = this.state.pickedWeight;
let year = this.state.pickedYear;
let name = this.state.name;
let email = this.state.email;
let sex = this.state.pickedSex;
  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);
  formdata.append("email", email);
  formdata.append("birth_year", year);
  formdata.append("push_status", push);
  formdata.append("gender", sex);
  formdata.append("customer_height", height);
  formdata.append("customer_weight",  weight);
  formdata.append("name",  name);
  formdata.append('avatar', {uri: this.state.image, name: 'selfie.jpg', type: 'image/jpg'});


fetch('http://35.185.68.16/api/v1/customer/updateProfile', {

  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',

  },
   body: formdata,


 
}).then((response) => response.json())
      .then((responseJson) => {

       if(responseJson.status === true){
console.log("ducanh",this.props.navigation.state.params.Account);
 console.log("data",responseJson.account);
        
             this.props.navigation.navigate('TraineeProfile',{Account: responseJson.account});//go screen traineeprofile when update success
       }
      else{
         {
             console.log("error",responseJson);
            var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
            
            Object.keys(responseJson.message)[0];
              var error_messname = '';
              var error_messgender = '';
              var error_messcustomer_weight = '';
              var error_messcustomer_height = '';
              var error_messcustomer_push_status = '';
              var error_messcustomer_email = '';
           
              

              if (responseJson.message.name) { //show error name, gender, weight, height, pushstatus,email
               for (var i = 0, len = responseJson.message.name.length; i < len; i++) {
                      error_messname += responseJson.message.name[i] + '!'
                    }
              }
              if (responseJson.message.gender) {
               for (var i = 0, len = responseJson.message.gender.length; i < len; i++) {
                      error_messgender += responseJson.message.gender[i] + '!'
                    }
              }

              if (responseJson.message.customer_weight) {
               for (var i = 0, len = responseJson.message.customer_weight.length; i < len; i++) {
                      error_messcustomer_weight += responseJson.message.customer_weight[i] + '!'

                    }
              }
               if (responseJson.message.customer_height) {
               for (var i = 0, len = responseJson.message.customer_height.length; i < len; i++) {
                      error_messcustomer_height += responseJson.message.customer_height[i] + '!'

                    }
              }
              if (responseJson.message.push_status) {
               for (var i = 0, len = responseJson.message.push_status.length; i < len; i++) {
                      error_messcustomer_push_status += responseJson.message.push_status[i] + '!'

                    }
              }
              if (responseJson.message.email) {
               for (var i = 0, len = responseJson.message.email.length; i < len; i++) {
                      error_messcustomer_email += responseJson.message.email[i] + '!'

                    }
              }
                  
              Alert.alert(error_object[0] );
             

            }
      }
        
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }

getGenderInJapanese(){
  let gender = this.state.pickedSex;//male/female
  if(gender === 'male') return '男性';
  return '女性'

}
getHeightundefired(){
  let height = this.state.pickedHeight;
  if(height === 'undefined') return '0';
  if(height === 'null') return '0';
  return height
}
getYeartundefired(){
  let year = this.state.pickedYear;
  if(year === 'undefined') return '0';
  if(year === 'null') return '0';
  return year
}
getWeightundefired(){
  let weight = this.state.pickedWeight;
  if(weight === 'undefined') return '0';
  if(weight === 'null') return '0';
  return weight
}
getEmailundefired(){
  let email = this.state.email;
  if(email === 'undefined') return 'example@gmail.com';
  if(email === 'null') return 'example@gmail.com';
  return email
}
 onShowHeight = () => {
    this.setState({ visibleHeight: true });
  }

  onSelectHeight = (pickedHeight) => {
    
    this.setState({
      pickedHeight: pickedHeight,
      visibleHeight: false
    })
  }

  onCancelHeight = () => {
    this.setState({
      visibleHeight: false
    });
  }
 onShowWeight = () => {
    this.setState({ visibleWeight: true });
  }

  onSelectWeight = (pickedWeight) => {
    
    this.setState({
      pickedWeight: pickedWeight,
      visibleWeight: false
    })
  }

  onCancelWeight = () => {
    this.setState({
      visibleWeight: false
    });
  }


 onShowSex = () => {
    this.setState({ visibleSex: true });
  }

  onSelectSex = (pickedSex) => {
    
    this.setState({
      pickedSex: pickedSex,
      visibleSex: false
    })
  }

  onCancelSex = () => {
    this.setState({
      visibleSex: false
    });
  }

 onShowYear = () => {
    this.setState({ visibleYear: true });
  }

  onSelectYear = (pickedYear) => {
    
    this.setState({
      pickedYear: pickedYear,
      visibleYear: false
    })
  }

  onCancelYear = () => {
    this.setState({
      visibleYear: false
    });
  }
  render() {
     var base64Icon =  this.props.navigation.state.params.Account.avatar;
        const { image } = this.state;
        const { name } = this.state;
         const { visibleHeight,visibleWeight,pickedHeight,pickedWeight,visibleSex,pickedSex,visibleYear,pickedYear  } = this.state;
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <Image style={styles.backgroundImage} source={require('../img/user/menu_userbgn.png')}>
           <StatusBar hidden={true} />
           <View style={styles.containerUp}>
              
              <View style={styles.avatarPicker}>
                  <View style={styles.leftSpace}>
                  </View>
                 
                  <View style={styles.circle}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <TouchableOpacity style={{flex: 1,alignItems: 'center',justifyContent: 'center',}} onPress={this._pickImage} >
                             <View style={{flex: 1,}}>
                             
        
        
                          {image &&
                           <Image source={{ uri: this.state.image }} style={{ flex:1,width: 80, height: 80,borderRadius: 80/2, }} resizeMode="stretch" />}
                           </View>
                           </TouchableOpacity>
                  </View>
                                         
                  </View>
                  

                   <TouchableOpacity  style={styles.xButton}  onPress={this.UserUpdate}>
                                   <Feather name="x" size={25}  />
                    </TouchableOpacity>
              </View>

              <View style={styles.textName}>
            
                    <TextInput
                
                                          style={{flex:1,fontSize: 15,paddingTop:10,color:'#665586',textAlign: 'center'}} 
                                          underlineColorAndroid='transparent'
                                          returnKeyType="next"
                                          autoCapitalize="none"
                                          placeholder= {this.props.navigation.state.params.Account.customer.name}
                                          onChangeText={name => this.setState({name})}
                                    />
              </View>

              <View style={styles.pushButton}>
                 <Text style={{color:'gray',fontSize: 10}}> PUSH 通知 </Text>
                                    <Switch
                                      onValueChange={(push) => this.ShowAlert(push)}
                                      value={this.state.SwitchOnValueHolder} />
              </View>

         <View style={styles.mainOption}>
                  <View style={styles.optionMail}>
                      <Text style={styles.textOption}> メールアドレス </Text>
                       <TextInput
                
                                          style={styles.textOption} 
                                          underlineColorAndroid='transparent'
                                          returnKeyType="next"
                                          autoCapitalize="none"
                                          placeholder= {this.getEmailundefired()}
                                          onChangeText={email => this.setState({email})}
                                    />
                  </View>
                <TouchableOpacity style={{flex: 1,}}  onPress={this.onShowYear}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 生年 </Text>
                       <Text style={styles.textOption}>{this.getYeartundefired()} </Text>
                         <ModalFilterPicker
                                        showFilter={false}
                                        visible={visibleYear}
                                        onSelect={this.onSelectYear}
                                        onCancel={this.onCancelYear}
                                        options={optionsYear}
                                      />     
                  </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('UpdatePassword', { Account: this.props.navigation.state.params.Account  })}}>
                    <View style={styles.option}>
                    
                      <Text style={styles.textOption}> パスワード変更 </Text>
                    <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                     </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,}} onPress={this.onShowSex} >
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 性別 </Text>
                       <Text style={styles.textOption}> {this.getGenderInJapanese()}</Text>
                         <ModalFilterPicker
                                        showFilter={false}
                                        visible={visibleSex}
                                        onSelect={this.onSelectSex}
                                        onCancel={this.onCancelSex}
                                        options={optionsSex}
                                      />     
                                      
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1,}}  onPress={this.onShowHeight}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 身長 </Text>
                       <Text style={styles.textOption}> {this.getHeightundefired()}cm </Text>
                         <ModalFilterPicker
                                        showFilter={false}
                                        visible={visibleHeight}
                                        onSelect={this.onSelectHeight}
                                        onCancel={this.onCancelHeight}
                                        options={optionsHeight}
                                      />     
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1,}}  onPress={this.onShowWeight}> 
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 体重 </Text>
                      <Text style={styles.textOption}>  {this.getWeightundefired()}kg </Text>
                         <ModalFilterPicker
                                        showFilter={false}
                                        visible={visibleWeight}
                                        onSelect={this.onSelectWeight}
                                        onCancel={this.onCancelWeight}
                                        options={optionsWeight}
                                      />     
                  </View>
            </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1,}} onPress={()=> {
                          navigate('ChangeIssue',{ Account: this.props.navigation.state.params.Account  });}}>
                  <View style={styles.optionIssue}>
                      <Text style={styles.textOption}> お悩み内容 </Text>
                      <Text style={styles.textOption}> {this.state.issue} </Text>
                  </View>
                      </TouchableOpacity>
              </View>
       </View>

           <View style={styles.containerGraySpace} /> 


           <View style={styles.containerDown}>
              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('InfomationVersion',{Account: this.props.navigation.state.params.Account})}}>
                <View style={styles.optionDown}>
                 
                     <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('Policy',{Account: this.props.navigation.state.params.Account})}}>
                <View style={styles.optionDown}>

                      <Text style={styles.textOption}> 使用規約 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}}  onPress={  ()=> {navigate('Term',{Account: this.props.navigation.state.params.Account})}}>
                <View style={styles.optionDown}>
                      <Text style={styles.textOption}> プライバシーポリシー </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}}>
                <View style={styles.optionDown}>
                      <Text style={styles.textOption}> お問い合わせ </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1.4,}} onPress={this.confirm}>
                <View style={styles.optionLogout}>
                       <Text style={styles.textOption}> ログアウト </Text>
                </View>
              </TouchableOpacity>
           </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
    backgroundColor:'rgba(0,0,0,0)',
},
containerUp:{
    flex: 1,

},
leftSpace:{
  flex: 1,
},
avatarPicker:{
    flex: 0.45,
   flexDirection: 'row',
   paddingTop:10,
   marginLeft:10,
      justifyContent: 'center',
     alignItems: 'stretch',
    
},
xButton:{
  flex: 1,justifyContent: 'space-around',alignItems: 'flex-end',paddingBottom: 20,marginRight:20,
},
circle:{

    width: (Platform.OS === 'ios') ? 82 : 75,
    height: (Platform.OS === 'ios') ? 82 : 75 ,
    borderRadius: 82/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
 
},
textName:{
    flex: 0.15,
   
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
    
},
pushButton:{
flex: 0.05,

paddingTop:10,
justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,
   
  paddingRight:12,
},
mainOption:{
flex: 1.2,

marginHorizontal: (Platform.OS === 'ios') ? 30 : 38 ,

},
optionMail:{
flex: 1,
marginTop:9,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
borderBottomWidth: 0.7,
borderBottomColor: '#78C0A8'
},
option:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
borderBottomWidth: 0.7,
borderBottomColor: '#78C0A8'
},
optionIssue:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,

},
textOption:{
  fontSize: 10,

},
containerGraySpace:{
  flex: 0.10,
},
containerDown:{
flex: 0.55,
marginHorizontal: (Platform.OS === 'ios') ? 30 : 38 ,
},
optionDown:{
  flex: 1,
  alignItems: 'center',
  justifyContent:  'space-between' ,
  flexDirection: 'row' ,
 
},

optionLogout:{
  flex:1.4,
  alignItems: 'center',
  justifyContent:  'space-between' ,
  flexDirection: 'row' ,
  
}
});


export default MenuUser;