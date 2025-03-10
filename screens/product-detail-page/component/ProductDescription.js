import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProductDescription = ({ description }) => {
    return (
        <View style={styles.descriptionContainer}>
            <View>
                <Text style={styles.title}>Description</Text>
            </View>
            <View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}

export default ProductDescription

const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 20,
        gap: 10
    },
    title: {
        fontFamily: 'san-bold',
        fontSize: 16
    },
    description: {
        fontFamily: 'san',
        fontSize: 12,
        textAlign: 'justify',
    }
});
