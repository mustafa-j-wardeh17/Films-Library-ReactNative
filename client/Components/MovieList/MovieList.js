import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const MovieList = ({ seeAll, data, category }) => {

    const navigation = useNavigation();
    const [movie, setMovie] = useState({})
    useLayoutEffect(() => {
        if (seeAll) {
            setMovie(seeAll)
        }
    }, [])
    const handleSelectMovie = (movie) => {
        navigation.navigate('Movie', {
            movie: movie
        })
    }

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.ListHeader}>
                <Text style={{ fontSize: wp(5), color: 'white',textTransform:"capitalize" }} >
                    {
                        data ?
                            category + ' movies'
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ScrollStyle}
            >
                {
                    data?.map((movie) => (
                        <TouchableOpacity
                            style={{ width: seeAll ? wp(30) : wp(40) }}
                            onPress={() => handleSelectMovie(movie)}
                            key={movie._id}
                            className='flex flex-col'
                        >
                            <View className='shadow w-full'>
                                <Image
                                    style={{ height: seeAll ? hp(20) : hp(35), borderRadius: wp(4), overflow: 'hidden' }}
                                    source={{ uri: movie.cover.url }}
                                    className='w-full'
                                    resizeMode='stretch'
                                />
                            </View>
                            <Text numberOfLines={1} className='text-center' style={styles.filmName}>
                                {movie?.title.length > 20 ? movie?.title.slice(0, 20) + '...' : movie?.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                }

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
        marginHorizontal: wp(1.4),
        marginBottom: hp(2)
    },
    TextStyle: {
        color: 'white',
        fontSize: wp(3),
        fontWeight: '600',
        textTransform: "capitalize"

    },
    SeconderyColor: {
        color: 'orange',
        fontSize: wp(4),
    },
    ScrollStyle: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: wp(4)
    },
    card: {
        overflow: 'hidden',
    },
    filmName: {
        color: 'rgba(255,255,255,0.675)',
        textAlignVertical: 'bottom',
        marginTop: 10,
        fontSize: wp(3.1)
    },

})