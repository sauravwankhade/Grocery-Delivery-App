import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from "react-native";
import { TextInput, Button, Checkbox, useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TermsAndConditionsModal from "./modal/TermsAndConditions";
import { helpData } from "./help";
import CustomButton from "../../components/Button/Button";
import ErrorMessage from "../../components/Error/ErrorMesssage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be Number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be no more than 16 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  agreedToTerms: Yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions and Privacy Policy'),
});

const SignUpScreen = ({ navigation }) => {

  //state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  //react native paper theme
  const theme = useTheme();
  const styles = createStyles(theme);

  // react hook form 
  const { control, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  // Get screen dimensions
  const { width, height } = Dimensions.get("window");
  const imageHeight = height * 0.3; // 30% of screen height

  const onSubmit = async (formData) => {
    try {
      await AsyncStorage.setItem('userCredentials', JSON.stringify(formData));
      console.log('User credentials saved:', formData);

      navigation.navigate("LoginPage")
    } catch (error) {
      console.error('Error saving user credentials:', error);
      alert('Failed to save user credentials. Please try again.');
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/signup/sign-up.png")}
              style={[styles.image, { width: width * 0.8, height: imageHeight }]}
            />
          </View>
          <View style={styles.formContainer}>

            <Text style={styles.subHeading}>Sign Up</Text>
            <Text style={styles.heading}>Enter Your Credentials to Continue</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.username}
                  style={styles.input}
                />
              )}
              name="username"
              defaultValue=""
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email}
                  style={styles.input}
                />
              )}
              name="email"
              defaultValue=""
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Phone Number"
                  mode="outlined"
                  keyboardType="numeric"
                  maxLength={10}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone}
                  style={styles.input}
                />
              )}
              name="phone"
              defaultValue=""
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={!passwordVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password}
                  style={styles.input}
                  right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                />
              )}
              name="password"
              defaultValue=""
            />
            {errors.password && <ErrorMessage message={errors.password.message} />
            }
            <View style={styles.checkboxContainer}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                    color="#6200ee" // Checkbox color
                  />
                )}
                name="agreedToTerms"
                defaultValue={false}
              />
              <Text style={styles.termsText}>
                By continuing you agree to our{" "}
                <Text style={styles.linkText} onPress={() => setTermsVisible(true)}>Terms and Conditions of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </View>
            {errors.agreedToTerms && (
              <Text style={styles.errorText}>{errors.agreedToTerms.message}</Text>
            )}

            <CustomButton onPress={handleSubmit(onSubmit)} label={"Sign Up"}></CustomButton>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {!!termsVisible && <TermsAndConditionsModal visible={termsVisible} onDismiss={() => setTermsVisible(false)} />}
    </>
  );
};

const createStyles = (theme) => StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    imageContainer: {
      flex: 3,
      paddingTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      // width: "100%",
      // height: undefined,
      // aspectRatio: 1,
      resizeMode: "contain",
    },
    formContainer: {
      flex: 7,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    input: {
      marginBottom: 5,
      fontFamily: "san"
    },
    textInputLabel: {
      fontFamily: "san-bold"
    },
    errorText: {
      fontFamily: 'san',
      color: theme.colors.error,
      marginBottom: 5,
      fontSize: 10
    },
    termsText: {
      fontFamily: 'san-medium',
      textAlign: "center",
      marginVertical: 10,
    },
    signUpButton: {
      marginTop: 15,
    },
    signUpButtonLabel: {
      fontFamily: 'san-bold',
      fontSize: 16,
      color: "#FFFFFF",
    },
    signInContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    signInText: {
      fontFamily: 'san',
      fontSize: 12,
      color: "black",
    },
    signInLink: {
      fontFamily: 'san-bold',
      color: theme.colors.primary,
      fontSize: 12,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    termsText: {
      flex: 1,
      fontFamily: "san",
      color: "black",
      fontSize: 10,
    },
    linkText: {
      fontFamily: "san-bold",
      color: theme.colors.primary,
    },
    heading: {
      fontFamily: 'san-medium',
      color: theme.colors.text,
      fontSize: 12,
      marginBottom: 2,
    },
    subHeading: {
      fontSize: 20,
      fontFamily: 'san-bold',
    },
  }
);

export default SignUpScreen;

