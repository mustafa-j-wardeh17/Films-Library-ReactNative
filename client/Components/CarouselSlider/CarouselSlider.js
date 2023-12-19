import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MyCarousel = () => {
  const data = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 4' },
    { title: 'Item 5' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={300}
      layout="default"
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    height: 200,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 18,
  },
});

export default MyCarousel;
