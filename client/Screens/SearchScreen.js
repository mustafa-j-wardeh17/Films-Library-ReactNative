import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setRepository } from '../redux/Movie/MovieSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';


const { width, height } = Dimensions.get('window');


const SearchScreen = () => {
    const [searchMovies, setSearchMovies] = useState([])
    const [searchText, setSearchText] = useState('')
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { repository } = useSelector(state => state.movie)
    useLayoutEffect(() => {
        fetchMoviesRepository()
    }, [])

    const fetchMoviesRepository = async () => {
        try {
            const moviesData = await axios.get('http://192.168.137.1:3011/movie/getAllMovies')
            dispatch(setRepository(moviesData.data))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setSearchMovies(repository.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase())));
    }, [searchText])

    return (
        <View showsVerticalScrollIndicator={false} style={{
            flex: 1, marginTop: 50
        }}>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss}>
                <View style={styles.searchBar}>
                    <TextInput
                        value={searchText}
                        onChangeText={(e) => setSearchText(e)}
                        style={styles.SearchInput}
                        placeholderTextColor={'rgba(255,255,255,0.64)'}
                        placeholder='Search Movies'
                    />
                    <TouchableOpacity onPress={() => {navigation.goBack();setSearchText('')}} style={styles.Xicon}>
                        <XMarkIcon width={30} height={30} color="rgba(255,255,255,0.75)" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ marginTop: 10, marginRight: 60, fontSize: 14, width: '100%', paddingLeft: 12 }}>
                <Text style={{ color: 'white' }}>
                    Result (
                    <Text>{searchMovies.length}</Text>
                    )
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ marginTop: 10, gap: 20, marginHorizontal: 20, fontSize: 14, width: '100%', paddingLeft: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {

                        searchMovies?.map((item) => (
                            <TouchableOpacity key={item._id} onPress={() => { navigation.navigate('Movie', { movie: item }) ;setSearchText('')}} style={styles.card}>
                                <Image source={{ uri: item.cover.url }} style={styles.ImageStyle} />
                                <Text numberOfLines={1} style={styles.filmName}>
                                    {item.title && item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                                </Text>
                            </TouchableOpacity>
                        ))

                    }
                </View>
            </ScrollView>

        </View>
    )
}

export default SearchScreen


const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal:wp(3),
        gap: 10,
        borderWidth: 2,
        borderBlockColor: 'rgba(255,255,255,0.2)',
        borderRadius: width * 0.5,
        overflow: 'hidden',
        height: 40,

    },
    Xicon: {
        position: 'absolute',
        right: 6,
        backgroundColor: 'gray',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000
    },
    SearchInput: {
        flex: 1,
        fontSize: 20,
        color: 'white',
        borderColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: 15,
        height: "120%",
        width: '160%'

    },
    card: {
        overflow: 'hidden',
        marginBottom: 37,
    },
    filmName: {
        color: 'rgba(255,255,255,0.9)',
        textAlignVertical: 'bottom',
        marginTop: 10
    },
    ImageStyle: {
        width: width * 0.4,
        height: height * 0.33,
        borderRadius: width * 0.02,
    }
})