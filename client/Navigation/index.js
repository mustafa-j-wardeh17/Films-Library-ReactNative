import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home';
import Movie from '../Screens/Movie';
import Person from '../Screens/Person';
import SearchScreen from '../Screens/SearchScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Movie" component={Movie} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen} />
                    <Stack.Screen name="Person" component={Person} />
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
