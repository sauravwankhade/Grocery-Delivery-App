import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ProductPageImageCarousel = ({ images, bestseller, discountPrice }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.carouselWrapper}>
      {discountPrice && (
        <View style={styles.bestsellerLabel}>
          <Text style={styles.labelText}>{discountPrice}% off</Text>
        </View>
      )}
      <Carousel
        loop
        width={width - 20}
        height={250}
        autoPlay={true}
        autoPlayInterval={4000}
        onSnapToItem={(index) => setActiveIndex(index)}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.productImage} />
          </View>
        )}
      />
      <View style={styles.paginationWrapper}>
        {images.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            return {
              transform: [
                { scale: withSpring(activeIndex === index ? 1.2 : 1) },
              ],
              opacity: withSpring(activeIndex === index ? 1 : 0.5),
            };
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                animatedDotStyle,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ProductPageImageCarousel;

const styles = StyleSheet.create({
  carouselWrapper: {
    position: 'relative',
    height: 250,
    // marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 5
  },
  paginationDot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  bestsellerLabel: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#FFE48E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    zIndex: 1,
  },
  labelText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'san-bold'
  },
});
