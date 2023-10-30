import { View, Text, SafeAreaView, Touchable, TouchableOpacity, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ArrowSmallLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'react-native-svg';
import MovieList from '../Components/MovieList/MovieList';
import Cast from '../Components/Cast/Cast';
const { width, height } = Dimensions.get('window');

const Person = () => {
  const Location = 'London, United Kingdom'
  const Name = 'Keanu Reeves'
  const navigation = useNavigation()
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ position: 'relative' }}>
      <View style={{ flex: 1 ,marginTop:30}}>
        <View style={{ position: 'absolute', zIndex: 99, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'transparent', top: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 8, backgroundColor: 'orange',zIndex:10 }}>
            <ArrowSmallLeftIcon size={30} color='white' strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={styles.PesronContainer}>
          <Image source={require('../assets/character.jpg')} style={styles.CharacterImage} />
          <View style={styles.characterName}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>{Name}</Text>
            <Text style={{ color: 'gray', fontWeight: '400', fontSize: 16 }}>{Location}</Text>
          </View>
          <View style={styles.details}>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Gender</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>Male</Text>
            </View>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Birthday</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>Male</Text>
            </View>
            <View style={{ borderRightColor: 'gray', width: width * 0.22, borderRightWidth: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Known for</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>Male</Text>
            </View>
            <View style={{ width: width * 0.22 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Popularity</Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>Male</Text>
            </View>
          </View>
        </View>

        <View style={styles.biography}>
          <Text style={{ fontSize: 20, color: 'white' }}>Biography</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et hendrerit elit, pulvinar ullamcorper metus. Ut molestie est purus, in suscipit nisl porttitor ac. Pellentesque varius eget magna sit amet blandit. Nulla facilisi. Ut velit orci, tincidunt ac sem vel, hendrerit scelerisque ligula. Integer vestibulum volutpat dignissim. Mauris vitae diam a lectus dapibus tempor ut eget velit. Cras semper tincidunt nisi at facilisis,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et hendrerit elit, pulvinar ullamcorper metus. Ut molestie est purus, in suscipit nisl porttitor ac. Pellentesque varius eget magna sit amet blandit. Nulla facilisi. Ut velit orci, tincidunt ac sem vel, hendrerit scelerisque ligula. Integer vestibulum volutpat dignissim. Mauris vitae diam a lectus dapibus tempor ut eget velit. Cras semper tincidunt nisi at facilisis,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et hendrerit elit, pulvinar ullamcorper metus. Ut molestie est purus, in suscipit nisl porttitor ac. Pellentesque varius eget magna sit amet blandit. Nulla facilisi. Ut velit orci, tincidunt ac sem vel, hendrerit scelerisque ligula. Integer vestibulum volutpat dignissim. Mauris vitae diam a lectus dapibus tempor ut eget velit. Cras semper tincidunt nisi at facilisisLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et hendrerit elit, pulvinar ullamcorper metus. Ut molestie est purus, in suscipit nisl porttitor ac. Pellentesque varius eget magna sit amet blandit. Nulla facilisi. Ut velit orci, tincidunt ac sem vel, hendrerit scelerisque ligula. Integer vestibulum volutpat dignissim. Mauris vitae diam a lectus dapibus tempor ut eget velit. Cras semper tincidunt nisi at facilisisLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et hendrerit elit, pulvinar ullamcorper metus. Ut molestie est purus, in suscipit nisl porttitor ac. Pellentesque varius eget magna sit amet blandit. Nulla facilisi. Ut velit orci, tincidunt ac sem vel, hendrerit scelerisque ligula. Integer vestibulum volutpat dignissim. Mauris vitae diam a lectus dapibus tempor ut eget velit. Cras semper tincidunt nisi at facilis16</Text>
        </View>
        <MovieList title='Films' seeAll={true} />
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
  CharacterImage: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: 1000,
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