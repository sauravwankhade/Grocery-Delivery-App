import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width * 0.48;

const CategoryModalSkeleton = () => (
    <ContentLoader
        height={200}
        width={screenWidth}
        speed={2}
        viewBox={`0 0 ${screenWidth} 200`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={styles.card}
    >
        <Rect x="0" y="0" rx="10" ry="10" width={screenWidth} height="200" />
    </ContentLoader>
);

const styles = StyleSheet.create({
    card: {
        marginBottom: 5
    },
});

export default CategoryModalSkeleton;
