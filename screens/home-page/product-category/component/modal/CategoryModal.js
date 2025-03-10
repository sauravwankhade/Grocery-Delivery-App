import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import CategoryModalSkeleton from '../skeleton/CategoryModalSkeleton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CategoryModal = ({ visible, onClose, category }) => {

    //state
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(visible);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Manage the visibility state with useFocusEffect
    useFocusEffect(
        React.useCallback(() => {
            if (visible) {
                setModalVisible(true);
            }
            const onBackPress = () => {
                if (modalVisible) {
                    setModalVisible(false);
                    return true;
                }
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [modalVisible, visible])
    );

    const handleProductClick = () => {
        const product = {
            id: '6-1',
            name: 'Orange Juice',
            price: 100,
            discountPrice: 90,
            image: ['https://img.freepik.com/free-photo/red-apple-isolated_74190-1286.jpg?t=st=1723093494~exp=1723097094~hmac=3249d5344bcbc890d6e5b29688b59d32e43b9beaf9665d9672a5d7aa41c59632&w=740', 'https://placehold.co/800x550', 'https://placehold.co/800x550', 'https://placehold.co/800x550'],
            bestseller: true,
            description: 'Freshly squeezed orange juice.',
            stock_quantity: '100kg',
        };
        setModalVisible(false);
        navigation.navigate('ProductScreen', { product });
    };

    const handleClose = () => {
        setModalVisible(false);
        onClose();
    };

    const renderProductCard = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => handleProductClick()}>
            {item.bestseller && (
                <View style={styles.bestsellerLabel}>
                    <Text style={styles.bestsellerText}>Bestseller</Text>
                </View>
            )}
            {/* <Image source={{ uri: item.image }} style={styles.productImage} /> */}
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="contain"  // equivalent to resizeMode
                transition={500}    // Optional: smooth transition when loading
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>₹{item.discountPrice}</Text>
                <Text style={styles.originalPrice}>₹{item.price}</Text>
                <Text style={styles.discountPercentage}>
                    {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% off
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal visible={modalVisible} onRequestClose={handleClose} transparent={false} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleClose} style={styles.headerIcon}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Category</Text>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="shopping-bag" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <FlatList
                        data={Array(10).fill({})}
                        renderItem={() => <CategoryModalSkeleton />}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.scrollViewContainer}
                    />
                ) : (
                    <FlatList
                        data={category}
                        renderItem={renderProductCard}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.scrollViewContainer}
                    />
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f5f5f5',
    },
    headerIcon: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'san-bold'
    },
    scrollViewContainer: {
        padding: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: '49.5%',
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        position: 'relative',
    },
    bestsellerLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: '#FF6347',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
        zIndex: 1,
    },
    bestsellerText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 120,
        // resizeMode: 'cover',
        //contain

    },
    productName: {
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: 'san-medium'
    },
    productDescription: {
        fontSize: 12,
        color: '#555',
        paddingHorizontal: 10,
        fontFamily: 'san'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    discountPrice: {
        fontSize: 16,
        color: '#FF6347',
        fontFamily: 'san-bold'
    },
    originalPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
        fontFamily: 'san'
    },
    discountPercentage: {
        fontSize: 14,
        color: '#FF6347',
        fontFamily: 'san'
    },
});

export default CategoryModal;
