import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const Footer = ({ quantity, setQuantity, handleAddToCart, selectedPackage }) => {

    // Calculate the total price dynamically
    const totalPrice = selectedPackage ? selectedPackage.price * quantity : 0;

    // animated
    const slideAnim = useRef(new Animated.Value(200)).current;

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    return (
        <Animated.View style={[styles.footer, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity</Text>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        style={styles.minusButton}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="minus" size={18} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity + 1)}
                        style={styles.plusButton}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="plus" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.addToCart,
                    !selectedPackage && styles.disabledAddToCart
                ]}
                onPress={handleAddToCart}
                disabled={!selectedPackage}
            >
                <Text style={styles.addToCartText}>
                    {selectedPackage ? `Add to Cart, ₹${totalPrice.toFixed(0)}` : 'Add to Cart, ₹0'}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const createStyles = (theme) => StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    quantityContainer: {
        flexDirection: 'column',
        alignItems: 'start',
    },
    quantityLabel: {
        fontSize: 12,
        fontFamily: 'san-medium',
        marginLeft: 5

    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
    },
    minusButton: {
        backgroundColor: '#F38080',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
    },
    plusButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    },
    quantityText: {
        fontSize: 14,
        color: '#000',
        paddingHorizontal: 12,
        paddingVertical: 0,
        borderWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        fontFamily: 'san-bold'
    },
    addToCart: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    addToCartText: {
        fontFamily: 'san-bold',
        color: 'white',
        fontSize: 14,
    },
    disabledAddToCart: {
        backgroundColor: '#ccc',
    },
});

export default Footer;
