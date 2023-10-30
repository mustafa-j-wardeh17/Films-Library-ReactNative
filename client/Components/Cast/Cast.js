import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../Sanity';



const { width, height } = Dimensions.get('window');

const Cast = ({casts}) => {


    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.ListHeader}>
                <Text style={styles.TextStyle}>
                    Top Cast
                </Text>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}>
                {
                    casts.map((item) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('Person',{person:item}) }} key={index} style={styles.card}>
                            <View style={styles.ImageStyleContainer}>
                                <Image source={{uri:urlFor(item.image).url()}} style={styles.ImageStyle} />
                            </View>
                            <Text numberOfLines={1} style={styles.filmName}>
                                {item.name}
                            </Text>

                        </TouchableOpacity>
                    ))
                }
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
        fontWeight:'600'
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
        fontSize:12
    },
    ImageStyleContainer: {
        height: width * 0.14,
        width: width * 0.14,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    ImageStyle: {
        height: "100%",
        aspectRatio: '9/12',
        zIndex: 5
    }
})