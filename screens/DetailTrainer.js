'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
class DetailTrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      pressIcon: true,
    };
  }
  pressIcon = () =>
  {
     this.setState({ pressIcon: !this.state.pressIcon });
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      
           <ImageBackground  source={require('../img/trainer_detailscreen.png')} style={styles.backgroundImage}>
                 <View style={styles.container}>
                  <View style={styles.header}>
                      <View style={styles.icon}>
                      <TouchableOpacity onPress={ () => goBack(null)  }>
                          <Ionicons name="ios-arrow-back" size={20} />
                      </TouchableOpacity>
                      </View>

                      <View style={styles.text}>
                          <Text style={{fontSize:20,fontWeight: 'bold'  }}> こんにちは、元気ですか </Text>

                      </View>


                  </View>

                  <View style={styles.content}>
                      <View style={styles.swiper}>
                            <Swiper style={styles.wrapperSwiper}>
                              <View style={styles.slide1}>
                                <Image  source={require('../img/1.png')} style={styles.imageswiper}>
                                </Image>
                                </View>
                              <View style={styles.slide2}>
                                <Image  source={require('../img/2.png')} style={styles.imageswiper}>
                                </Image>
                              </View>
                              <View style={styles.slide3}>
                                 <Image  source={require('../img/2.png')} style={styles.imageswiper}>
                               </Image>
                              </View>
                            </Swiper>                     

                      </View>

                      <View style={styles.maincontent}>
                            
                                 <View style={styles.namecontent}>
                                    <View style={styles.textName}>
                                     <Text style={{fontSize:17,fontWeight: 'bold',paddingTop:5}}> 元気ですかすかか </Text>
                                     <Text style={{fontSize:11,paddingTop:5}}> 元気ですか </Text>
                                    </View>

                                    <View style={styles.ratingcontent}>
                                          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',}}>
                                              <Text style={{fontSize:11,paddingTop:14}}> 元気ですか </Text>
                                                    <StarRating
                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={10}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        
                                                      />
                                              </View>
                                              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',}}>

                                              <Text style={{fontSize:11,paddingTop:5}}> 元気ですか </Text>
                                              <StarRating
                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={10}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}

                                                      />

                                              </View>
                                              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',}}>
                                              <Text style={{fontSize:11,paddingTop:3}}> 元気ですか </Text>
                                              <StarRating
                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={10}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}

                                                      />
                                              </View>
                                    </View>
                                 </View>
                                  <View
                                    style={{
                                      borderBottomColor: 'green',
                                      borderBottomWidth: 2,
                                    }}
                                  />

                                 <View style={styles.infocontent}>
                                    <View style={{flex: 2,}}>
                                        <Text style={{fontSize:13}}> 元気ですか 元気ですか 元気ですか 元気ですか 元気ですか元気ですか元気ですか元気ですか元気ですか元気ですか元気ですか元気ですか元気ですか </Text>
                                    </View>

                                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
                                         <View style={styles.circle}>
                                         <TouchableOpacity   onPress = { this.pressIcon }>
                                           <Icon name="handshake-o" size={25} color={( this.state.pressIcon ) ? 'green':'red'} />
                                          </TouchableOpacity>
                                         </View>
                                     </View>

                                 </View>

                      </View>

                  </View>
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
imageswiper:{
 borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
flex: 1,
overflow: 'hidden',
},
container:{
  flex: 1,
  marginLeft: 28,
  marginRight:29
},

header:{
  flex: 0.7,
  alignItems: 'center',
  flexDirection: 'row' ,
  

},
text:{
  backgroundColor:'rgba(0,0,0,0)',
  paddingLeft: 30
},
icon:{
  backgroundColor:'rgba(0,0,0,0)',
},
content:{
  flex: 5,
  paddingBottom: 25,
  paddingTop: 5,
  backgroundColor:'rgba(0,0,0,0)',
},
swiper:{
  flex: 1,
 borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  marginRight: 1
},
wrapperSwiper:{

  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
},
slide1:{
  flex: 1,
  justifyContent: 'center',
    alignItems: 'center',
        backgroundColor: '#9DD6EB',
         borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
slide2:{
  flex: 1,
  justifyContent: 'center',
    alignItems: 'center',
        backgroundColor: '#97CAE5',
         borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
slide3:{
  flex: 1,
  justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
     borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
maincontent:{
  flex: 2,
  paddingHorizontal: 15,
  marginTop:15,
  
},
namecontent:{
flex: 1,
},
textName:{
flex: 1.2,

},
ratingcontent:{
  flex: 2,
 paddingRight: 15
},
infocontent:{
flex: 2,
paddingTop: 15
},
circle: {
    width: 50,
    height: 50,
    borderRadius: 100/2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    overflow: 'hidden'
}

});


export default DetailTrainer;