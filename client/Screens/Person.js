import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ArrowSmallLeftIcon } from 'react-native-heroicons/solid'
import MovieList from '../Components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';

const Person = () => {
  const route = useRoute()
  const person = route.params.person
  const [relatedMovies, setRelatedMovies] = useState([])
  const [loader, setLoader] = useState(true)
  const navigation = useNavigation()
  useEffect(() => {
    fetchCastsAndRelated()
  }, [person])

  const fetchCastsAndRelated = async () => {
    try {
      setLoader(true)
      const related = await axios.get(`http://192.168.137.1:3011/movie/getRelatedMovies?relatedMovies=${person.movies}`)
      setRelatedMovies(related.data)
      setLoader(false)
    }
    catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ position: 'relative' }}>
      {
        loader
          ? (
            <View style={{ width: wp(100), height: hp(100), alignItems: 'center', justifyContent: "center" }}>
              <Loader />
            </View>
          )
          : (
            <View style={{ flex: 1 }}>
              <View style={{ position: 'absolute', zIndex: 99, padding: 10,marginTop:hp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'transparent', top: 0 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: wp(2), padding:5,backgroundColor: 'orange', zIndex: 10 }}>
                  <ArrowSmallLeftIcon size={wp(6)} color='white' strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <View style={styles.PesronContainer} >
                <View >
                  <Image source={{ uri: person.image.url }} style={{ width: wp(100), aspectRatio: '9/12', borderBottomLeftRadius: wp(8), borderBottomRightRadius: wp(8) }} />
                </View>
                <View style={styles.characterName}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>{person?.name}</Text>
                  <Text style={{ color: 'gray', fontWeight: '400', fontSize: 16 }}>Location</Text>
                </View>
                <View style={styles.details} className='shadow-xl'>
                  <View style={{ borderRightColor: 'gray', width: wp(22), borderRightWidth: 2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Gender</Text>
                    <Text style={{ textAlign: 'center', color: 'gray' }}>{person?.gender}</Text>
                  </View>
                  <View style={{ borderRightColor: 'gray', width: wp(22), borderRightWidth: 2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Birthday</Text>
                    <Text style={{ textAlign: 'center', color: 'gray' }}>25-9-1980</Text>
                  </View>
                  <View style={{ borderRightColor: 'gray', width: wp(22), borderRightWidth: 2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Known for</Text>
                    <Text style={{ textAlign: 'center', color: 'gray' }}>{person?.knownAt}</Text>
                  </View>
                  <View style={{ width: wp(22) }}>
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
                <MovieList seeAll={true} data={relatedMovies} category={person.knownAt} />

              </View>
            </View>
          )
      }
    </ScrollView>
  )
}

export default Person

const styles = StyleSheet.create({
  PesronContainer: {
    alignItems: 'center',
    gap: 10,
  },
  characterName: {
    alignItems: 'center',
  },
  details: {
    marginTop: 20,
    width: wp(94),
    height: hp(8),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  biography: {
    marginVertical: 40,
    marginHorizontal: 20,
    gap: 20
  }

})