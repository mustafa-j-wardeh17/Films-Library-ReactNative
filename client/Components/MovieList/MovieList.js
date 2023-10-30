import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../Sanity';



const { width, height } = Dimensions.get('window');

const MovieList = ({ seeAll, data }) => {

    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.ListHeader}>
                <Text style={styles.TextStyle}>
                    {data.name}
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
                contentContainerStyle={styles.listStyle}>
                {
                    data.films.map((item) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('Movie', { movie: item }) }} key={item._id} style={styles.card}>
                            <Image source={{ uri: urlFor(item.image).url() }} style={styles.ImageStyle} />
                            <Text numberOfLines={1} style={styles.filmName}>
                                {item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name}
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