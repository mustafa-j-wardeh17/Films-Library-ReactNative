import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'


const { width, height } = Dimensions.get('window');


const SearchScreen = () => {
    let MoveName = 'Ant-Man and the Wasp: Quantumania'

    let SearchNumber = 4
    const navigation = useNavigation()
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <View showsVerticalScrollIndicator={false} style={{
            flex: 1, marginTop: 50
        }}>
            <View style={styles.searchBar}>
                <TextInput style={styles.SearchInput} placeholderTextColor={'rgba(255,255,255,0.64)'} placeholder='Search Movies' />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.Xicon}>
                    <XMarkIcon width={30} height={30} color="rgba(255,255,255,0.75)" />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, marginRight: 60, fontSize: 14, width: '100%', paddingLeft: 12 }}>
                <Text style={{ color: 'white' }}>
                    Result (
                    <Text>{arr.length}</Text>
                    )
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ marginTop: 10, gap: 20, marginHorizontal: 20, fontSize: 14, width: '100%', paddingLeft: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        arr ?
                            arr.map((item) => (
                                <TouchableOpacity key={item} onPress={() => { navigation.navigate('Movie') }} style={styles.card}>
                                    <Image source={require("../assets/snap.jpg")} style={styles.ImageStyle} />
                                    <Text numberOfLines={1} style={styles.filmName}>
                                        {MoveName && MoveName.length > 20 ? MoveName.slice(0, 20) + '...' : MoveName}
                                    </Text>
                                </TouchableOpacity>
                            ))
                            :
                            (<Text>sss</Text>)
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
        gap: 10,
        borderWidth: 2,
        borderBlockColor: 'rgba(255,255,255,0.2)',
        borderRadius: width * 0.5,
        overflow: 'hidden',
        height: 50,

    },
    Xicon: {
        position: 'absolute',
        right: 6,
        backgroundColor: 'gray',
        width: 40,
        height: 40,
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