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
  Switch
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
// import { Switch } from 'react-native-switch';
import { ImagePicker } from 'expo';
import SimplePicker from 'react-native-simple-picker';


const optionsSex = ['male', 'female'];
const optionsHeight = ['50','60','70','80','90','100','110','120','130','140','150','160','170','180','190','200','210','220','230','240','250'];
const optionsWeight = ['30','40','50','60','70','80','90','100','110','120','130','140','150','160','170','180','190','200'];
// const optionsHeight = new Array(250);


// for (var i = 5; i < optionsHeight.length; i++) {
//    optionsHeight = (i+1) *10;
// }
// export  class ImagePickerExample extends React.Component {
//   state = {
//     image: null,
//     size:15,

//   };

//   render() {
//     const { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <TouchableOpacity style={{flex: 1,alignItems: 'center',justifyContent: 'center',}} onPress={this._pickImage} >
//            <Entypo name="camera" size={this.state.size} color='white' />
        
        
//         {image &&
//           <Image source={{ uri: image }} style={{ flex:1,width: 80, height: 80,borderRadius: 80/2, }} resizeMode="stretch" />}
//           </TouchableOpacity>
//       </View>
//     );
//   }

//   _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       base64:true
//     });

    

//     if (!result.cancelled) {
//       this.setState({ image: result.uri, size:1});
//       console.log("ducanhpic",this.state.image);
//     }
//   };
// }
class MenuUser extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sex: '性別',
      type:'',
      id:'',
      access_token:'',
      Data:'',
      heightOption: `${this.props.navigation.state.params.Account.customer.customer_height}`,
      weightOption: `${this.props.navigation.state.params.Account.customer.customer_weight}`,
      sexOption: `${this.props.navigation.state.params.Account.customer.gender}`,
      name:  `${this.props.navigation.state.params.Account.customer.name}`,
      issue: '',
      SwitchOnValueHolder :  false,
      push:`${this.props.navigation.state.params.Account.customer.push_status}`,
      oldName:'',
      account2:'',
      image: `${this.props.navigation.state.params.Account.avatar}`,
       size:15,
      
      
    };
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


 ShowAlert = (push) =>{

  this.setState({
 
    SwitchOnValueHolder: push
  })
 
  if(push == true)
  {
 
   this.setState({ push : 'on'})
   console.log("swtich",push)
  }
  else{
 
   
 this.setState({ push : 'off' })
   console.log("swtich2",push)
  }
 
}
 

  logoutUser = () => {


console.log('type',this.props.navigation.state.params.Account.type)
  console.log('name',this.props.navigation.state.params.Account.customer.name)
  console.log('id',this.props.navigation.state.params.Account.customer.id)
  console.log('token',this.props.navigation.state.params.Account.customer.access_token)
   console.log('email',this.props.navigation.state.params.Account.customer.email)
    console.log('push',this.state.value)
     console.log('gender', this.state.sexOption)
     console.log('height',this.state.heightOption)
     console.log('weight', this.state.weightOption)
      console.log('avatar', this.state.image)


     
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
console.log("pic",this.props.navigation.state.params.Account.customer.avatar);
  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);
// console.log('new2',this.props.navigation.state.params.Account.type)
//   console.log('id2',this.props.navigation.state.params.Account.customer.id)
//   console.log('token2',this.props.navigation.state.params.Account.customer.access_token)
  fetch('http://35.185.68.16/api/v1/customer/getProfile', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata

  }).then((response) => response.json())
  .then((responseJson) => {
    // var data = Object.keys(responseJson).map(function(data){
    //   if (data === 'account') {
    //     return {account : responseJson[data]};
    //   }
    // });
    var oldname = this.props.navigation.state.params.Account.customer.name

  
    var issue = responseJson.account.rawMyIssues;
    var account = responseJson.account.customer;
    var height = responseJson.account.customer.customer_height;
    var weight = responseJson.account.customer.customer_weight;
    var sex = responseJson.account.customer.gender;
    
    this.setState({
     
      issue : issue,
      account : account,
      height: height,
      weight : weight ,
      sex : sex,
 
    })
   
  
   })


}

