import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardHeader = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Card</Text>
            {/* Empty view for balancing the layout */}
            <View style={styles.iconPlaceholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 25,
    },
    iconContainer: {
        flex: 1,
    },
    title: {
        flex: 2,
        fontSize: 18,
        fontFamily: 'san-bold',
        textAlign: 'center',
    },
    iconPlaceholder: {
        flex: 1,
    },
});

export default CardHeader;
