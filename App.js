import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator()

export default App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
