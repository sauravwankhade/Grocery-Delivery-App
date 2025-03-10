import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar, Button, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const VerifyOTPPage = ({ navigation }) => {
    const [timer, setTimer] = useState(30);
    const theme = useTheme();
    const styles = createStyles(theme);
    // Timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    return prevTimer;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Validation schema
    const schema = yup.object().shape({
        otp: yup
            .string()
            .length(6, 'OTP must be exactly 6 digits')
            .matches(/^\d+$/, 'OTP must be a number')
            .required('OTP is required'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: '',
        },
    });


    const otpRefs = useRef([]);


    const onSubmit = data => {
        console.log(data);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Sign In" />
                </Appbar.Header>
                <View style={styles.content}>
                    <Text style={[theme.components.Title, styles.title]}>Verify Phone Number</Text>
                    <Text style={[theme.components.subtitle, styles.subtitle]}>An SMS with a 6-digit OTP was sent to</Text>
                    <Text style={styles.number}>
                        +91 7977180400
                        <Text style={styles.change}> Change</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.otpContainer}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) => otpRefs.current[index] = ref}
                                        style={styles.otpInput}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            const newOtp = value ? value.split('') : [];
                                            if (text === '' && index > 0) {
                                                otpRefs.current[index - 1].focus();
                                                newOtp[index - 1] = ''; // Clear previous box
                                            } else {
                                                newOtp[index] = text;
                                                if (text && index < 5) {
                                                    otpRefs.current[index + 1].focus();
                                                }
                                            }
                                            onChange(newOtp.join(''));
                                        }}
                                        value={value ? value[index] : ''}
                                    />
                                ))}
                            </View>
                        )}
                    />
                    {errors.otp && <Text style={styles.error}>{errors.otp.message}</Text>}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timer}>Waiting for OTP... {timer} seconds</Text>
                    </View>
                    <Button mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        labelStyle={styles.verifyButtonLabel}
                        style={styles.submitButton}
                        rippleColor="#9C4DFF"
                    >
                        Verify
                    </Button>
                </View>
            </View>
        </ScrollView>

    );
};

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 7,
    },
    subtitle: {
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    change: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: theme.colors.skyblue
    },
    number: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderColor: theme.colors.text,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    error: {
        color: theme.colors.error,
        marginBottom: 10,
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    timer: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '600',
    },
    verifyButtonLabel: {
        fontFamily: 'san-bold',
        fontSize: 16,
        color: "#FFFFFF",
    },
    submitButton: {
        marginTop: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
        fontSize: 16,
        fontWeight: 700

    },
});


export default VerifyOTPPage;
