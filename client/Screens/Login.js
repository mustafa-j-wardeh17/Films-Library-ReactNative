import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { View, Text, Pressable, TextInput, Button, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LockClosedIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../Components/Loader";

const LoginScreen = () => {
    let passwordInput = ''
    const navigation = useNavigation()
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loader, SetLoader] = useState(false)
    const [error, setError] = useState('')
    const handleLogin = async () => {
        try {
            SetLoader(true)
            const response = await axios.post('http://192.168.1.198:3011/auth/login', {
                username: username.trim(),
                password
            })
            setError('')
            setPassword('')
            setUsername('')
            AsyncStorage.setItem('token', response.data.token)
            navigation.navigate('Main')
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
                    locations={[0, 0.48]} // Adjust the stops here
                >
                    <View
                        style={{ top: hp(0) }}
                        className='absolute  flex w-full space-y-6 h-[45%] justify-center  items-center ' >
                        <Image
                            source={require('./../assets/imdb.jpg')}
                            resizeMode='cover'
                            style={styles.image}
                            className='rounded-[40px]'
                        />
                    </View>
                    <View className=" bottom-0 px-4 w-full max-w-sm" style={{ marginBottom: hp(5) }} >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                            <View className="flex relative flex-col items-center gap-4" >
                                <View className='h-[60px] flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                                    <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col  w-[80px] h-full' >
                                        <UserCircleIcon size={40} color={'black'} />
                                        <Text className='text-[9px] font-extrabold uppercase tracking-widest'>username</Text>
                                    </View>
                                    <TextInput
                                        value={username}
                                        onChangeText={(e) => setUsername(e.toLowerCase())}
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordInput.focus()}
                                        blurOnSubmit={false}
                                        className=" rounded-md   h-full pl-[60px]  pr-[25px] w-full"
                                    />
                                </View>

                                <View className=' h-[60px] flex relative flex-row py-4 bg-white rounded-[25px] overflow-hidden' style={{ width: wp(70) }}>
                                    <View className='absolute z-[10]  flex items-center mt-4 justify-center flex-col  w-[80px] h-full' >
                                        <LockClosedIcon size={40} color={'black'} />
                                        <Text className='text-[9px] font-extrabold uppercase tracking-widest'>password</Text>
                                    </View>
                                    <TextInput
                                        ref={(input) => {
                                            passwordInput = input
                                        }}
                                        value={password}
                                        secureTextEntry={true}
                                        onChangeText={(e) => setPassword(e)}
                                        returnKeyType="go"
                                        onSubmitEditing={() => handleLogin()}
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
                        <View className='flex flex-row justify-center h-[120px] w-full rounded-full '>
                            <TouchableOpacity onPress={() => handleLogin()}
                                style={{ marginTop: hp(5), width: wp(50) }}
                                className=' rounded-full h-[70px] font-bold  shadow-md  shadow-[#383729] flex flex-row justify-center items-center bg-[#4a4a45]'
                            >

                                <Text className="text-gray-50 text-4xl tracking-widest font-bold">Login</Text>


                            </TouchableOpacity>
                        </View>

                        <View className='flex flex-row items-center w-full justify-center mt-[20px]'>
                            <Text className='flex text-center flex-row items-center ' style={{ width: wp(90) }}>
                                <Text className="font-semibold text-white flex justify-center tracking-wider">YOU DON'T HAVE AN ACCOUNT?</Text>
                                <Text className='font-bold text-white h-full flex justify-center tracking-wider '>
                                    <Text onPress={() => navigation.navigate('Register')} className='font-extrabold text-white flex justify-center tracking-wider'> SIGN UP</Text>
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

export default LoginScreen