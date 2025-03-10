import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

const images = [
    'https://img.freepik.com/free-photo/flour-being-sprinkled-fresh-baked-bread_181624-189.jpg?t=st=1733806895~exp=1733810495~hmac=a50b9e2e2a6138a55c694c0ec926ed989932607c96bef0e0ed1ac1a3d935a7cb&w=740',
    'https://img.freepik.com/free-photo/front-view-baker-hands-mixing-flour_23-2148302895.jpg?t=st=1733809371~exp=1733812971~hmac=4fb15d0b69d50b48afe5dcddc849b0f9bc52a23267cbaf7545a5318fc4ca599c&w=740',
    'https://img.freepik.com/free-photo/stashed-flour-used-cooking_23-2149517188.jpg?t=st=1733809413~exp=1733813013~hmac=494cebddb068ce2c3232019dbd3f56cbca2b411d97543dfe40507a0d329c08b0&w=740',
    'https://img.freepik.com/free-photo/spoon-ingredients-full-flour_23-2149482597.jpg?t=st=1733809470~exp=1733813070~hmac=5f34aaff28f043d3e13a3f42535a74259f29b822532fe68f7b38a64010fe2bf5&w=740',
    'https://img.freepik.com/free-photo/flour-falling-baking-table-with-ingredients-bowl_23-2147872714.jpg?t=st=1733809502~exp=1733813102~hmac=1be9709c96430776d9a62f9685568c1fded4e18c5356269c62f6ad58d570ac7a&w=740',
    'https://img.freepik.com/free-photo/wooden-cutting-board-with-slices-bread_114579-39100.jpg?t=st=1733809568~exp=1733813168~hmac=a9afed2fa7a9e8ff8006490dd589ef16b2f799cedb5e98bdf0e21d82dc28d81b&w=740'
];

const ImageCarousel = () => {

    //state
    const progressValue = useSharedValue(0);
    const [loading, setLoading] = useState(true);

    //react native paper theme
    const theme = useTheme();

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000); // Simulate image loading time
        return () => clearTimeout(timeout);
    }, []);

    // Define animated styles outside of any conditional logic
    const animatedStyles = images.map((_, index) =>
        useAnimatedStyle(() => {
            const backgroundColor = withTiming(progressValue.value === index ? `${theme.colors.accent}` : '#888888', {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            });
            const dotWidth = withTiming(progressValue.value === index ? 20 : 10, {
                duration: 700,
                easing: Easing.inOut(Easing.ease),
            });

            return {
                backgroundColor, width: dotWidth
            };
        })
    );

    return (
        <View>
            {loading ? (
                <ContentLoader
                    viewBox={`0 0 ${width} ${width * 0.5}`}
                    backgroundColor="#e0e0e0"
                    foregroundColor="#f0f0f0"
                    style={{ width, height: width * 0.5 }}
                >
                    <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>
            ) : (
                <Carousel
                    width={width}
                    height={width * 0.5}
                    loop
                    autoPlay
                    autoPlayInterval={4000}
                    onProgressChange={(progress, currentIndex) => {
                        progressValue.value = currentIndex;
                    }}
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            )}
            {!loading && (
                <View style={styles.paginationWrapper}>
                    <View style={styles.paginationContainer}>
                        {images.map((_, index) => (
                            <Animated.View key={index} style={[styles.paginationDot, animatedStyles[index]]} />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    paginationDot: {
        height: 5,
        borderRadius: 5,
        marginHorizontal: 4,
    },
});

export default ImageCarousel;
