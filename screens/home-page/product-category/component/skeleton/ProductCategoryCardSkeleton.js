import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet } from 'react-native';

const ProductCategoryCardSkeleton = () => {
    return (
        <View style={styles.container}>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={140}
                viewBox="0 0 150 140"
                backgroundColor="#e0e0e0"
                foregroundColor="#d3d3d3"
            >
                <Rect x="0" y="0" rx="5" ry="5" width="150" height="150" />
            </ContentLoader>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
    },
});

export default ProductCategoryCardSkeleton;
