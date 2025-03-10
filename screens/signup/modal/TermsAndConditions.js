import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Modal, IconButton, useTheme } from "react-native-paper";

const TermsAndConditionsModal = ({ visible, onDismiss }) => {
    const theme = useTheme();
    const styles = createModalStyles(theme);

    return (
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Terms and Conditions</Text>
                <IconButton icon="close" onPress={onDismiss} />
            </View>
            <ScrollView>
                <Text style={styles.sectionTitle}>Introduction</Text>
                <Text style={styles.sectionDescription}>
                    Welcome to Chakki Fresh Aata, your trusted provider of high-quality wheat and flour services. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
                </Text>
                <Text style={styles.sectionTitle}>Products and Services</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Wheat Sales</Text>: We offer premium wheat for sale in various quantities. All products are subject to availability and may be discontinued at any time.{"\n"}
                    - <Text style={styles.boldText}>Flour Services</Text>: We provide flour milling services to convert your wheat into flour. Our services are conducted with the highest standards to ensure product quality.
                </Text>
                <Text style={styles.sectionTitle}>Orders and Payments</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Order Placement</Text>: Orders can be placed through our website or customer service. Once an order is placed, it is considered final.{"\n"}
                    - <Text style={styles.boldText}>Pricing</Text>: All prices are listed on our website and are subject to change without notice. Prices include applicable taxes but exclude delivery charges, which will be added to your total amount.{"\n"}
                    - <Text style={styles.boldText}>Payments</Text>: We accept various payment methods, including credit/debit cards and online payment gateways. Payment must be made in full at the time of order placement.
                </Text>
                <Text style={styles.sectionTitle}>Shipping and Delivery</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Shipping Policy</Text>: We aim to process and ship orders promptly. Delivery times may vary based on location and product availability.{"\n"}
                    - <Text style={styles.boldText}>Delivery Charges</Text>: Delivery charges will be calculated at checkout based on the delivery address and order weight.{"\n"}
                    - <Text style={styles.boldText}>Risk of Loss</Text>: All purchases are made pursuant to a shipment contract. Risk of loss and title for items pass to you upon our delivery to the carrier.
                </Text>
                <Text style={styles.sectionTitle}>Returns and Refunds</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Returns</Text>: Due to the perishable nature of our products, we do not accept returns.{"\n"}
                    - <Text style={styles.boldText}>Refunds</Text>: If you receive a defective or incorrect product, please contact us within 24 hours of receipt. We will review your request and, if approved, issue a refund or replacement.
                </Text>
                <Text style={styles.sectionTitle}>User Responsibilities</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Account Information</Text>: You are responsible for maintaining the confidentiality of your account information and for all activities under your account.{"\n"}
                    - <Text style={styles.boldText}>Prohibited Conduct</Text>: You agree not to use our services for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.
                </Text>
                <Text style={styles.sectionTitle}>Privacy Policy</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Data Collection</Text>: We collect personal information necessary to process your orders and improve our services.{"\n"}
                    - <Text style={styles.boldText}>Data Use</Text>: Your information will not be shared with third parties without your consent, except as required by law.
                </Text>
                <Text style={styles.sectionTitle}>Intellectual Property</Text>
                <Text style={styles.sectionDescription}>
                    - <Text style={styles.boldText}>Trademarks</Text>: All trademarks, logos, and service marks displayed on our website are our property or the property of other third parties.{"\n"}
                    - <Text style={styles.boldText}>Copyright</Text>: All content on our website, including text, graphics, and images, is protected by copyright laws.
                </Text>
                <Text style={styles.sectionTitle}>Limitation of Liability</Text>
                <Text style={styles.sectionDescription}>
                    We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the amount paid for the product or service in question.
                </Text>
                <Text style={styles.sectionTitle}>Changes to Terms and Conditions</Text>
                <Text style={styles.sectionDescription}>
                    We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the revised terms.
                </Text>
                <Text style={styles.sectionTitle}>Governing Law</Text>
                <Text style={styles.sectionDescription}>
                    These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be resolved in the courts of India.
                </Text>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <Text style={styles.sectionDescription}>
                    If you have any questions or concerns about these terms and conditions, please contact us at [Your Contact Information].
                </Text>
                <Text style={styles.sectionDescription}>
                    Thank you for choosing Chakki Fresh Aata for your wheat and flour needs. We appreciate your business and strive to provide you with the best products and services.
                </Text>
            </ScrollView>
        </Modal>
    );
};

const createModalStyles = (theme) => StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 15,
        margin: 15,
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'san-bold',
        fontSize: 18,
    },
    sectionTitle: {
        fontFamily: 'san-bold',
        fontSize: 16,
        marginVertical: 10,
    },
    sectionDescription: {
        fontFamily: 'san',
        fontSize: 14,
        marginBottom: 10,
        color: theme.colors.text,
    },
    boldText: {
        fontFamily: 'san-bold',
    },
});

export default TermsAndConditionsModal;
