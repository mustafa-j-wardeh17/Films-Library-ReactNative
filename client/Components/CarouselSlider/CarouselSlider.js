import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'; // Import Image from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CarouselSlider() {
    const navigation = useNavigation();
    var { width, height } = Dimensions.get('window');

    const arr = [1, 2, 3, 4]

    const handleClick = () => {
        navigation.navigate('Movie');
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.ListHeader}>
                <Text style={styles.TextStyle}>Trending</Text>
            </View>

        </View>
    );
}

const MovieCard = ({ handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick()}>
            <Image
                source={require('../../assets/snap.jpg')}
                style={styles.cardImage}
            />
        </TouchableWithoutFeedback>
    );
}

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
        fontSize: 18
    },
    cardImage: {
        width: '100%',
        height: 200,
    }
});
