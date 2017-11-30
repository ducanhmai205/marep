'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Picker,
  Platform
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';


class MenuUser extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sex: '性別',
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image style={styles.backgroundImage} source={require('../img/user/menu_userbg.png')}>
           <StatusBar hidden={true} />
           <View style={styles.containerUp}>
              <View style={styles.xButton}> 
                    <TouchableOpacity  style={{flex: 1,flexDirection: 'row' ,justifyContent: 'flex-end',alignItems: 'center',}} onPress={() => goBack()}>
                                   <Feather name="x" size={25}  />
                    </TouchableOpacity>
              </View>

              <View style={styles.avatarPicker}>
                  <TouchableOpacity  style={{flex: 1,backgroundColor: 'white',}}>
                                    <View style={styles.circle}>
                                          <Entypo name="camera" size={15} color='white' />
                                    </View>
                  </TouchableOpacity>
              </View>

              <View style={styles.textName}>
                  <Text style={{flex:1,fontSize: 15,color:'#665586'}}> お名前お名前 </Text>
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

              <View style={styles.mainOption}>
                  <View style={styles.optionMail}>
                      <Text style={styles.textOption}> 得意分野 </Text>
                      <Text style={styles.textOption}> aaa@aaa.com </Text>
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> 性別 </Text>
                  
                      
                      

                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> 身長 </Text>
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> 体重 </Text>
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> お悩み内容 </Text>
                  </View>
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

              <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('Term')}}>
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

              <TouchableOpacity style={{flex: 1.4,}}>
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
xButton:{
    flex: 0.15,
    flexDirection: 'column-reverse' ,
    backgroundColor:'rgba(0,0,0,0)',
    paddingRight:15,

},
avatarPicker:{
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
},
circle:{

    width: (Platform.OS === 'ios') ? 80 : 75,
    height: (Platform.OS === 'ios') ? 80 : 75 ,
    borderRadius: 180/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',

},
textName:{
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
},
pushButton:{
flex: 0.15,
justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,
    paddingBottom: 5,
  paddingRight:12,
},
mainOption:{
flex: 0.9,
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