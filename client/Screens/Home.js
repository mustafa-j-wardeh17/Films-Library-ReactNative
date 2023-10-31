import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MagnifyingGlassIcon, Bars3CenterLeftIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList/MovieList'
import CarouselSlider from '../Components/CarouselSlider/CarouselSlider'
import { useEffect, useState } from 'react'
import { getFilmRepository } from '../Api/db'
import { useDispatch, useSelector } from 'react-redux'
import { setRepository } from '../redux/Movie/MovieSlice'
const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getFilmRepository().then((data) => {
            if (data) {
                dispatch(setRepository(data))
            }
        })
    }, [])
    const navigation = useNavigation();
    const Repository = useSelector(state => state.movie.repository)
    return (
        <SafeAreaView style={styles.HomeContainer}>
            <StatusBar style='light' />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity >
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color="white" />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>
                    <Text style={{ color: 'orange' }}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <MagnifyingGlassIcon size='30' strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                {
                    Repository ?
                        <>
                            <View>
                                <CarouselSlider />
                            </View>
                            <View className='w-full'>
                                <MovieList seeAll={false} data={Repository[0]} />
                            </View>
                            <View className='w-full'>
                                <MovieList seeAll={false} data={Repository[1]} />
                            </View>
                        </> : ''
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        marginTop: 20
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