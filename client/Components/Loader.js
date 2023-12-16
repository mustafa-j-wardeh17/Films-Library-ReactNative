import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loader = () => {
    return (
        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default Loader