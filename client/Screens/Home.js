import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MagnifyingGlassIcon, Bars3CenterLeftIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList/MovieList'
import { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios'
import Loader from '../Components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [loader, SetLoader] = useState(true)
    const [token, setToken] = useState()
    const [menuState, setMenuState] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        importMovies()

    }, [])

    const importMovies = async () => {
        try {
            const data = await AsyncStorage.getItem('token')
            if (!data) {
                navigation.navigate('Login')
                setMenuState(false)
            }
            const actionData = await axios.get('http://192.168.1.198:3011/movie/getmovies?category=action')
            setActionMovies(actionData.data)
            const comedyData = await axios.get('http://192.168.1.198:3011/movie/getmovies?category=comedy')
            setComedyMovies(comedyData.data)
            SetLoader(false)
        }
        catch (err) {
            console.log('Error on fetching movies')
            SetLoader(false)
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('Login')
            setMenuState(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.HomeContainer}>
            <StatusBar style='light' />
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => setMenuState(true)} >
                    <Bars3CenterLeftIcon size={wp(7)} strokeWidth={2} color="white" />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>
                    <Text style={{ color: 'orange' }}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <MagnifyingGlassIcon size={wp(7)} strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>

            {
                loader ?
                    (<Loader />)
                    : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View className='w-full' style={{ marginBottom: hp(4) }}>
                                <MovieList seeAll={false} data={actionMovies} category={'action'} />
                            </View>
                            <View className='w-full' style={{ marginBottom: hp(4) }}>
                                <MovieList seeAll={false} data={comedyMovies} category={'comedy'} />
                            </View>
                        </ScrollView >
                    )
            }

            {
                menuState && (
                    <View className='absolute justify-between left-0 h-full px-[10px] w-[50%] bg-[#32322a]'>
                        <TouchableOpacity onPress={() => setMenuState(false)} >
                            <Bars3CenterLeftIcon size={wp(7)} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='mb-[50px] py-2 w-full shadow-sm shadow-red-300 bg-red-500 items-center space-x-3 flex-row justify-center rounded-md '
                            onPress={() => handleLogout()}
                        >
                            <Bars3CenterLeftIcon size={wp(7)} strokeWidth={2} color="white" />
                            <Text className='text-white' style={{fontSize:wp(5)}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        marginTop: 50,
        position: 'relative'
    },
    HeaderContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    TextStyle: {
        fontSize: 28,
        color: 'white',
        fontWeight: '700',
    }

})