import React, { Component } from 'react'
import {
    Image, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, SafeAreaView
} from 'react-native'
import lion from '../assets/lion.png'
import vien from '../assets/vien.png'
import Constants from 'expo-constants';
import NestedScrollView from 'react-native-nested-scroll-view'
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import firebaseConfig from '../firebase/firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import toast from 'react-native-tiny-toast'


// import {
//     AppBarLayout,
//     CoordinatorLayout,
//     CollapsingToolbarLayout,
//   } from 'react-native-collapsing-toolbar'

export default class Register extends Component {
//insert
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            cofirm: '',
        };
        this.itemsRef = firebaseConfig.database().ref('app').child('user');
    }
    
    // listenForItems(itemsRef) {
    //     itemsRef.on('value', (snap) => {
    //         var items = [];
    //         snap.forEach((child) => {
    //             let item = {
    //                 key: (child.key),
    //                 name: child.val().name,
    //                 avatar: child.val().avatar,
    //                 email: child.val().email,
    //                 password: child.val().password,
                 
    //             }
    //             items.push(item);
    //         });


    //         this.setState({
    //             post: items
    //         });
    //         this.state.post.map((item, idx) => {
    //             console.log(item.key)
    //         })

    //     });
    // }
    // componentDidMount() {
    //     this.listenForItems(this.itemsRef)
    // }
    _post = () => {
        console.log('post', new Date().getTime())
        firebaseConfig.database().ref('app').child('user').push({
         
            name: this.state.name,
            avatar: this.state.avatar,
            email: this.state.email,
            password: this.state.password,
            uid: this.uid
        })
    }


    //authen
    getData = (email, cofirm) => {
        if ( this.state.name != '' && email != '' && cofirm != '' && this.state.password != '') {
            if (cofirm == this.state.password) {
                // this.setState({
                //     email: '',
                //     password: '',
                //     cofirm: '',
                // })
                //come back screen login
                //come back screen login
                // this.openProgress(true);
                this.onRegister();
            } else {
                toast.show('Vui lòng nhập chính xác mật khẩu!', toast.SHORT);
            }
        } else {
            toast.show('Vui lòng nhập đầy đủ thông tin!', toast.SHORT);
        }

    }

    onRegister = () => {
        const { email, cofirm } = this.state;
        firebaseConfig.auth().createUserWithEmailAndPassword(email, cofirm)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
                toast.showSuccess('Đăng kí thành công!', toast.SHORT);
                // this.openProgress(false),
                this.props.navigation.navigate('Login')
                this._post();
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
                // this.openProgress(false);
                Alert.alert('Lỗi! ', 'Vui lòng thử lại \n có thể email đã tồn tại', [], { cancelable: true })

            });
    }
   
    pickImage = async () => {
        this.setState({avatar:''})
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
    
        if (!result.cancelled) {
            this.uploadPhotoAsync(result.uri)
            .then(url=> this.setState({avatar: url}))
          
           
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
                snapshot => {},
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
    // uploadimage
    // componentDidMount() {
    //     this.getPermissionAsync();
    //     console.log('hi');
    //   }
     
    //   getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (status !== 'granted') {
    //         alert('Lỗi, Xin vui lòng thử lại !');
    //       }
    //     }
    //   }
    
    //   _pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1
    //     });
    
    //     console.log(result);
    
    //     if (!result.cancelled) {
    //       this.uploadImage(result.uri, 'test-image');
    //       this.setState({avatar: result.uri});
    //     }
    //   }
    //   uploadImage = async(uri) => {
    //     const path = 'photos/${this.uid}/${Date.now()}.jpg';
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     let upload = firebaseConfig
    //             .storage()
    //             .ref(path)
    //             .put(file);

    //         upload.on(
    //             "state_changed",
    //             snapshot => {},
    //             err => {
    //                 rej(err);
    //             },
    //             async () => {
    //                 const url = await upload.snapshot.ref.getDownloadURL();
    //                 res(url);
    //             }
    //         );
    //   }


    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {/* <NestedScrollView> */}
                <SafeAreaView style={style.container}>
                    <Image source={vien} style={style.vien}></Image>

                    <TouchableOpacity style={{ top: 10 }} onPress={this.pickImage}>
                      
                        <Avatar rounded source={{ uri:  this.state.avatar}} size="large" />
                   </TouchableOpacity>
                    <View style={style.box}>
                        <TextInput style={style.text} placeholder={'Họ và tên'}
                            returnKeyType="next"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        ></TextInput>
                    </View>
                    <View style={style.box}>
                        <TextInput style={style.text} placeholder={'Email'}
                            returnKeyType="next"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}></TextInput>
                    </View>
                    <View style={style.box}>
                        <TextInput style={style.text} secureTextEntry={true} placeholder={'Mật khẩu'}
                            returnKeyType="next"
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}></TextInput>
                    </View>
                    <View style={style.box}>
                        <TextInput style={style.text} secureTextEntry={true} placeholder={'Nhập lại mật khẩu'}
                            returnKeyType="done"
                            onChangeText={(cofirm) => this.setState({ cofirm })}
                            value={this.state.cofirm}></TextInput>
                    </View>
                    <View style={style.button}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={style.buttonLogin}>
                                <Text style={style.buttonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.getData.bind(this, this.state.email, this.state.cofirm)}
                        >
                            <View style={style.buttonRes}>
                                <Text style={style.buttonText}>Register</Text>
                            </View>
                        </TouchableOpacity></View>
                </SafeAreaView>
                {/* </NestedScrollView> */}

                <ProgressDialog
                    title="Loading"
                    activityIndicatorColor="blue"
                    activityIndicatorSize="large"
                    animationType="fade"
                    message="Please, wait..."
                    visible={this.state.showProgress}
                />


            </View>

        )
    }
}
const style = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#F1F1F1',
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column'
    },
    logo: {
        marginTop: 70,
        marginBottom: 20,
        width: 80,
        height: 80,
    },
    txtInput: {


    },
    text: {
        width: '100%',
        height: '100%',
        fontSize: 20,
        textAlign: 'center',
    },
    box: {
        marginTop: 20,
        width: 250,
        height: 50,
        borderRadius: 10,
        borderColor: '#055ABB',
        borderWidth: 1,
        backgroundColor: '#FFF',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    buttonLogin: {
        marginTop: 30,
        width: 90,
        marginRight: 5,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FF3300'
    },
    buttonRes: {
        marginTop: 30,
        width: 90,
        marginLeft: 5,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        color: 'white'
    },

    vien: {
        position: 'absolute',
        top: -4,

    },
    name: {
        top: 55,
    },
    button: {
        flexDirection: 'row',
    }
})