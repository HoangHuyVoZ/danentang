import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screen/Login";
import Register from "./screen/Register";
import HomeScreen from "./screen/HomeScreen";
import ProfilesScreen from "./screen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import DialogInsert from "./screen/dialogInsert";
import dialogUpdate from "./screen/dialogUpdate";

const StackDialog = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// function Dialog() {
//   return (
//     <StackDialog.Navigator initialRouteName="Home" headerMode="none">
//       <StackDialog.Screen name="HomeScreen" component={HomeScreen}

//       />
//       <StackDialog.Screen name="Insert" component={DialogInsert}

//       />
//       <StackDialog.Screen name="Update" component={dialogUpdate}

//       />
//     </StackDialog.Navigator>
//   )
// }

function Home() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={ProfilesScreen}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <StackDialog.Screen name="Insert" component={DialogInsert} />
        <StackDialog.Screen name="Update" component={dialogUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
