import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Divider, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../login/action/loginSlice';
import { useDispatch } from 'react-redux';

const MenuScreen = () => {

    //slice
    const dispatch = useDispatch();

    //react native paper theme
    const theme = useTheme();

    const menuItems = [
        { title: 'My Profile', icon: 'person' },
        { title: 'My Orders', icon: 'shopping-bag' },
        { title: 'Cart', icon: 'shopping-cart' },
        { title: 'How it Works?', icon: 'help-outline' },
        { title: 'FAQs', icon: 'question-answer' },
        { title: 'Refer and Earn', icon: 'card-giftcard' },
        { title: 'Rate Us', icon: 'star-rate' },
        { title: 'Feedback/Suggestions', icon: 'feedback' },
        { title: 'Contact Us', icon: 'phone' },
        { title: 'About Us', icon: 'info' },
        { title: 'Terms and Conditions', icon: 'gavel' },
        { title: 'Privacy Policy', icon: 'privacy-tip' },
        { title: 'Logout', icon: 'logout' },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* User Info Section */}
            {/* <View style={styles.userInfo}>
                <Avatar.Image size={64} source={{ uri: 'https://placehold.co/60x40/orange/white?text=AP' }} />
                <List.Subheader style={styles.userName}>Abhishek Pandit</List.Subheader>
            </View> */}

            {/* Menu Sections */}
            <View style={styles.menuContainer}>
                <List.Section>
                    <List.Subheader style={styles.menuTitle}>Account</List.Subheader>
                    {menuItems.slice(0, 3).map((item, index) => (
                        <React.Fragment key={index}>
                            <List.Item
                                title={item.title}
                                left={() => <Icon name={item.icon} size={24} color={theme.colors.primary} />}
                                onPress={() => console.log(`${item.title} pressed`)}
                                titleStyle={{ fontSize: 14, fontFamily: 'san-medium', color: '#333' }}
                            />
                            <Divider />
                        </React.Fragment>
                    ))}
                </List.Section>

                <List.Section>
                    <List.Subheader style={styles.menuTitle}>Help & Info</List.Subheader>
                    {menuItems.slice(3, 9).map((item, index) => (
                        <React.Fragment key={index}>
                            <List.Item
                                title={item.title}
                                left={() => <Icon name={item.icon} size={24} color={theme.colors.primary} />}
                                onPress={() => console.log(`${item.title} pressed`)}
                                titleStyle={{ fontSize: 14, fontFamily: 'san-medium', color: '#333' }}
                            />
                            <Divider />
                        </React.Fragment>
                    ))}
                </List.Section>

                <List.Section>
                    <List.Subheader style={styles.menuTitle}>Legal</List.Subheader>
                    {menuItems.slice(9, 12).map((item, index) => (
                        <React.Fragment key={index}>
                            <List.Item
                                title={item.title}
                                left={() => <Icon name={item.icon} size={24} color={theme.colors.primary} />}
                                onPress={() => console.log(`${item.title} pressed`)}
                                titleStyle={{ fontSize: 14, fontFamily: 'san-medium', color: '#333' }}
                            />
                            <Divider />
                        </React.Fragment>
                    ))}
                </List.Section>

                <List.Section>
                    <List.Subheader style={styles.menuTitle}>Others</List.Subheader>
                    <List.Item
                        title="Logout"
                        left={() => <Icon name="logout" size={24} color="red" />}
                        titleStyle={{ color: 'red' }}
                        onPress={() => dispatch(logout())}
                    />
                </List.Section>
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    userInfo: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#6200ee',
    },
    userName: {
        marginTop: 10,
        fontSize: 14,
        color: '#fff',
    },
    menuContainer: {
        paddingHorizontal: 10,
    },
    menuTitle: {
        fontFamily: "san-bold"
    },
});

export default MenuScreen;
