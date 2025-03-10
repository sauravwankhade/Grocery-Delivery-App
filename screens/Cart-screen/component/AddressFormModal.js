import React from 'react';
import { View, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveAddress } from '../../product-detail-page/action/cartSlice';

const AddressFormModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();

    // Validation schema using Yup
    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^[0-9]{10}$/, 'Phone must be a valid 10-digit number'),
        addressLine1: Yup.string().required('Address Line 1 is required'),
        city: Yup.string().required('City is required'),
        postalCode: Yup.string()
            .required('Postal Code is required')
            .matches(/^[0-9]{6}$/, 'Postal Code must be a 6-digit number'),
    });

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit = (data) => {
        dispatch(saveAddress(data));
        reset();
        onClose();
    };

    return (
        <>
            {/* Conditionally hide the status bar when the modal is visible */}
            <StatusBar hidden={visible} />

            <Modal
                visible={visible}
                animationType="slide"
                transparent={false} // Set transparent to false to cover the entire screen
                onRequestClose={onClose}
            >
                <KeyboardAvoidingView
                    style={styles.modalContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Handle platform-specific behavior
                >
                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <Text style={styles.title}>Enter Shipping Address</Text>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Name"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.name}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Phone"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="phone-pad"
                                    error={!!errors.phone}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

                        <Controller
                            control={control}
                            name="addressLine1"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Address Line 1"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.addressLine1}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.addressLine1 && (
                            <Text style={styles.errorText}>{errors.addressLine1.message}</Text>
                        )}

                        <Controller
                            control={control}
                            name="city"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="City"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.city}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}

                        <Controller
                            control={control}
                            name="postalCode"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Postal Code"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="number-pad"
                                    error={!!errors.postalCode}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.postalCode && (
                            <Text style={styles.errorText}>{errors.postalCode.message}</Text>
                        )}

                        <Button
                            mode="contained"
                            onPress={handleSubmit(onSubmit)}
                            style={styles.submitButton}
                        >
                            Save Address
                        </Button>
                        <Button
                            mode="text"
                            onPress={onClose}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1, // Take up the full height
        justifyContent: 'flex-start', // Align the content at the top
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
    },
    formContainer: {
        flexGrow: 1, // Allow the form to take full screen
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    submitButton: {
        marginTop: 20,
    },
    cancelButton: {
        marginTop: 10,
    },
});

export default AddressFormModal;
