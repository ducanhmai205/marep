import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import TopScreen from '../screens/TopScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginFB from '../screens/LoginFB';
import LoginScreen from '../screens/LoginScreen.js';
import ForgotPassword from '../screens/ForgotPassword';
import WelcomeTrainee from '../screens/WelcomeTrainee';
import WelcomeTrainer from '../screens/WelcomeTrainer';

import TrainerSpecialize from '../screens/TrainerSpecialize';
import TraineeTreatment from '../screens/TraineeTreatment';
import SelectTrainee from '../screens/SelectTrainee';
import SelectTrainer from '../screens/SelectTrainer';
import TraineeProfile from '../screens/TraineeProfile';
import TrainerProfile from '../screens/TrainerProfile';
import DetailTrainer from '../screens/DetailTrainer';
import DetailUser from '../screens/DetailUser';
import MenuTrainer from '../screens/MenuTrainer';
import MenuUser from '../screens/MenuUser';
import InfomationVersion from '../screens/Infomation/InfomationVersion';
import Policy from '../screens/Infomation/Policy';
import Term from '../screens/Infomation/Term';
import UpdatePassword from '../screens/UpdatePassword';
import UpdatePassTrainer from '../screens/UpdatePassTrainer';
import UpdatePr from '../screens/UpdatePr';
import ChangeIssue from '../screens/ChangeIssue';
import ChangeSpecializes from '../screens/ChangeSpecializes';
import RatingScreen from '../screens/RatingScreen';
import ChatUser from '../screens/ChatUser';
import ChatTrainer from '../screens/ChatTrainer';
import InfomationVersionTrainer from '../screens/Infomation/InfomationVersionTrainer';
import PolicyTrainer from '../screens/Infomation/PolicyTrainer';
import TermTrainer from '../screens/Infomation/TermTrainer';
const RootNavigation = StackNavigator(
{	
  	TopScreen: { screen: TopScreen },
 	RegisterScreen: { screen: RegisterScreen },
 	LoginScreen: { screen: LoginScreen},
 	LoginFB: { screen: LoginFB},
 	ForgotPassword: { screen: ForgotPassword},
 	WelcomeTrainee :{ screen: WelcomeTrainee},
 	WelcomeTrainer :{ screen: WelcomeTrainer},
 	TrainerSpecialize :{ screen: TrainerSpecialize},
 	TraineeTreatment :{ screen: TraineeTreatment},
 	SelectTrainee : { screen: SelectTrainee},
 	SelectTrainer : { screen: SelectTrainer},
 	TraineeProfile : { screen: TraineeProfile},
 	TrainerProfile : { screen: TrainerProfile},
 	DetailTrainer : { screen: DetailTrainer},
 	MenuTrainer : { screen: MenuTrainer},
 	MenuUser : { screen: MenuUser},
 	InfomationVersion : { screen: InfomationVersion},
 	Policy : { screen: Policy},
 	Term : { screen: Term},
 	UpdatePassword : { screen: UpdatePassword},
 	UpdatePassTrainer : { screen: UpdatePassTrainer},
 	UpdatePr : { screen: UpdatePr},
 	ChangeIssue : { screen: ChangeIssue},
 	ChangeSpecializes : { screen: ChangeSpecializes},
 	DetailUser : { screen: DetailUser},
 	RatingScreen : { screen: RatingScreen},
 	ChatUser : { screen: ChatUser},
 	ChatTrainer : { screen: ChatTrainer},
 	InfomationVersionTrainer : { screen: InfomationVersionTrainer},
 	PolicyTrainer : { screen: PolicyTrainer},
 	TermTrainer : { screen: TermTrainer},
 
 
},
{
	headerMode:'none',
	navigationOptions: {
      gesturesEnabled: false
    }
}

);

export default RootNavigation;
