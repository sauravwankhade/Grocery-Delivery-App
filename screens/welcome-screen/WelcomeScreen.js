import React, { useRef, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { slides } from './helper';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {

    //state
    const [currentIndex, setCurrentIndex] = useState(0);

    //react native paper theme
    const theme = useTheme();
    const styles = createStyles(theme);

    //Function

    //handing the slide 
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.floor(scrollPosition / width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <FlatList
                    data={slides}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={[styles.heading, theme.components.Title]}>{item.heading}</Text>
                            <Text style={[styles.description, theme.components.Subtitle]}>{item.description}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View
                            key={index.toString()}
                            style={[
                                styles.dot,
                                { opacity: currentIndex === index ? 1 : 0.3 },
                            ]}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7} onPress={() => navigation.navigate("LoginPage")}>
                        <Text style={styles.outlineButtonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Text style={styles.exploreText} >Explore as a Visitor</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    carouselContainer: {
        flex: 4, // 80% of the screen height
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    heading: {
        marginVertical: 10,
    },
    description: {
        color: '#666',
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 8,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 25,
        backgroundColor: theme.colors.primary,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "san-bold"
    },
    outlineButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    outlineButtonText: {
        color: theme.colors.text,
        fontFamily: "san-bold",
        fontSize: 18,
    },
    exploreText: {
        fontFamily: "san",
        color: theme.colors.text
    },
});

export default WelcomeScreen;
