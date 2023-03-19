import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import WelcomeScreen from './src/screens/WelcomeScreen.js';
import FirstNameScreen from './src/screens/FirstNameScreen.js';
import MakeUpScreen from './src/screens/MakeUpScreen.js';
import SkinCareScreen from './src/screens/SkinCareScreen.js';
import BeautyTipsScreen from './src/screens/BeautyTipsScreen.js';
import CustomizeSkinScreen from './src/screens/CustomizeSkinScreen.js';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FirstName" component={FirstNameScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="MakeUp" component={MakeUpScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SkinCare" component={SkinCareScreen} options={{headerShown: false}}/>
      <Stack.Screen name="BeautyTips" component={BeautyTipsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CustomizeSKinSkin" component={CustomizeSkinScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


