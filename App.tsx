import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
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
import PrivacyPolicyScreen from './src/screens/SetUp/PrivacyPolicyScreen';
import WeightScreen from './src/screens/SetUp/WeightScreen';
import WelcomeScreen from './src/screens/SetUp/WelcomeScreen';
import BottomBar from './src/navigation/BottomBar';
import HomeScreenMeal from './src/screens/HomeScreen/HomeScreenMeal';
import HomeScreenConfirm from './src/screens/HomeScreen/HomeScreenConfirm';
import HomeScreenAdd from './src/screens/HomeScreen/HomeScreenAdd';
import ScanScreen from './src/screens/Scan/ScanScreen';
import SignupVerifyScreen from './src/screens/Auth/SignupVerifyScreen';
import EditProfileScreen from './src/screens/Profile/EditProfileScreen';

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
  Dislikes: undefined;
  Gender: undefined;
  GoalWeight: undefined;
  Height: undefined;
  PrivacyPolicy: undefined;
  Weight: undefined;
  Welcome: undefined;
  Home: undefined;
  Meal: undefined;
  Confirm: undefined;
  Add: undefined;
  Scan: undefined;
  SignupVerify: { email: string };
  EditProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient(); 

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
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
              <Stack.Screen name="Allergens"      component={AllergensScreen} />
              <Stack.Screen name="Birthday"       component={BirthdayScreen} />
              <Stack.Screen name="Diet"           component={DietScreen} />
              <Stack.Screen name="DiningHall"     component={DiningHallScreen} />
              <Stack.Screen name="Dislikes"       component={DislikesScreen} />
              <Stack.Screen name="Gender"         component={GenderScreen} />
              <Stack.Screen name="GoalWeight"     component={GoalWeightScreen} />
              <Stack.Screen name="Height"         component={HeightScreen} />
              <Stack.Screen name="PrivacyPolicy"  component={PrivacyPolicyScreen} />
              <Stack.Screen name="Weight"         component={WeightScreen} />
              <Stack.Screen name="Welcome"        component={WelcomeScreen} />
              <Stack.Screen name="Home"           component={BottomBar} />
              <Stack.Screen name="Meal"           component={HomeScreenMeal} />
              <Stack.Screen name="Confirm"        component={HomeScreenConfirm} />
              <Stack.Screen name="Add"            component={HomeScreenAdd} />
              <Stack.Screen name="Scan"           component={ScanScreen} />
              <Stack.Screen name="SignupVerify"   component={SignupVerifyScreen} />
              <Stack.Screen name="EditProfile"    component={EditProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider> 
  );
}