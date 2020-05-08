import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import firebase from '../firebase/firebase.js';
import { InsertProduct } from './ProfileScreen.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ProgressDialog } from 'react-native-simple-dialogs';
import toast from 'react-native-tiny-toast'
import Toast from 'react-native-tiny-toast';








export default class DialogInsert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:  '',
            status: '',

        }
    }
    _insertProduct = () => {
        if(this.state.name.toString()===''&& this.state.status.toString()===''){
                return Toast.show('bạn phải điền đủ thông tin !!!',Toast.SHORT)
        }
        firebase.database().ref('app').child('product').push({

            name: this.state.name,
            status: this.state.status,
            Image: this.state.Image,
            uid: this.uid
        })
        this.props.navigation.navigate('Home')
    }



    //Image 

    pickImage = async () => {
        this.setState({ Image: 'null' })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.uploadPhotoAsync(result.uri)
                .then(url => this.setState({ Image: url }))


        }
    };

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebaseConfig
                .storage()
                .ref(path)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);

                }
            );

        });
    };


    get uid() {
        return (firebaseConfig.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }



    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.dialog}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.btnHuy} >
                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'blue' }}>Hủy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this._insertProduct() }}>
                        <View style={styles.btnDang}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'red' }}>Lưu</Text>
                        </View>
                    </TouchableOpacity></View>
                <Text Thêm style={{ fontSize: 25, left: 15, bottom: 10 }}>Thêm Trạng Thái</Text>
                <ScrollView>
                    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', }}>
                        <View style={styles.box3}>

                            <TextInput style={styles.inpT} placeholder={'Tiêu đề.....'} returnKeyType='next'
                                onChangeText={(value) => { this.setState({ name: value }) }}
                            />
                        </View>
                        <View style={styles.box3}>

                            <TextInput style={styles.inpT}
                                placeholder={'Nội Dung ....'} multiline={true} returnKeyType='done'
                                onChangeText={(value) => { this.setState({ status: value }) }}
                            />
                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.nameIamge}>Hình Ảnh</Text>
                            <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center' }} onPress={this.pickImage}>

                                <Image source={{ uri: this.state.Image }}
                                    style={{ width: '80%', height: '80%', top: 15, borderColor: '#F1F1F1', borderRadius: 5, borderWidth: 1 }}>
                                </Image></TouchableOpacity>
                        </View>

                    </View>
                    </ScrollView>
                    
            </View>
        )
    }
}




//style
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    btnHuy: {
        marginTop: 10,
        width: 60,
        height: 50,
        left: 10,
    },
    nameIamge: {
        fontSize: 15,
        color: '#979797',
        left: 10,
        top: 10,
    },
    btnDang: {
        marginTop: 10,
        width: 60,
        height: 50,
        right: 10,

    },
    inpT: {
        width: '100%',
        height: '100%',
        left: 10,

    },
    
    box3: {
        width: '90%',
        height: 50,
        shadowColor: '#000',
        shadowRadius: 10,
        borderRadius: 10,

        marginBottom: 10,
        shadowOpacity: 0.1,
        backgroundColor: '#FFF',

    },

    box2: {
        width: '90%',
        height: 290,
        shadowColor: '#000',
        shadowRadius: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 40,
        shadowOpacity: 0.1,
        backgroundColor: '#FFF',

    },
    dialog: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',

        top: 30,
        backgroundColor: '#F1F1F1',

    },
})