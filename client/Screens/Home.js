import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MagnifyingGlassIcon, Bars3CenterLeftIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList/MovieList'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios'
import Loader from '../Components/Loader'


const Home = () => {
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [loader, SetLoader] = useState(true)
    useEffect(() => {
        importMovies()
    }, [])

    const importMovies = async () => {
        try {
            const actionData = await axios.get('http://localhost:3011/movie/getmovies?category=action')
            setActionMovies(actionData.data)
            const comedyData = await axios.get('http://localhost:3011/movie/getmovies?category=comedy')
            setComedyMovies(comedyData.data)
            SetLoader(false)
        }
        catch (err) {
            console.log('Error on fetching movies')
            SetLoader(false)
        }
    }

    const navigation = useNavigation();
    const Repository = useSelector(state => state.movie.repository)
    return (
        <View style={styles.HomeContainer}>
            <StatusBar style='light' />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity >
                    <Bars3CenterLeftIcon size={wp(5)} strokeWidth={2} color="white" />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>
                    <Text style={{ color: 'orange' }}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <MagnifyingGlassIcon size={wp(5)} strokeWidth={2} color="white" />
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
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        marginTop: 50
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