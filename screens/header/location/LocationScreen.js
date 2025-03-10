import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { TextInput, Button, useTheme, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { generalUpdate, reSetState, setLocation } from './locationSlice';

// Dummy data with pincode and corresponding cities
const dummyData = [
  { pin: 123456, city: ["ulwe", "navi mumbai", "seawoods", "nerul", "juinagar", "belapur", "kharghar", "panvel", "kamothe", "kalamboli"] },
  { pin: 123496, city: ["kharghar", "belapur", "CBD Belapur", "sanpada", "vashi", "ghansoli", "airoli", "koparkhairane", "turbe"] },
  { pin: 123497, city: ["panvel", "kamothe", "kalamboli", "khandeshwar", "new panvel", "taloja", "sukapur", "chirle", "palaspe", "matheran"] },
];

// Validation schema for pincode using Yup
const schema = Yup.object().shape({
  pin: Yup.string()
    .required('Pincode is required')
    .length(6, 'Pincode must be exactly 6 digits')
    .matches(/^[0-9]+$/, 'Pincode must be numeric')
});

const LocationScreen = ({ navigation }) => {

  //state 
  const [showButtonAndText, setShowButtonAndText] = useState('');

  //react-hook-form
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    // resolver: yupResolver(schema),
    // mode: 'onBlur',
    // reValidateMode: 'onBlur'
  });

  const theme = useTheme(); // Access theme for styling
  const styles = createStyles(theme);

  // Redux dispatch
  const dispatch = useDispatch();

  // Access location state from Redux
  const locationState = useSelector((state) => state.location);
  const textInputRef = useRef(null);

  const pinValue = watch('pin'); // Watch pin field for changes

  // Effect to handle pincode validation and location setting
  useEffect(() => {
    if (pinValue?.length === 6) {
      const foundLocation = dummyData.find(data => data.pin.toString() === pinValue);
      if (foundLocation) {
        dispatch(setLocation({
          pin: pinValue,
          city: foundLocation.city,
          validPin: true,
          message: 'Awesome! We deliver to this pincode. To serve you better, please select the locality closest to you from the list below.'
        }));
      } else {
        dispatch(setLocation({
          pin: pinValue,
          city: [],
          validPin: false,
          message: 'Sorry, we do not deliver to this pincode.'
        }));
      }
    }
    else {
      dispatch(generalUpdate({ field: 'message', value: "" }));
      if (!locationState.city || pinValue?.length < 6) dispatch(generalUpdate({ field: 'city', value: [] }));
    }
  }, [pinValue, dispatch]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    // Cleanup the event listener
    return () => backHandler.remove();
  }, [showButtonAndText]);

  useEffect(() => {
    if (locationState?.pin && locationState?.city) {
      setShowButtonAndText(false)
    } else {
      setShowButtonAndText(true)
    }
  }, [])

  // Function 
  const SelectCity = (city) => {
    dispatch(generalUpdate({ field: 'selectedCity', value: city }));
    navigation.goBack()
  }

  const handleBackPress = () => {
    if (!showButtonAndText) {
      textInputRef.current.blur();
      setValue('pin', "")
      dispatch(reSetState());
      setShowButtonAndText(true);
      return true; // Prevent default behavior
    } else {
      if (showButtonAndText === false) {
        navigation.goBack();
      }
      return false; // Allow default behavior
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color={theme.colors.primary}
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        />
        <Text style={styles.headerTitle}>Your Location</Text>
      </View>
      <View style={styles.body}>
        {(showButtonAndText && !locationState.pin) && <><Text style={styles.modalText}>Please enter your pincode or allow access to your location</Text>
          <Button
            icon={() => <MaterialIcons name="gps-fixed" size={20} color={theme.colors.primary} />}
            mode="outlined"
            onPress={() => console.log('Use current location button pressed')}
            style={styles.locationButton}
          >
            Use Current Location
          </Button>
          <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "san", opacity: 0.7 }}>Or</Text>
        </>}
        <Controller
          control={control}
          name="pin"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={textInputRef}
              mode="outlined"
              label="Enter Your Location"
              placeholder="Enter Your Location"
              left={<TextInput.Icon icon={() => <Ionicons name="location-outline" size={20} color={theme.colors.primary} />} />}
              style={styles.input}
              onBlur={() => {
                onBlur();
                // setShowButtonAndText((prev) => !prev);
              }}
              onFocus={() => setShowButtonAndText(false)}
              maxLength={6}
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
              error={errors.pin ? true : false}
              defaultValue={locationState?.pin || ""}
            />
          )}
        />
        {errors.pin && <Text style={styles.errorText}>{errors.pin.message}</Text>}
        {locationState.message && (
          <Text style={locationState.validPin ? styles.successText : styles.errorText}>
            {locationState.validPin ? (
              <Text>
                <Text style={{ color: theme.colors.primary, fontFamily: "san", fontSize: 14 }}>Awesome! We deliver to this pincode.</Text>
                {'\n'}
                <Text style={{ fontSize: 12, fontFamily: "san" }}>To serve you better, please select the <Text style={{ fontFamily: "san-medium" }}>locality closest to you</Text> from the list below.
                </Text>
              </Text>
            ) : locationState.message}
          </Text>
        )}
        {locationState.validPin && (
          <ScrollView style={styles.cityList} showsVerticalScrollIndicator={false}>
            {Array.isArray(locationState.city) && locationState.city.map((city, index) => (
              <TouchableOpacity key={index} style={styles.cityItem} onPress={() => SelectCity(city)}>
                <Ionicons name="location-outline" size={20} color={theme.colors.primary} style={styles.icon} />
                <Text style={styles.cityText} >{city.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

// Styles for the component
const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontFamily: 'san-medium',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    fontFamily: 'san',
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'san',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: "san",
    fontSize: 14
  },
  successText: {
    color: 'black',
    marginBottom: 10,
  },
  cityList: {
    flex: 1,
    width: '100%',
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cityText: {
    fontFamily: 'san',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    marginRight: 4,
  },
  locationButton: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    borderColor: theme.colors.primary
  },
});

export default LocationScreen;
