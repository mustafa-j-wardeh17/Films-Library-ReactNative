import { View, Text, SafeAreaView, Touchable, TouchableOpacity, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ArrowSmallLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'react-native-svg';
import MovieList from '../Components/MovieList/MovieList';
import Cast from '../Components/Cast/Cast';
import { useSelector } from 'react-redux';
import { urlFor } from '../Sanity';
const { width, height } = Dimensions.get('window');

const Person = () => {


  const navigation = useNavigation()
  const person = useSelector(state => state.movie.selectedPerson)

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ position: 'relative' }}>
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={{ position: 'absolute', zIndex: 99, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'transparent', top: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 8, backgroundColor: 'orange', zIndex: 10 }}>
            <ArrowSmallLeftIcon size={30} color='white' strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={styles.PesronContainer} >
          <View className='items-center justify-center rounded-full  shadow-2xl shadow-white/95 ' >
            <Image source={{ uri: urlFor(person.image).url() }} className='h-[200px] w-[200px] rounded-full  ' />
          </View>
          <View style={styles.characterName}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>{person?.name}</Text>
            <Text style={{ color: 'gray', fontWeight: '400', fontSize: 16 }}>Location</Text>
          </View>
          <View style={styles.details} className='shadow-xl'>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Gender</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>{person?.gender}</Text>
            </View>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Birthday</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>25-9-1980</Text>
            </View>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Known for</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>{person?.type}</Text>
            </View>
            <View style={{ width: width * 0.22 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Popularity</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>{person?.popularity}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.biography}>
          <Text style={{ fontSize: 20, color: 'white' }}>Biography</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>
            Fusce leo ante, tristique ac sagittis et, rhoncus accumsan libero. Maecenas at metus ullamcorper tortor ultricies bibendum nec quis nisi. Aenean quis velit sed metus ullamcorper auctor eu efficitur orci. Vivamus fringilla sagittis arcu nec iaculis. Etiam vel orci efficitur, sollicitudin magna ac, accumsan sem. Sed cursus, metus nec efficitur condimentum, nulla mauris bibendum diam, et tincidunt enim libero vitae lacus. Etiam sed ultricies nulla.
          </Text>
        </View>
        <View className='w-full'>
          <MovieList seeAll={true} data={person} />

        </View>
      </View>
    </ScrollView>
  )
}

export default Person

const styles = StyleSheet.create({
  PesronContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
    gap: 10,
  },
  characterName: {
    alignItems: 'center',
  },
  details: {
    marginTop: 20,
    width: width * 0.9,
    height: height * 0.08,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: width * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  biography: {
    marginTop: 40,
    marginHorizontal: 20,
    gap: 20
  }

})