import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderSuccessModal = ({ data, isVisible, onClose }) => {
    const { orderId, items, totalAmount } = data;

    const navigation = useNavigation();

    // Calculate total quantity
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Icon name="check-circle" size={120} color="#4caf50" />
                </View>

                {/* Success Message */}
                <Text style={styles.successText}>Order Successful!</Text>

                {/* Order Details */}
                <View style={styles.orderDetails}>
                    <Text style={styles.orderId}>Order ID: {orderId}</Text>
                    <Text style={styles.orderSummary}>You have {totalQuantity} items in your order.</Text>

                    {/* Items List */}
                    <View style={styles.itemsContainer}>
                        {items.map((item, index) => (
                            <View key={index} style={styles.itemDetail}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                                <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Total Amount */}
                    <View style={styles.totalAmount}>
                        <Text style={styles.totalText}>Total Amount: ₹{totalAmount}</Text>
                    </View>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {
                        onClose();
                        navigation.navigate('Main'); // Navigate to Home or any other screen
                    }}
                >
                    <Text style={styles.continueButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    iconContainer: {
        backgroundColor: '#e8f5e9',
        borderRadius: 50,
        padding: 25,
        marginBottom: 30,
    },
    successText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
    },
    orderDetails: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        elevation: 5,
        width: '90%',
        maxWidth: 400,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    orderSummary: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    itemsContainer: {
        marginBottom: 20,
    },
    itemDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        maxWidth: 180,
    },
    itemQuantity: {
        fontSize: 16,
        color: '#888',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b0003a',
    },
    totalAmount: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 15,
        marginTop: 25,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    continueButton: {
        backgroundColor: '#b0003a',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 35,
        elevation: 5,
    },
    continueButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderSuccessModal;
