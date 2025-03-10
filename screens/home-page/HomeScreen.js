import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import ImageCarousel from './image-swipe/ImageCarousel';
import ProductCategory from './product-category/ProductCategory';
import Coupon from './coupon/Coupon';
import QuickLink from './quick-link/QuickLink';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
    const theme = useTheme();
    const [showCoupon, setShowCoupon] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCoupon(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={['#F3E7E9', '#E3FDF5']}
            style={styles.gradient}
        >
            <ScrollView style={styles.container}>
                <ImageCarousel />
                <QuickLink />
                {showCoupon && <Coupon />}
                <ProductCategory />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});
