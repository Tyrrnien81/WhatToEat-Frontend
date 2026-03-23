import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignUpScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import VerifyEmailScreen from './src/screens/Auth/VerifyEmailScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen';
import AllergensScreen from './src/screens/SetUp/AllergensScreen';
import BirthdayScreen from './src/screens/SetUp/BirthdayScreen';
import DietScreen from './src/screens/SetUp/DietScreen';
import DiningHallScreen from './src/screens/SetUp/DiningHallScreen';
import DislikesScreen from './src/screens/SetUp/DislikesScreen';
import GenderScreen from './src/screens/SetUp/GenderScreen';
import GoalWeightScreen from './src/screens/SetUp/GoalWeightScreen';
import HeightScreen from './src/screens/SetUp/HeightScreen';
import WeightScreen from './src/screens/SetUp/WeightScreen';
import WelcomeScreen from './src/screens/SetUp/WelcomeScreen';
import BottomBar from './src/navigation/BottomBar';
import HomeScreenMeal from './src/screens/HomeScreen/HomeScreenMeal';
import HomeScreenConfirm from './src/screens/HomeScreen/HomeScreenConfirm';
import HomeScreenAdd from './src/screens/HomeScreen/HomeScreenAdd';

export type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
  ResetPassword: undefined;
  Signup: undefined;
  VerifyEmail: undefined;
  Allergens: undefined;
  Birthday: undefined;
  Diet: undefined;
  DiningHall: undefined;
  Dislikes: undefined
  Gender: undefined;
  GoalWeight: undefined;
  Height: undefined;
  Weight: undefined;
  Welcome: undefined;
  Home: undefined;
  Meal: undefined;
  Confirm: undefined;
  Add: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Signup"         component={SignupScreen} />
          <Stack.Screen name="VerifyEmail"    component={VerifyEmailScreen} />
          <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />
          <Stack.Screen name="Allergens" component={AllergensScreen} />
          <Stack.Screen name="Birthday" component={BirthdayScreen} />
          <Stack.Screen name="Diet" component={DietScreen} />
          <Stack.Screen name="DiningHall" component={DiningHallScreen} />
          <Stack.Screen name="Dislikes" component={DislikesScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="GoalWeight" component={GoalWeightScreen} />
          <Stack.Screen name="Height" component={HeightScreen} />
          <Stack.Screen name="Weight" component={WeightScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />     
          <Stack.Screen name="Home"    component={BottomBar} />
          <Stack.Screen name="Meal"    component={HomeScreenMeal} />
          <Stack.Screen name="Confirm" component={HomeScreenConfirm} />
          <Stack.Screen name="Add"     component={HomeScreenAdd} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}