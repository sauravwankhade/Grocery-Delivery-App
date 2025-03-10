import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const CustomButton = ({ onPress, label }) => {

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Button
            mode="contained"
            onPress={onPress}
            style={styles.signUpButton}
            labelStyle={styles.signUpButtonLabel}
            rippleColor='#9d5a7a'
        >
            {label}
        </Button>
    );
};

export default CustomButton;

const createStyles = (theme) => StyleSheet.create({
    signUpButton: {
        marginTop: 15,
        backgroundColor: theme.colors.primary,
    },
    signUpButtonLabel: {
        fontFamily: 'san-bold',
        fontSize: 16,
        color: "#FFFFFF",
    },
});