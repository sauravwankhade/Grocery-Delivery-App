import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Badge, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommonHeader = ({ navigation, title }) => {

    //slice
    const { items } = useSelector((state) => state.cart);

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                <Icon name="arrow-back" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('CardScreen')}>
                <Ionicons name="cart" style={styles.icon} />
                {items.length > 0 && <Badge style={styles.badge}>{items.length}</Badge>}
            </TouchableOpacity>
        </View>
    );
};

const createStyles = (theme) => StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 25
    },
    iconContainer: {
        padding: 5,
        position: 'relative',
    },
    title: {
        fontSize: 18,
        fontFamily: 'san-bold',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: 'red',
        color: 'white',
    },
    icon: {
        color: theme.colors.primary,
        fontSize: 24,
    },
});

export default CommonHeader;
