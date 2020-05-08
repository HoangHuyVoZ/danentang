import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
export default class ListProducts extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={[
                        { number: 'S001', name: 'iphone X', image: { uri: 'https://cdn1.viettelstore.vn/Images/Product/ProductImage/1903040245.jpeg' } },
                        { number: 'S001', name: 'iphone X', image: { uri: 'https://cdn1.viettelstore.vn/Images/Product/ProductImage/1903040245.jpeg' } },
                        { number: 'S001', name: 'iphone X', image: { uri: 'https://cdn1.viettelstore.vn/Images/Product/ProductImage/1903040245.jpeg' } },
                        { number: 'S001', name: 'iphone X', image: { uri: 'https://cdn1.viettelstore.vn/Images/Product/ProductImage/1903040245.jpeg' } },
                        { number: 'S001', name: 'iphone X', image: { uri: 'https://cdn1.viettelstore.vn/Images/Product/ProductImage/1903040245.jpeg' } },
                    ]}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Image style={styles.image} source={item.image}></Image>
                            <Text style={styles.item}>{item.number}</Text>
                            <Text style={styles.item}>{item.name}</Text>
                        </View>}
                />
            </View>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        flex:1,
        height:'100%',
        flexDirection:'row',
        paddingTop: 22,
        borderColor: '#000',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    item: {
        left: 50,
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    image: {
        width: 50,
        height: 50,
    }
})