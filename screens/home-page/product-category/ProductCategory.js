import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import ProductCategoryCard from './component/ProductCategoryCard';
import { categories } from './helper';
import ProductCategoryCardSkeleton from './component/skeleton/ProductCategoryCardSkeleton';

const ProductCategory = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading && <Text style={styles.title}>Choose a categories</Text>}
            <View style={styles.grid}>
                {isLoading
                    ? Array.from({ length: categories.length }).map((_, index) => (
                        <View key={index} style={styles.item}>
                            <ProductCategoryCardSkeleton />
                        </View>
                    ))
                    : categories?.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <ProductCategoryCard
                                image={item.image}
                                name={item.name}
                                index={index + 1}
                                products={item.products}
                            />
                        </View>
                    ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f0f0f0',
        padding: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    item: {
        flexBasis: '45%', // This makes each item take up roughly half the width, minus margins
        marginBottom: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'san-bold'
    }
});

export default ProductCategory;
