import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const QuickLinkSkeleton = () => {
    const screenWidth = Dimensions.get('window').width * 0.8;

    return (
        <View style={styles.cardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[...Array(3)].map((_, index) => (
                    <ContentLoader
                        key={index}
                        width={screenWidth}
                        height={80}
                        viewBox={`0 0 ${screenWidth} 70`}
                        backgroundColor="#e0e0e0"
                        foregroundColor="#f0f0f0"
                        style={styles.quickLinkContainer}
                    >
                        <Rect x="0" y="0" rx="10" ry="10" width={screenWidth} height="70" />
                    </ContentLoader>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    quickLinkContainer: {
        marginRight: 10,
    },
});

export default QuickLinkSkeleton;
