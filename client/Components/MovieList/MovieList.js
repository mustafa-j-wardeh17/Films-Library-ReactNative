import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../Sanity';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../redux/Movie/MovieSlice';



const { width, height } = Dimensions.get('window');

const MovieList = ({ seeAll, data }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleSelectMovie = (movie) => {
        navigation.navigate('Movie')
        dispatch(setSelectedMovie(movie))
    }

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.ListHeader}>
                <Text style={styles.TextStyle}>
                    {
                        data?.films ?
                            data?.name
                            : 'Related Movies'
                    }
                </Text>
                <Pressable>
                    {
                        !seeAll ?
                            (<Text style={styles.SeconderyColor}>
                                See All
                            </Text>
                            )
                            : null
                    }

                </Pressable>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className='flex-row mx-2 space-x-5'>
                    {
                        data.films ?
                            data?.films?.map((movie) => (
                                <TouchableOpacity onPress={() => handleSelectMovie(movie)} key={movie._id} style={styles.card}>
                                    <View className='shadow  ' style={styles.ImageStyle}>
                                        <Image source={{ uri: urlFor(movie.image).url() }}   style={styles.ImageStyle}/>
                                    </View>
                                    <Text numberOfLines={1} className='ml-2' style={styles.filmName}>
                                        {movie?.name.length > 20 ? movie?.name.slice(0, 20) + '...' : movie?.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                            :
                            data?.related?.map((movie) => (
                                <TouchableOpacity onPress={() => handleSelectMovie(movie)} key={movie._id} style={styles.card}>
                                    <Image source={{ uri: urlFor(movie.image).url() }} style={styles.ImageStyle} />
                                    <Text numberOfLines={1} className='ml-4' style={styles.filmName}>
                                        {movie?.name.length > 20 ? movie?.name.slice(0, 20) + '...' : movie?.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default MovieList


const styles = StyleSheet.create({
    ListHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginLeft: 15
    },
    TextStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'

    },
    SeconderyColor: {
        color: 'orange',
        fontSize: 15
    },
    card: {
        overflow: 'hidden'
    },
    filmName: {
        color: 'rgba(255,255,255,0.675)',
        textAlignVertical: 'bottom',
        marginTop: 10
    },
    ImageStyle: {

        borderRadius: 20,
        height: 250,
        width: 180
    }
})