import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
    errorText: {
        fontFamily: 'san',
        color: 'red',
        marginBottom: 5,
        fontSize: 10
    },
});

export default ErrorMessage;
