'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import { LinearGradient } from 'expo';
class MenuTrainer extends Component {
  render() {
    return (
      <Image style={styles.backgroundImage} source={require('./img/user/menu_trainer.png')}>
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
                                      <Text style={styles.textOption}> メールアドレス </Text>
                                      <Text style={styles.textOption}> aaa@aaa.com </Text>
                                  </View>

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
                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> 使用規約 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> プライバシーポリシー </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>

                  <View style={styles.option}>
                      <Text style={styles.textOption}> ログアウト </Text>
                      
                  </View>
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
flex: 1,
flexDirection: 'column-reverse' ,
  backgroundColor:'rgba(0,0,0,0)',
  paddingRight:15
},
contentUp:{
flex: 9,
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
  flex: 0.9,

},
textName:{
  flex: 0.8,
 
},
pushButton:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,
  paddingBottom: 10,
  paddingRight:8,

},
select:{
flex: 2,
paddingHorizontal: 30
},
optionName:{
flex: 1,

alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,

},
textOption:{
fontSize: 10,
color:'gray'
},
optionSelectNumberTrainee:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,

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
 
},
space:{
  flex: 1.5,
  
}

});


export default MenuTrainer;