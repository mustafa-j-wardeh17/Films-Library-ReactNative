import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../Sanity';
import { useDispatch } from 'react-redux';
import { setSelectedPerson } from '../../redux/Movie/MovieSlice';



const { width, height } = Dimensions.get('window');

const Cast = ({ casts }) => {


    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleSelectPerson = (person) => {
        navigation.navigate('Person')
        dispatch(setSelectedPerson(person))
    }
    return (
        <View >
            <View style={styles.ListHeader}>
                <Text style={styles.TextStyle}>
                    Top Cast
                </Text>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className='w-full flex-row mx-3 space-x-2'>
                    {
                        casts.map((cast) => (
                            <TouchableOpacity onPress={() => handleSelectPerson(cast)} key={cast._id} style={styles.card}>
                                <View style={styles.ImageStyleContainer} className='bg-neutral-700'>
                                    <Image source={{ uri: urlFor(cast.image).url() }} className='w-full h-full rounded-full' />
                                </View>
                                <Text numberOfLines={1} style={styles.filmName}>
                                    {cast.name.length > 14 ? cast.name.slice(0, 12) + '...' : cast.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Cast


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
    listStyle: {
        marginLeft: 20,
        flexDirection: 'row',
        gap: 15
    },
    card: {
        alignItems: 'center',
        overflow: 'hidden',

    },
    filmName: {
        color: 'rgba(255,255,255,0.9)',
        marginVertical: 4,
        textAlign: 'center'
    },
    filmName2: {
        color: 'rgba(255,255,255,0.56)',
        marginBottom: 4,
        textAlign: 'center',
        fontSize: 12
    },
    ImageStyleContainer: {
        height: width * 0.23,
        width: width * 0.23,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageStyle: {
        height: "100%",
        aspectRatio: '9/12',
        zIndex: 5
    }
})