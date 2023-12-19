import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContent } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Screens/Home';
import Movie from '../Screens/Movie';
import Person from '../Screens/Person';
import SearchScreen from '../Screens/SearchScreen';
import RegisterScreen from '../Screens/Register';
import LoginScreen from '../Screens/Login';
import Profile from '../Screens/Profile';
import 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const { navigation } = props;
  
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{justifyContent:'space-between' ,flex:1}} style={styles.drawerContent}>
        <DrawerItemList {...props} />
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  };

const DrawerGroup = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerContentStyle:{flex:1,position:'relative',justifyContent:'center'},
        headerShown: false,
        drawerStyle: { backgroundColor: '#292828' },
        drawerLabelStyle: { color: 'white',textAlign:'auto'},
      }}
      
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Profile" component={Profile} /> */}
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          gestureEnabled:false,
          contentStyle: { backgroundColor: '#000000d9' },
        }}
      >
        <Stack.Screen name="Main" component={DrawerGroup} />
        <Stack.Screen name="Movie" component={Movie} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Person" component={Person} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    logoutButtonContainer: {
      marginTop: 'auto', // Position the container at the bottom
      padding: 10,
    },
    logoutButton: {
      backgroundColor: 'red',
      padding: 10,
      marginBottom:30,
      borderRadius: 5,
    },
    logoutButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

export default Navigation;
