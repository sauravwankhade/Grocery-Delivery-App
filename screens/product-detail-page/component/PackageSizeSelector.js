import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const packages = [
    { size: '1', price: 100, gradientColors: ['#D8E3FF', '#F5DAF9'] },
    { size: '2', price: 180, gradientColors: ['#FFDDCA', '#FFEAD9'] },
    { size: '5', price: 300, gradientColors: ['#E6EBE5', '#CCFCCA'] },
];

const PackageSizeSelector = ({ selectedPackage, onSelectPackage }) => {
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={styles.packageTextConatainer}>
                <View>
                    <Text style={styles.packageText}>Package Size</Text>
                    <Text style={styles.selectOne}>Select one option</Text>
                </View>
                <Text style={styles.requireContainer}>Required</Text>
            </View>
            <View style={styles.packageContainer}>
                {packages.map((pkg) => (
                    <TouchableOpacity
                        key={pkg.size}
                        style={[
                            styles.package,
                            {
                                borderColor: (selectedPackage && selectedPackage.size === pkg.size) ? "#8C3F6D" : "#fff",
                                width: (width / packages.length) - 10
                            }]}
                        onPress={() => onSelectPackage(pkg)}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={pkg.gradientColors}
                            style={styles.gradient}
                            start={[0, 0]}
                            end={[1, 1]}
                        >
                            <Text style={styles.packageSize}>{pkg.size} KG</Text>
                            <Text style={styles.packagePrice}>₹{pkg.price}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    packageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
    },
    package: {
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 4,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    packageSize: {
        fontSize: 22,
        color: '#214583',
        fontFamily: 'san-bold'
    },
    packagePrice: {
        fontSize: 14,
        color: '#2B3852',
        fontFamily: 'san-bold'
    },
    packageTextConatainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    packageText: {
        fontFamily: 'san-bold',
        fontSize: 14
    },
    selectOne: {
        fontFamily: 'san',
        fontSize: 12
    },
    requireContainer: {
        borderColor: '#FF8C19',
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#FFF3CC',
        color: '#FF8C19',
        height: 30,
        fontFamily: 'san',
        fontSize: 12
    }
});

export default PackageSizeSelector;
