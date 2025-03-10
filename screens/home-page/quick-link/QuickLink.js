import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { background_quick_link, data } from './helper';
import QuickLinkSkeleton from './skeleton/QuickLinkSkeleton';

const QuickLink = () => {
    const screenWidth = Dimensions.get('window').width * 0.8;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (loading ? <QuickLinkSkeleton /> : <View style={styles.cardContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map(({ title, description, icon }, index) => (
                <TouchableOpacity
                    key={title}
                    style={[styles.quickLinkContainer, { width: screenWidth }, background_quick_link[index + 1]]}
                    activeOpacity={0.7}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <Ionicons name={icon} size={35} color={background_quick_link[index + 1]?.iconColor} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>);
}

export default QuickLink;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        paddingHorizontal: 2,
        paddingTop: 5,
    },
    quickLinkContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#66312E',
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: 'san-bold',
        fontSize: 12,
        color: 'white'
    },
    description: {
        fontFamily: 'sans-serif-medium',
        fontSize: 10,
        color: 'white'
    }
});
