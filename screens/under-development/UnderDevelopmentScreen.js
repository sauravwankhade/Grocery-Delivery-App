import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const UnderDevelopmentScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/under_development/under_develop.png')}
                style={styles.image}
            />
            <Text style={styles.title}>We're Working on It!</Text>
            <Text style={styles.subtitle}>
                This feature is currently under development. Stay tuned for updates!
            </Text>
        </View>
    );
};

export default UnderDevelopmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light gray background
        paddingHorizontal: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: "san-bold"
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: "san"
    },
    button: {
        backgroundColor: '#6200ee',
    },
});
