import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as Font from "expo-font";
import { colors } from "./src/config/theme";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ReceiveScreen } from "./src/screens/ReceiveScreen";
import { SendScreen } from "./src/screens/SendScreen";
import { PassRecoverScreen1 } from "./src/screens/PassRecoverScreen1";
import { PassRecoverScreen2 } from "./src/screens/PassRecoverScreen2";
import { PassRecoverScreen3 } from "./src/screens/PassRecoverScreen3";
import { RegisterScreen1 } from "./src/screens/RegisterScreen1";
import { RegisterScreen2 } from "./src/screens/RegisterScreen2";

const getFonts = () => {
  return Font.loadAsync({
    CircularStdMedium: require("./assets/fonts/Circular_Std_Medium.ttf"),
    Lato: require("./assets/fonts/lato.ttf"),
    LatoLight: require("./assets/fonts/lato_light.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

export default function App() {
  const Home = () => {
    return (
      <TabStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 20;
            color = focused ? colors.pastel : colors.whiteShadeBg;
            if (route.name === "HomeScreen") {
              iconName = focused ? "account-balance-wallet" : "account-balance-wallet";
            } else if (route.name === "SendScreen") {
              iconName = focused ? "send" : "send";
            } else {
              iconName = focused ? "save-alt" : "save-alt";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.pastel,
          tabBarInactiveTintColor: colors.whiteShadeBg,
          headerShown: false,
          showLabel: true,
          tabBarStyle: {
            backgroundColor: colors.black,
            borderTopColor: colors.black,
            paddingBottom: 6,
          },
        })}
      >
        <TabStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "CARTEIRAS" }}/>
        <TabStack.Screen name="SendScreen" component={SendScreen} options={{ title: "ENVIAR" }}/>
        <TabStack.Screen name="ReceiveScreen" component={ReceiveScreen} options={{ title: "RECEBER" }}/>
      </TabStack.Navigator>
    );
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PassRecoverScreen1" component={PassRecoverScreen1} />
          <Stack.Screen name="PassRecoverScreen2" component={PassRecoverScreen2} />
          <Stack.Screen name="PassRecoverScreen3" component={PassRecoverScreen3} />
          <Stack.Screen name="RegisterScreen1" component={RegisterScreen1} />
          <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}
