import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { View, Text, Pressable, TextInput, Button, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LockClosedIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../Components/Loader";

const RegisterScreen = () => {
  let emailInput = useRef()
  let passwordInput = useRef()
  let confirmPasswordInput = useRef()

  const navigation = useNavigation()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loader, SetLoader] = useState(false)
  const [error, setError] = useState('')


  const handleRegister = async () => {
    try {
      SetLoader(true)
      const response = await axios.post('http://192.168.1.198:3011/auth/register', {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password,
        confirmPassword
      })
      setError('')
      setConfirmPassword('')
      setPassword('')
      setUsername('')
      setEmail('')
      await AsyncStorage.removeItem('token')
      AsyncStorage.setItem('token', response.data.token)
      navigation.navigate('Home')
      SetLoader(false)
    }
    catch (error) {
      setError(error.response.data.err)
      SetLoader(false)
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <LinearGradient
          className='flex-1 w-full relative justify-end items-center'
          colors={['#a39600', '#131313']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.48]}
        >
          <View
            style={{ top: hp(0) }}
            className='absolute  flex w-full space-y-6 h-[45%] justify-center  items-center ' >
            <Image
              source={require('./../assets/imdb.jpg')}
              resizeMode='cover'
              style={styles.image}
              className='rounded-[50px]'
            />
          </View>
          <View className=" bottom-0 px-4 w-full max-w-sm" style={{ marginBottom: hp(2.4) }} >
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}>

              <View className="flex relative flex-col items-center gap-2" >
                <View className='h-[50px] items-center flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                  <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col  ml-2 h-full' >
                    <UserCircleIcon size={40} color={'black'} />
                  </View>
                  <TextInput
                    value={username}
                    placeholder="ENTER USERNAME"
                    onChangeText={(e) => setUsername(e.toLowerCase())}
                    returnKeyType="next"
                    onSubmitEditing={() => emailInput.current.focus()}
                    blurOnSubmit={false}
                    className=" rounded-md   h-full pl-[60px]  pr-[25px] w-full"
                  />
                </View>
                <View className='h-[50px] items-center flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                  <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col  ml-2 h-full' >
                    <UserCircleIcon size={40} color={'black'} />
                  </View>
                  <TextInput
                    ref={emailInput}
                    placeholder="ENTER EMAIL"
                    value={email}
                    onChangeText={(e) => setEmail(e.toLowerCase())}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInput.current.focus()}
                    blurOnSubmit={false}
                    className=" rounded-md   h-full pl-[60px]  pr-[25px] w-full"
                  />
                </View>

                <View className=' h-[50px] items-center flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                  <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col ml-2 h-full' >
                    <LockClosedIcon size={40} color={'black'} />
                  </View>
                  <TextInput
                    ref={passwordInput}
                    placeholder="ENTER PASSWORD"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordInput.current.focus()}
                    className=" rounded-md   h-full pl-[60px]  pr-[25px] w-full"
                  />
                </View>

                <View className=' h-[50px] items-center flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                  <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col  ml-2 h-full' >
                    <LockClosedIcon size={40} color={'black'} />
                  </View>
                  <TextInput
                    ref={confirmPasswordInput}
                    placeholder="CONFIRM PASSWORD"
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={(e) => setConfirmPassword(e)}
                    returnKeyType="go"
                    onSubmitEditing={() => handleRegister()}
                    className=" rounded-md   h-full pl-[60px]  pr-[25px] w-full"
                  />
                </View>

                {
                  error !== '' && (
                    <Text
                      className='text-red-500'
                      style={{ fontSize: wp(3.1) }}
                    >
                      {error}
                    </Text>
                  )
                }
              </View >
            </TouchableWithoutFeedback>
            <View className='flex flex-row justify-center  w-full rounded-full my-3'>
              <TouchableOpacity onPress={() => handleRegister()}
                style={{ marginTop: hp(1), width: wp(50) }}
                className=' rounded-full  font-bold  shadow-md  shadow-[#1d3020] py-3 px-4 mb-2 flex flex-row justify-center items-center bg-[#161c0e]'
              >

                <Text className="text-gray-50 text-4xl tracking-widest font-bold">Register</Text>


              </TouchableOpacity>
            </View>

            <View className='flex flex-row items-center w-full justify-center '>
              <Text className='flex text-center flex-row items-center ' style={{ width: wp(90) }}>
                <Text className="font-semibold text-white flex justify-center tracking-wider">ALLREADY HAVE AN ACCOUNT?</Text>
                <Text className='font-bold text-white h-full flex justify-center tracking-wider '>
                  <Text onPress={() => navigation.navigate('Login')} className='font-extrabold text-white flex justify-center tracking-wider'> LOGIN</Text>
                </Text>
              </Text>
            </View>
          </View >

          {
            loader && (
              <View className='h-full w-full items-center justify-center absolute'>
                <Loader />
              </View>
            )
          }

        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  image: {
    width: wp(45),
    height: '45%',
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
});

export default RegisterScreen