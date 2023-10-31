import { View, Text, SafeAreaView, Touchable, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ArrowSmallLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'react-native-svg';
import MovieList from '../Components/MovieList/MovieList';
import Cast from '../Components/Cast/Cast';
import { useState } from 'react';
import { urlFor } from '../Sanity';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Movie = () => {
    const navigation = useNavigation()
    const movie = useSelector(state => state.movie.selectedMovie)
    const [Fav, SetFav] = useState(false)
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ position: 'relative' }}>
            <View style={{ flex: 1 }}>
                <View style={{ position: 'absolute', zIndex: 99, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'transparent', top: 30 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 10, backgroundColor: 'orange' }}>
                        <ArrowSmallLeftIcon size={30} color='white' strokeWidth={2} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => SetFav((!Fav))} >
                        <HeartIcon size={30} color={Fav ? 'red' : 'white'} strokeWidth={2} />
                    </TouchableOpacity>
                </View>
                <View style={{width:width,height:width*1.2 }}>
                    <Image source={{uri:urlFor(movie.image).url()}} className='h-full w-full'  style={{objectFit:'fill'}}  resizeMode='cover' />
                </View>
            </View>
            <View className='rounded-t-xl w-full overflow-hidden'>
                <Cast casts={movie.casts} />
                <MovieList seeAll={true} data={movie} />
            </View>
        </ScrollView>
    )
}

export default Movie 

{/* <LinearGradient
colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
style={{ width: height * 0.40, zIndex: 99, height: height * 0.40, position: 'absolute', bottom: 0 }}
start={{ x: 0.5, y: 0 }}
end={{ x: 0.5, y: 1 }}
/> */}