UserUpdate = () =>{
 
    

  let formdata = new FormData();
let push = this.state.push;
let height = this.state.heightOption;
let weight = this.state.weightOption;
let name = this.state.name;
let sex = this.state.sexOption;
  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);
  formdata.append("email", this.props.navigation.state.params.Account.customer.email);
  formdata.append("push_status", push);
  formdata.append("gender", this.props.navigation.state.params.Account.customer.gender);
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
         
        
  //        console.log('type',this.props.navigation.state.params.Account.type);
  // console.log('name',this.state.name);
  // console.log('id',this.props.navigation.state.params.Account.customer.id);
  // console.log('token',this.props.navigation.state.params.Account.customer.access_token);
  //  console.log('email',this.props.navigation.state.params.Account.customer.email);
  //   console.log('push',this.props.navigation.state.params.Account.customer.push_status);
     console.log('gender', this.props.navigation.state.params.Account.customer.gender);
     console.log('height',this.props.navigation.state.params.Account.customer.customer_height);
     console.log('weight',this.props.navigation.state.params.Account.customer.customer_weight);
  //     console.log('avatar', this.state.image);
       if(responseJson.status === true){
console.log("ducanh",this.props.navigation.state.params.Account);
 console.log("data",responseJson);
        
             this.props.navigation.navigate('TraineeProfile',{Account: responseJson.account});
       }
      else{
         {
     
            var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
            
            Object.keys(responseJson.message)[0];
              var error_messname = '';
              var error_messgender = '';
              var error_messcustomer_weight = '';
              var error_messcustomer_height = '';
              var error_messcustomer_push_status = '';
              var error_messcustomer_email = '';
           
              

              if (responseJson.message.name) {
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


  render() {
     var base64Icon =  this.props.navigation.state.params.Account.avatar;
        const { image } = this.state;
        const { name } = this.state;
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <Image style={styles.backgroundImage} source={require('../img/user/menu_userbg.png')}>
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
                
                                          style={{flex:1,fontSize: 15,paddingTop:10,color:'#665586'}} 
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
                      <Text style={styles.textOption}>{this.props.navigation.state.params.Account.customer.email}</Text>
                  </View>
            <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('UpdatePassword', { Account: this.props.navigation.state.params.Account  })}}>
                    <View style={styles.option}>
                    
                      <Text style={styles.textOption}> パスワード変更 </Text>
                    <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                     </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,}}  onPress={() => {this.refs.sex.show()}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 性別 </Text>
                       <Text style={styles.textOption}>  {this.state.sexOption}</Text>
                      <SimplePicker
                            ref={'sex'}
                            confirmText='完了'
                            cancelText='キャンセル'
                            options={optionsSex}
                            onSubmit={(optionsSex) => {
                              this.setState({
                                sexOption: optionsSex,
                              });
                            }}
                          />        
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1,}}  onPress={() => {this.refs.height.show()}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 身長 </Text>
                       <Text style={styles.textOption}> {this.state.heightOption}cm </Text>
                        <SimplePicker
                            ref={'height'}
                            confirmText='完了'
                            cancelText='キャンセル'
                            options={optionsHeight}
                            onSubmit={(optionsHeight) => {
                              this.setState({
                                heightOption: optionsHeight,
                              });
                            }}
                          />     
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1,}}  onPress={() => {this.refs.weight.show()}}> 
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 体重 </Text>
                      <Text style={styles.textOption}> {this.state.weightOption}kg </Text>
                       <SimplePicker
                            ref={'weight'}
                            confirmText='完了'
                            cancelText='キャンセル'
                            options={optionsWeight}
                            onSubmit={(optionsWeight) => {
                              this.setState({
                                weightOption: optionsWeight,
                              });
                            }}
                          />     
                  </View>
            </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1,}} onPress={()=> {
                          navigate('TraineeTreatment',{ Account: this.props.navigation.state.params.Account  });}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> お悩み内容 </Text>
                      <Text style={styles.textOption}> {this.state.issue} </Text>
                  </View>
                      </TouchableOpacity>
              </View>
       </View>

           <View style={styles.containerGraySpace} /> 


           <View style={styles.containerDown}>
              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('InfomationVersion')}}>
                <View style={styles.optionDown}>
                 
                     <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('Policy')}}>
                <View style={styles.optionDown}>

                      <Text style={styles.textOption}> 使用規約 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}}  onPress={  ()=> {navigate('Term')}}>
                <View style={styles.optionDown}>
                      <Text style={styles.textOption}> プライバシーポリシー </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1,}}>
                <View style={styles.optionDown}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
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
    marginBottom: 5,
      justifyContent: 'center',
     alignItems: 'stretch',
},
xButton:{
  flex: 1,justifyContent: 'space-around',alignItems: 'flex-end',paddingBottom: 40,paddingRight:10
},
circle:{

    width: (Platform.OS === 'ios') ? 82 : 75,
    height: (Platform.OS === 'ios') ? 82 : 75 ,
    borderRadius: 100/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',

},
textName:{
    flex: 0.15,
 
    justifyContent: 'center',
    alignItems: 'center',
    
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

},
option:{
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