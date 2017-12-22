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
      issue : '',
      id :`${this.props.navigation.state.params.Account.customer.id}`,
      type: `${this.props.navigation.state.params.Account.type}`,
      access_token :`${this.props.navigation.state.params.Account.customer.access_token}`,
      trainerId: `${this.props.navigation.state.params.id}`,
    };
  }
  pressIcon = () =>
  {
     this.setState({ pressIcon: !this.state.pressIcon });
     console.log("testtrainer",this.props.navigation.state.params.Account)
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
//   componentWillMount() {
//   let formdata = new FormData();
//   formdata.append("access_token", this.state.access_token);
//   formdata.append("type", this.state.type);
//   formdata.append("id", this.state.id);

// //   console.log('id2',this.props.navigation.state.params.Account.customer.id)
// //   console.log('token2',this.props.navigation.state.params.Account.customer.access_token)
//   fetch('http://35.185.68.16/api/v1/trainer/getPRDetail', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     body: formdata

//   }).then((response) => response.json())
//   .then((responseJson) => {

    


//     var content = responseJson.data.pr_content;
//   console.log('content',content)
    
//     this.setState({
     
//   content : content
 
//     })
   
  
//    })


// }
componentWillMount() {


  let formdata = new FormData();
  formdata.append("access_token", this.state.access_token);
  formdata.append("type", this.state.type);
  formdata.append("id", this.state.id);
  formdata.append("trainerId", this.state.trainerId);


  fetch('http://35.185.68.16/api/v1/trainer/detail', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata

  }).then((response) => response.json())
  .then((responseJson) => {
   
    


    var content = responseJson;

     console.log("issue",content)
    this.setState({
     
  content : content,
  image: content.avatar,
  name: content.data.name,
  issue: content.rawSpecializes,
  prContent: content.data.pr_content,

    })
   console.log("issue",this.state.image)
  
   })


}
  render() {
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    const  image  = this.state;
    return (
      
           <ImageBackground  source={require('../img/trainer_detailscreen.png')} style={styles.backgroundImage}>
                 <View style={styles.container}>
                  <View style={styles.header}>
                      <View style={styles.icon}>
                      <TouchableOpacity style={{flex: 1,justifyContent: 'center',}}onPress={ () => goBack(null)  }>
                          <Ionicons name="ios-arrow-back" size={20} />
                      </TouchableOpacity>
                      </View>

                      <View style={styles.text}>
                          <Text style={{fontSize:20,fontWeight: 'bold'  }}> {this.state.name}</Text>

                      </View>


                  </View>

                  <View style={styles.content}>
                      <View style={styles.swiper}>
                          <Image  source={{uri: this.state.image }} resizeMode="stretch" style={styles.imageswiper}>
                           </Image>                   

                      </View>

                      <View style={styles.maincontent}>
                            
                                 <View style={styles.namecontent}>
                                    <View style={styles.textName}>
                                     <Text style={{fontSize:17,fontWeight: 'bold',paddingTop:5}}> {this.state.name} </Text>
                                     <Text style={{fontSize:11,paddingTop:5}}> {this.state.issue} </Text>
                                    </View>

                                    <View style={styles.ratingcontent}>
                                          <View style={{flex: 1,flexDirection: 'row',paddingTop:10}}>
                                              <Text style={styles.textStar}> フレンドリー </Text>
                                                    <View style={{paddingLeft: 8,}} >
                                                      <StarRating

                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={15}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        
                                                       />
                                                    </View>
                                              </View>
                                              <View style={{flex: 1,flexDirection: 'row'}}>

                                              <Text  style={styles.textStar}> 減量 </Text>
                                                <View style={{paddingLeft: 60,}} >
                                              <StarRating
                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={15}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}

                                                      />
                                                      </View>
                                              </View>
                                              <View style={{flex: 1,flexDirection: 'row'}}>
                                              <Text  style={styles.textStar}> 痛みを取る </Text>
                                              <View style={{paddingLeft: 15,}} >
                                              <StarRating
                                                        disabled={false}
                                                        emptyStar={'ios-star-outline'}
                                                        fullStar={'ios-star'}
                                                        halfStar={'ios-star-half'}
                                                        iconSet={'Ionicons'}
                                                        maxStars={5}
                                                        starSize={15}
                                                        starColor={'green'}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}

                                                      />
                                                      </View>
                                              </View>
                                    </View>
                                 </View>
                                  <View
                                    style={{
                                      paddingTop:10,
                                      borderBottomColor: '#24DFA8',
                                      borderBottomWidth: 2,
                                    }}
                                  />

                                 <View style={styles.infocontent}>
                                    <View style={{flex: 2,}}>
                                        <Text style={{fontSize:13}}> {this.state.prContent}</Text>
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
  height: null,
  width: null,
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
 paddingRight: 15,

},
textStart:{
  fontSize: 11,
},
infocontent:{
flex: 1.7,
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