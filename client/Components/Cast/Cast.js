import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';



const Cast = ({ casts }) => {
    const navigation = useNavigation();
    const handleSelectPerson = (person) => {
        navigation.navigate('Person',{person})
    }
    return (
        <View style={{marginVertical:hp(4)}}>
            <View style={{ marginLeft: wp(2) }}>
                <Text
                    style={{ fontSize: wp(5) ,color:'white'}} >
                    Top Cast
                </Text>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: wp(3), marginHorizontal: wp(4),marginVertical:hp(1.4) }}
            >
                {
                    casts?.map((cast) => (
                        <TouchableOpacity onPress={() => handleSelectPerson(cast)} key={cast._id} style={{ width: wp(25) ,alignItems:"center" }} className=''>
                            <View style={{ width: wp(20), height: wp(20) }} >
                                <Image source={{ uri: cast.image.url }} style={{ width: wp(20), height: wp(20),borderRadius:wp(50) }} resizeMode='cover' />
                            </View>
                            <Text numberOfLines={1} style={{textAlign:"center",color:"rgba(255,255,255,0.8)",fontSize:wp(2.7)}} >
                                {cast.name.length > 14 ? cast.name.slice(0, 12) + '...' : cast.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Cast
