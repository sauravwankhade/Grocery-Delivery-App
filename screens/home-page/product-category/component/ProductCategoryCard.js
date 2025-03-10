import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { background_categories } from '../helper';
import { useNavigation } from '@react-navigation/native';

const ProductCategoryCard = ({ image, name, index, products }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity style={[styles.cardContainer, background_categories[index]]} activeOpacity={0.7} onPress={() => navigation.navigate('CategoryScreen', { category: products, title: name })} >
        <Image source={image} style={[styles.productImage]} />
        <Text style={styles.productText}>{name}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    shadowRadius: 10,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // elevation: 1
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: "san-bold",
    fontSize: 12
  },
});

export default ProductCategoryCard;
