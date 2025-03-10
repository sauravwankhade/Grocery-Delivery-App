import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // For the check icon
import { useNavigation, useTheme } from '@react-navigation/native';

const CartPopup = ({ showPopup, setShowPopup }) => {
    // Create an animated value for the popup position
    const slideAnim = useRef(new Animated.Value(400)).current; // Start off-screen below
    const navigation = useNavigation();

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    useEffect(() => {
        if (showPopup) {
            // Slide the popup up when showPopup becomes true
            Animated.timing(slideAnim, {
                toValue: 0, // Slide up into view
                duration: 300, // Animate over 300ms
                useNativeDriver: true,
            }).start();

            // Automatically hide the popup after 2 seconds and reset showPopup state
            setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: 400, // Slide back down off-screen
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setShowPopup(false); // Reset showPopup state after animation
                });
            }, 2000);
        }
    }, [showPopup, setShowPopup]);
    return (
        <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
            <FontAwesome name="check-circle" size={32} color="green" style={styles.icon} />
            <Text style={styles.addedText}>Added to cart</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('CardScreen')}>
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const createStyles = (theme) => StyleSheet.create({
    popup: {
        position: 'absolute',
        bottom: '14%',
        left: '10%',
        right: '10%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        // marginBottom: 10,
    },
    addedText: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'san-bold'
    },
    viewButton: {
        backgroundColor: '#853159',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'san-bold'
    },
});


export default CartPopup;
