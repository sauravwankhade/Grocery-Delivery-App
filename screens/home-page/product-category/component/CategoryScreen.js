import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import CategoryModalSkeleton from './skeleton/CategoryModalSkeleton';
import { product } from '../helper';

const CategoryScreen = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const { category } = route.params;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const renderProductCard = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => navigation.navigate('ProductScreen', { product: product, title: product.name })}>
            {item.bestseller && (
                <View style={styles.bestsellerLabel}>
                    <Text style={styles.bestsellerText}>Bestseller</Text>
                </View>
            )}
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="contain"
                transition={500}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>₹{item.discountPrice}</Text>
                <Text style={styles.originalPrice}>₹{item.price}</Text>
                <Text style={styles.discountPercentage}>
                    {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% off
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {isLoading ? (
                <FlatList
                    data={Array(10).fill({})}
                    renderItem={() => <CategoryModalSkeleton />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.scrollViewContainer}
                />
            ) : (
                <FlatList
                    data={category}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.scrollViewContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContainer: {
        padding: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: '49.5%',
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        position: 'relative',
    },
    bestsellerLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: '#FF6347',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
        zIndex: 1,
    },
    bestsellerText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 120,
    },
    productName: {
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: 'san-medium'
    },
    productDescription: {
        fontSize: 12,
        color: '#555',
        paddingHorizontal: 10,
        fontFamily: 'san'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    discountPrice: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'san-bold'
    },
    originalPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
        fontFamily: 'san'
    },
    discountPercentage: {
        fontSize: 14,
        color: '#FF6347',
        fontFamily: 'san'
    },
});

export default CategoryScreen;
