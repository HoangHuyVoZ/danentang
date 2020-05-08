import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import lion from "../assets/lion.png";
import vien from "../assets/vien.png";
import face from "../assets/facebook.png";
import google from "../assets/google.png";
import firebaseConfig from "../firebase/firebase.js";
import { ProgressDialog } from "react-native-simple-dialogs";
import toast from "react-native-tiny-toast";
import Constants from "expo-constants";

import { YellowBox } from "react-native";
import _ from "lodash";

// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//     if (message.indexOf('Setting a timer') <= -1) {
//         _console.warn(message);
//     }
// };

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "huy@gmail.com",
      password: "huyhuyhuy",
    };
  }

  getData = (email, password) => {
    if (email != "" && password != "") {
      this.setState({
        email: "",
        password: "",
      });
      // this.openProgress(true);
      this.onLogin();
    } else {
      toast.show("Vui lòng nhập đầy đủ thông tin!", toast.SHORT);
    }
  };
  onLogin = () => {
    const { email, password } = this.state;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        toast.showSuccess("Đăng nhập thành công !", toast.SHORT);
        this.props.navigation.navigate("Home", {
          // email: "email",

          screen: "Home",
          params: {
            email: email,
          },
        });
        // this.openProgress(false);
      })
      .catch((error) => {
        const { code, message } = error;
        // representation of the error
        // this.openProgress(false),
        Alert.alert("Lỗi! ", "Vui lòng đăng nhập lại", [], {
          cancelable: true,
        });
      });
  };

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={style.container}>
        <Image source={vien} style={style.vien}></Image>
        <Image style={style.logo} source={lion}></Image>
        <Text style={style.txtLogo}> LiOn </Text>
        <View style={style.box}>
          <TextInput
            style={style.text}
            placeholder={"Email"}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            returnKeyType="next"
          ></TextInput>
        </View>
        <View style={style.box}>
          <TextInput
            style={style.text}
            secureTextEntry={true}
            placeholder={"Password"}
            returnKeyType="done"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={this.getData.bind(
            this,
            this.state.email,
            this.state.password
          )}
        >
          <View style={style.buttonLogin}>
            <Text style={style.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", top: 20 }}>
          <TouchableOpacity>
            <View style={style.buttonRes}>
              <Image
                source={face}
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 2,
                  borderWidth: 1,
                  borderRadius: 30,
                }}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={style.buttonRes}>
              <Image
                source={google}
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: 2,
                  borderWidth: 1,
                  borderRadius: 30,
                }}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={style.name}
          onPress={() => navigation.navigate("Register")}
        >
          Don 't hava an account? Register
        </Text>

        <ProgressDialog
          title="Loading"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          animationType="fade"
          message="Please, wait..."
          visible={this.state.showProgress}
        />
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    height: "100%",
    width: "100%",
    // marginTop: Constants.statusBarHeight,
  },
  logo: {
    marginTop: 70,
    marginBottom: 20,
    width: 80,
    height: 80,
  },
  txtInput: {},
  text: {
    width: "100%",
    height: "100%",
    fontSize: 25,
    textAlign: "center",
  },
  box: {
    marginTop: 20,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderColor: "#055ABB",
    borderWidth: 1,
    backgroundColor: "#FFF",
    alignItems: "stretch",
    justifyContent: "center",
  },
  buttonLogin: {
    marginTop: 30,
    width: 120,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonRes: {
    marginTop: 10,
    width: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  txtLogo: {
    fontSize: 25,
    letterSpacing: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  vien: {
    position: "absolute",
    top: -4,
  },
  name: {
    top: 55,
    height: 30,
  },
});
