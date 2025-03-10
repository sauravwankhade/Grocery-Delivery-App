import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const CartIconWithBadge = () => {
    const { items } = useSelector((state) => state.cart);

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <Ionicons name="cart" style={styles.icon} />
            {items.length > 0 && (
                <Badge
                    size={18}
                    style={{
                        position: 'absolute',
                        top: -10,
                        right: -8,
                        backgroundColor: 'red',
                    }}
                >
                    {items.length}
                </Badge>
            )}
        </View>
    );
};

export default CartIconWithBadge;

const createStyles = (theme) => StyleSheet.create({
    container: {
        // width: 24,
        // height: 25,
        // margin: 5,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderRadius: 5
    },
    icon: {
        color: theme.colors.primary,
        fontSize: 24
    },
});
