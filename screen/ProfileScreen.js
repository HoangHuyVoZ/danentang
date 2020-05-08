import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';

export default class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lv} >

                    <View style={{ alignItems: 'center' }}>
                        <View style={{marginTop: 20}}>
                      <Avatar rounded source={''} size={'xlarge'}/></View>
                    </View>
                    <Text style={styles.Tieude}></Text>
                    <Text style={styles.mota}></Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <View style={styles.box1}>
                            <Text style={styles.thinking}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
flexDirection: 'column',
alignItems: 'center'
    },
    box1: {
        width: 310,
        height: 50,
        padding: 10,

        shadowColor: '#000',
        shadowRadius: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        shadowOpacity: 0.2,
        backgroundColor: '#FF3300',
    },
    thinking: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    Tieude: {
        fontSize: 25,
        left: 15,
        top: -15,
    },
    mota: {
        fontSize: 20,
        left: 20,
        top: -15,
        color: '#797979'
    },
    lv: {
        width: 310,
        height: 400,
        shadowColor: '#000',
        shadowRadius: 10,
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 5,
        shadowOpacity: 0.1,
        backgroundColor: '#FFF',
    },
})
