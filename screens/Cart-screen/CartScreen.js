import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from '../product-detail-page/action/cartSlice';
import EmptyCart from './component/EmptyCart';
import AddressFormModal from './component/AddressFormModal';
import OrderSuccessModal from './component/OrderSuccessScreen';

const CartScreen = ({ navigation }) => {

    //state
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSummaryModal, setSummaryModal] = useState(false);

    //slice 
    const dispatch = useDispatch();
    const { items, address } = useSelector((state) => state.cart);

    // Calculate totals
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    // Handlers
    const handleIncrement = (productId) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementQuantity(productId));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeItemFromCart(productId));
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.row}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item.cartId)}>
                    <Icon name="delete" size={24} color="#b0003a" />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemDetails}>
                Package Size: {item.packageSize} KG | ₹{item.price}/Item
            </Text>
            <View style={styles.row}>
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => handleDecrement(item.cartId)}>
                        <Icon name="remove" size={24} color="#fff" style={styles.quantityButton} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrement(item.cartId)}>
                        <Icon name="add" size={24} color="#fff" style={styles.quantityButton} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subTotalText}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
            </View>
        </View>
    );

    if (items.length === 0) {
        return <EmptyCart />
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.cartId.toString()}
                contentContainerStyle={styles.cartList}
            />

            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                {address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressLabel}>Shipping Address:</Text>
                        {/* Show only a shortened version of the address */}
                        <Text style={styles.addressText}>
                            {`${address.name}, ${address.city}, ${address.postalCode}`}
                        </Text>
                    </View>
                )}
                <View style={styles.summaryDetails}>
                    <Text style={styles.summaryText}>Total Products:</Text>
                    <Text style={styles.summaryValue}>{totalQuantity}</Text>
                </View>
                <View style={styles.summaryDetails}>
                    <Text style={styles.summaryText}>Total Price:</Text>
                    <Text style={styles.summaryValue}>₹{totalAmount}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => address === null ? setModalVisible(true) : setSummaryModal(true)}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>

            <AddressFormModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
            <OrderSuccessModal
                isVisible={isSummaryModal}
                onClose={() => setSummaryModal(false)}
                data={{
                    orderId: '12345',
                    items,
                    totalAmount,
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    cartItem: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    quantityButton: {
        backgroundColor: '#b0003a',
        padding: 5,
        borderRadius: 5,
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    subTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b0003a',
    },
    cartList: {
        paddingBottom: 80,
    },
    summaryCard: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addressContainer: {
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        padding: 5,
        borderRadius: 5,
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    addressText: {
        fontSize: 12,
        color: '#555',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    summaryDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    summaryText: {
        fontSize: 16,
        color: '#333',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },
    checkoutButton: {
        backgroundColor: '#b0003a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default CartScreen;
