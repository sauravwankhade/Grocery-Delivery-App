import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const Coupon = () => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.5)); // Start from half the size

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    const screenWidth = Dimensions.get('window').width;
    const aspectRatio = 2.2;

    return (
        <View style={[styles.container, { width: screenWidth, height: screenWidth / aspectRatio }]}>
            <Animated.Image
                source={require('../../../assets/homepage/coupon/coupon.png')}
                style={[
                    styles.couponImage,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    couponImage: {
        width: '100%',
        height: '100%',
    },
});

export default Coupon;
