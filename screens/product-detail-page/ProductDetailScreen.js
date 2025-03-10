import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductPageImageCarousel from './component/ProductPageImageCarousel';
import PackageSizeSelector from './component/PackageSizeSelector';
import { addToCart } from './action/cartSlice';
import ProductDescription from './component/ProductDescription';
import Footer from './component/Footer';  // Import the Footer component
import CartPopup from './component/CartPopup';
import { useTheme } from 'react-native-paper';

const ProductDetailScreen = ({ route, navigation }) => {

    //state
    const { product } = route.params;
    const [showFooter, setShowFooter] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFooter(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = () => {
        if (selectedPackage) {
            const cartItem = {
                productId: product.id,
                cartId: Date.now(),
                name: product.name,
                packageSize: selectedPackage.size,
                price: selectedPackage.price,
                quantity,
            };
            dispatch(addToCart(cartItem));
            setSelectedPackage(null);
            setQuantity(1);
            setShowPopup(true);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: showFooter ? 100 : 0 }}>
                <View style={styles.topContainer}>
                    <ProductPageImageCarousel images={product.image} bestseller={product.bestseller} discountPrice={Math.round(((product.price - product.discountPrice) / product.price) * 100)} />
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>{product.name}</Text>
                        <View style={styles.prizeContainer}>
                            <Text style={{ color: "#000", fontSize: 12 }}>Price: <Text style={styles.originalPrice}>₹{product.price}</Text></Text>
                            <Text style={styles.discountPrice}>₹{product.discountPrice}/kg</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.topContainer}>
                    <PackageSizeSelector selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />
                </View>
                <View>
                    <ProductDescription description={product.description}></ProductDescription>
                </View>
            </ScrollView>

            {!!showFooter && (
                <Footer
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                    selectedPackage={selectedPackage}
                />
            )}
            {!!showPopup && <CartPopup showPopup={showPopup} setShowPopup={setShowPopup} navigation={navigation} />}
        </View>
    );
};

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    topContainer: {
        flex: 1,
        borderBottomColor: '#fff',
        borderBottomWidth: 5,
    },
    headerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    header: {
        fontFamily: 'san-bold',
        fontSize: 18,
    },
    discountPrice: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'san-medium',
    },
    originalPrice: {
        fontSize: 12,
        color: '#8B0000',
        textDecorationLine: 'line-through',
        fontFamily: 'san',
    },
    prizeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export default ProductDetailScreen;
