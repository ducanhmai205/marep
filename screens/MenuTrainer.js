'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import { LinearGradient } from 'expo';

class MenuTrainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      //Type:'this.props.navigation.state.params.Account.type',
      //Id:'this.props.navigation.state.params.Account.trainer.id',
      //Access_token:'this.props.navigation.state.params.Account.trainer.access_token'
    };
  }


  logout = () => {

    var type = 

  console.log('new',this.props.navigation.state.params.Account.type)
  console.log('id',this.props.navigation.state.params.Account.trainer.id)
  console.log('token',this.props.navigation.state.params.Account.trainer.access_token)
fetch('http://35.185.68.16/api/v1/customer/logout', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 type  : this.props.navigation.state.params.Account.type,
    id  : this.props.navigation.state.params.Account.trainer.id,
  access_token  : this.props.navigation.state.params.Account.trainer.access_token,
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        console.log('token2',this.props.navigation.state.params.Account.trainer.access_token)
 

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
    
    // This is Alert Dialog Title
    '本当にログアウトしますか？',
 
    // This is Alert Dialog Message. 
    '',
    [
      // First Text Button in Alert Dialog.
      
 
      // Second Cancel Button in Alert Dialog.
      // {text: 'Cancel', onPress: () => this.props.navigation.navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account  })},
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      // Third OK Button in Alert Dialog
      {text: 'OK',  onPress: () => this.logout()},
      
    ],
   { cancelable: false }
  )
 }
render() {
        const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    

    return (
       
      <Image style={styles.backgroundImage} source={require('../img/user/menu_trainerbg.png')}>
          <StatusBar hidden={true} />
          <View style={styles.upcontainer}>
              <View style={styles.header}>
                 <TouchableOpacity  style={{flex: 1,flexDirection: 'row' ,justifyContent: 'flex-end',alignItems: 'center',}} onPress={() => goBack()}>
                                   <Feather name="x" size={25}  />
                 </TouchableOpacity>

              </View>

              <View style={styles.contentUp}>
                        <View style={styles.avatarPicker}>
                            <TouchableOpacity  style={{flex: 1,backgroundColor: 'white',}}>
                                    <View style={styles.circle}>
                                          <Entypo name="camera" size={15} color='white' />
                                    </View>
                            </TouchableOpacity>
                        
                        </View>
                        
                        <View style={styles.selectOption}>
                            <View style={styles.name}>
                                <View style={styles.textName}>
                                 <Text> {this.props.navigation.state.params.Account.trainer.name}</Text>

                                </View>

                                <View style={styles.pushButton}>
                                   <Text style={{color:'gray',fontSize: 10}}> PUSH 通知 </Text>
                                   <Switch
                                    value={true}
                                    onValueChange={(val) => console.log(val)}
                                    disabled={false}
                                    activeText={''}
                                    inActiveText={''}
                                    circleSize={23}
                                    circleBorderColor='white'
                                    backgroundActive={'#00DDAB'}
                                    backgroundInactive={'gray'}
    
                                  />
                                </View>
                            </View>

                            <View style={styles.select}>
                           
                                  <View style={styles.optionName}>
                                      <Text style={styles.textOption}>メールアドレス</Text>
                                       <Text style={styles.textOption}>{this.props.navigation.state.params.Account.trainer.email}  </Text>
                                       
                                  </View>
                         
                             <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('UpdatePassTrainer', { Account: this.props.navigation.state.params.Account  })}}>
                                  <View style={styles.optionName}>
                                      <Text style={styles.textOption}>パスワード変更</Text>
                                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                                  </View>
                            </TouchableOpacity>
                                  <View style={styles.optionSelectNumberTrainee}>
                                      <Text style={styles.textOption}> トレーニングできる人数 </Text>
                                      <Text style={styles.textOption}>5人 </Text>
                                  </View>

                                  <View style={styles.optionVersion}>
                                      <Text style={styles.textOption}> 得意分野 </Text>
                                      <Text style={styles.textOption}> 自己紹介文 </Text>
                                  </View>

                                  <View style={styles.optionInfomation}>
                                      <Text style={styles.textOption}> 自己紹介文 </Text>
                                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                                  </View>
                            </View>
                        </View>
              </View>
          </View>

          <View style={styles.downcontainer}>
             <View style={styles.graySpace}>

             </View>
             <View style={styles.bottomSelect}>
                  
              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('InfomationVersion')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                     
                  </View>
               </TouchableOpacity>
               <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('Policy')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 使用規約 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('Term')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> プライバシーポリシー </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
                </TouchableOpacity>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
               <TouchableOpacity style={{flex: 1,}} onPress={this.confirm}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> ログアウト </Text>
                      
                  </View>
               </TouchableOpacity>
                  <View style={styles.space}>

                  </View>
             </View>
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
upcontainer:{
  flex: 0.59,
},
header:{
flex: 0.7,

flexDirection: 'column-reverse' ,
  backgroundColor:'rgba(0,0,0,0)',
  paddingRight:30
},
contentUp:{
flex: 9,
paddingLeft: 3,
},
avatarPicker:{
flex: 1,

justifyContent: 'center',
alignItems: 'center',

},
circle:{
  flex: 1,
   width: 80,
    height: 80,
    borderRadius: 100/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
},
name:{
  flex: 0.7,

},
textName:{
  flex: 0.4,
 justifyContent: 'center',
 alignItems: 'center',

},
pushButton:{
  flex: 0.4,
  paddingTop:5,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,

  paddingRight:8,

},
select:{
flex: 2.3,
paddingHorizontal: 30,

},
optionName:{
flex: 1,
paddingBottom: 10,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,

},
textOption:{
fontSize: 10,
color:'gray',
paddingLeft:2
},
optionSelectNumberTrainee:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
paddingBottom: 5
},
optionVersion:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
},
optionInfomation:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
paddingBottom: 5,
},
selectOption:{
flex: 3,

},
downcontainer:{
  flex: 0.5,
},
graySpace:{
  flex: 1.2,

},
bottomSelect:{
  flex: 8,
  paddingHorizontal: 30
},
option:{
  flex: 1.1,
  alignItems: 'center',
  justifyContent:  'space-between' ,
  flexDirection: 'row' ,
  paddingTop:3
},
space:{
  flex: 1.5,
  
}

});


export default MenuTrainer;