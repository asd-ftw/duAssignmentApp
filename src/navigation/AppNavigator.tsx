import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login/LoginScreen';
import MovieScreen from '../screens/movie/MovieScreen';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/redux.hook';

export type RootStackParamList = {
  LoginScreen: undefined;
  MovieScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { email, password } = useAppSelector(
    (state: RootState) => state.persisted.auth,
  );
  const isLoggedIn = !!(email && password);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'MovieScreen' : 'LoginScreen'}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
