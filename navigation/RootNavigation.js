import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import TopScreen from '../screens/TopScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginFB from '../screens/LoginFB';
import LoginScreen from '../screens/LoginScreen.js';
import WelcomeTrainee from '../screens/WelcomeTrainee';
import WelcomeTrainer from '../screens/WelcomeTrainer';

import TrainerSpecialize from '../screens/TrainerSpecialize';
import TraineeTreatment from '../screens/TraineeTreatment';
import SelectTrainee from '../screens/SelectTrainee';
import SelectTrainer from '../screens/SelectTrainer';
import TraineeProfile from '../screens/TraineeProfile';
import TrainerProfile from '../screens/TrainerProfile';

import InfomationVersion from '../screens/Infomation/InfomationVersion';
import Policy from '../screens/Infomation/Policy';
import Term from '../screens/Infomation/Term';
const RootNavigation = StackNavigator(
{	
  	TopScreen: { screen: TopScreen },
 	RegisterScreen: { screen: RegisterScreen },
 	LoginScreen: { screen: LoginScreen},
 	WelcomeTrainee :{ screen: WelcomeTrainee},
 	WelcomeTrainer :{ screen: WelcomeTrainer},
 	TrainerSpecialize :{ screen: TrainerSpecialize},
 	TraineeTreatment :{ screen: TraineeTreatment},
 	SelectTrainee : { screen: SelectTrainee},
 	SelectTrainer : { screen: SelectTrainer},
 	TraineeProfile : { screen: TraineeProfile},
 	TrainerProfile : { screen: TrainerProfile},

 	InfomationVersion : { screen: InfomationVersion},
 	Policy : { screen: Policy},
 	Term : { screen: Term},
 
},
{
	headerMode:'none'
}

);

export default RootNavigation;
