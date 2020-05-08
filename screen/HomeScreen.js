import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  MaskedViewIOS,
  Alert,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import firebase from "../firebase/firebase.js";
import { InsertProduct } from "./ProfileScreen.js";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ProgressDialog } from "react-native-simple-dialogs";
import toast from "react-native-tiny-toast";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DialogInsert from "./dialogInsert.js";

import Toast from "react-native-tiny-toast";
//code

import { YellowBox } from "react-native";
import _ from "lodash";

// YellowBox.ignoreWarnings(["Setting a timer"]);
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: "",
      uid: "",
      Image: "",
      name: "",
      status: "",
      product: [],
      modalVisible: false,
      nameuser: "",
      avatar: "null",
      email: "",
      user: [],
    };
    this.itemsRef = firebase.database().ref("app").child("product");
    this.itemsReF = firebase.database().ref("app").child("user");
  }
  _showDialog = () => {
    this.setState({ modalVisible: true });
  };
  _hideDialog = () => {
    this.setState({ modalVisible: false });
  };
  _post = () => {
    this.setState({ modalVisible: true });
  };
  setkey = (uid) => {
    this.setState({ uid: uid });
  };
  setimage = (image) => {
    this.setState({ Image: image });
  }; //data của e có 2 cái text 1 cái nâme vs status
  setname = (name) => {
    this.setState({ name: name });
  };
  setstatus = (status) => {
    this.setState({ status: status });
  };

  listenForItems(itemsRef) {
    itemsRef.on("value", (snap) => {
      var items = [];
      snap.forEach((child) => {
        let item = {
          key: child.key,
          name: child.val().name,
          status: child.val().status,
          Image: child.val().Image,
          uid: child.val().uid,
        };
        items.push(item);
      });

      this.setState({
        product: items.reverse(),
      });

      this.state.product.map((item, idx) => {
        console.log(item.key);
      });
    });
  }

  listenForItemUser(itemsReF) {
    itemsReF.on("value", (snap) => {
      var items = [];
      snap.forEach((child) => {
        let item = {
          key: child.key,
          nameuser: child.val().name,
          avatar: child.val().avatar,
          email: child.val().email,
        };
        items.push(item);
      });

      this.setState({
        user: items.reverse(),
      });

      this.state.user.map((item, idx) => {
        // console.log("email1111=>>>>>>>>" + item.email)
        // console.log("ugsgeggrgg11111=>>>>>>>>" + item.nameuser)
        // console.log("email    =>>>>>>>>" + this.state.email)

        if (this.props.route.params.email === item.email) {
          // console.log(item.key)
          // console.log("ugsgeggrgg=>>>>>>>>" + item.email)
          // console.log("ugsgeggrgg=>>>>>>>>" + item.nameuser)
          // console.log("ugsgeggrgg=>>>>>>>>" + item.avatar)
          this.setState({
            nameuser: item.nameuser,
            email: item.email,
            avatar: item.avatar,
          });
        }
      });
    });
  }

  // listenForItems(itemsReF){
  //     itemsReF.on("value", (snapshot) => {
  //         this.setState({
  //             name: snapshot.val().name,
  //             email: snapshot.val().email
  //            })

  // }
  //     )}
  // listenForItems(itemsReF){
  //     itemsReF.on("child_added", (snapshot) => {
  //         const email = snapshot.val().email;
  //         let emailuser = Object.values(email);
  //         this.setState({ emailuser: emailuser });

  //     });
  // }
  update() {
    this._hideDialog();
    this.props.navigation.navigate("Update", {
      uid: this.state.uid,
      name: this.state.name,
      image: this.state.Image,
      status: this.state.status,
    });
    console.log(this.state.name);
    console.log(this.state.status);
    console.log(this.state.Image);
  }
  submit(key) {
    Alert.alert("Thông báo", "Bạn chắn chắn muốn xóa ??", [
      {
        text: "Không",
        onPress: () => this._hideDialog(),
      },
      {
        text: "Đồng ý",
        onPress: () => this._delete(key),
      },
    ]);
  }
  _delete(key) {
    firebase.database().ref("app").child("product").child(key).remove();
    this._hideDialog();
    Toast.showSuccess("Xóa thành công", Toast.SHORT);
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForItemUser(this.itemsReF);
  }

  render() {
    const Stack = createStackNavigator();

    const { navigation, route } = this.props;
    //     const { email } = route.params;
    //    this.state({email: JSON.stringify(email)})
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this._hideDialog}
          onBackdropPress={this._hideDialog}
        >
          <View style={styles.dialog}>
            <TouchableOpacity onPress={() => this.update()}>
              <View style={styles.btnUpdate}>
                <Text style={styles.buttonText}>Cập nhật</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.submit(this.state.uid);
              }}
            >
              <View style={styles.btnXoa}>
                <Text style={styles.buttonText}>Xóa</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.box}>
          <Avatar rounded source={"HH"} size="medium" />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.name}>Hoàng Huy</Text>
            <Text style={{ fontSize: 15, left: 30, top: 10, color: "#979797" }}>
              {/* {this.state.email} */}Huy@gmail.com
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Insert")}>
            <View style={styles.box1}>
              <Text style={styles.thinking}>Bạn đang nghĩ gì.... ?</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            style={{ marginBottom: 80, borderRadius: 10 }}
            data={this.state.product}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.setkey(item.key);
                  this.setimage(item.Image);
                  this.setname(item.name);
                  this.setstatus(item.status);
                  this._showDialog();
                }}
              >
                <View style={styles.lv}>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{ uri: item.Image }}
                      style={{
                        width: "90%",
                        height: "90%",
                        top: 10,
                        borderColor: "#F1F1F1",
                        borderRadius: 5,
                        borderWidth: 1,
                      }}
                    />
                  </View>
                  <Text style={styles.Tieude}> {item.name}</Text>
                  <Text style={styles.mota}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  dialog: {
    width: "100%",
    height: "100%",

    flexDirection: "column",
    top: 400,
  },
  btnXoa: {
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#FF3300",
  },
  btnUpdate: {
    marginTop: 40,
    width: "65%",
    left: 100,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#2196F3",
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
    color: "#797979",
  },
  lv: {
    width: 310,
    height: 400,
    shadowColor: "#000",
    shadowRadius: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    shadowOpacity: 0.1,
    backgroundColor: "#FFF",
  },

  box1: {
    width: 310,
    height: 50,
    padding: 10,

    shadowColor: "#000",
    shadowRadius: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    shadowOpacity: 0.2,
    backgroundColor: "#FFF",
  },
  thinking: {
    fontSize: 20,
    textAlign: "left",
    left: 10,
    alignItems: "center",
    color: "#979797",
  },
  box: {
    flexDirection: "row",
    width: 310,
    height: 70,
    padding: 10,
    shadowColor: "#000",
    shadowRadius: 10,
    borderRadius: 10,
    marginTop: 5,
    shadowOpacity: 0.2,
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    left: 30,
    top: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    color: "white",
  },
});
