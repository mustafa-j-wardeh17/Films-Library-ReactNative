import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowSmallLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import MovieList from '../Components/MovieList/MovieList';
import Cast from '../Components/Cast/Cast';
import { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Loader from '../Components/Loader';



const Movie = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const movie = route.params.movie
    const [Fav, SetFav] = useState(false)
    const [loader, setLoader] = useState(true)
    const [casts, setCasts] = useState([])
    const [relatedMovies, setRelatedMovies] = useState([])
    useEffect(() => {
        fetchCastsAndRelated()
    }, [movie])
    const fetchCastsAndRelated = async () => {
        try {
            setLoader(true)
            const casts = await axios.get(`http://192.168.137.1:3011/cast/getcasts?movies=${movie.title}`)
            const related = await axios.get(`http://192.168.137.1:3011/movie/getRelatedMovies?relatedMovies=${movie.relatedMovies}`)
            if (related.data.length > 0) {
                let newArray = []
                for (let i = 0; i < related.data.length; i++) {
                    if (related.data[i].title !== movie.title) {
                        newArray.push(related.data[i]);
                    }
                }
                setRelatedMovies(newArray)
            }
            setCasts(casts.data)
            setLoader(false)
        }
        catch (error) {
            console.log(error.response)
            setLoader(false)
        }
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ position: 'relative', flex: 1 }}
        >

            <View className='h-full relative ' >
                <View className='flex-1' style={{ height: hp(50) }} >
                    <View style={{ position: 'absolute', zIndex: 99, padding: 10, flexDirection: 'row',marginTop:hp(5), justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'transparent', top: 0 }}>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: wp(2), padding:5, backgroundColor: 'orange', zIndex: 10 }}>
                            <ArrowSmallLeftIcon size={wp(6)} color='white' strokeWidth={2} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetFav((!Fav))} >
                            <HeartIcon size={wp(6)} color={Fav ? 'red' : 'white'} strokeWidth={2} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: wp(100), aspectRatio: '9/10', overflow: 'hidden' }} >
                        <Image
                            source={{ uri: movie.cover.url }}
                            style={{ width: wp(100), aspectRatio: '9/10', borderBottomLeftRadius: wp(8), borderBottomRightRadius: wp(8) }}
                            resizeMode='cover'
                        />
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.1)', 'rgba(70, 70, 70, 1) ']}
                            style={{ width: wp(100), aspectRatio: '9/10', borderBottomLeftRadius: wp(8), borderBottomRightRadius: wp(8), zIndex: 30, position: 'absolute', top: 0 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                    </View>
                </View>

                {
                    loader ?
                        (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Loader />
                            </View>
                        )
                        :
                        (
                            <View className='w-full overflow-hidden  bg-transparent'
                                style={{
                                    marginTop: hp(4),
                                    width: wp(100)
                                }}
                            >
                                <Cast casts={casts} />
                                <MovieList category={'Related'} seeAll={true} data={relatedMovies} />
                                {/* create if statement with continue if seeAll */}
                            </View>
                        )
                }
            </View>
        </ScrollView>
    )
}

export default Movie

