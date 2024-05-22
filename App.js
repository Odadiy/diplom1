import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import  NewsScreen from './src/screens/News';
import  LoginScreen from './src/screens/Login';
import  RegisterScreen from './src/screens/Register';
import  LogoutScreen from './src/screens/Logout';
import profile from './src/screens/doctorprofile';
import mypro from './src/screens/myprofile';
import doctor from './src/screens/DoctorScreen';
import post from './src/screens/Post';
import Read from './src/screens/read';
import dre from './src/screens/Dregister';


// import ahome from './test';

const StackMenu = createNativeStackNavigator();
const DrawerMenu= createDrawerNavigator();
const DrawerNav = () => {
      return (
        <DrawerMenu.Navigator >
          <DrawerMenu.Screen name="Нүүр хуудас" component={Read}  />
          <DrawerMenu.Screen name="Миний булан" component={mypro}  />
          <DrawerMenu.Screen name="Эмч мэдээлэл харах" component={doctor}  />
          <DrawerMenu.Screen name="Гарах" component={LogoutScreen}  />
        </DrawerMenu.Navigator>
      );
    };
const AdminDrawerNav = () => {
  return(
    <DrawerMenu.Navigator>
      <DrawerMenu.Screen name="huudas" component={post}  />
      <DrawerMenu.Screen name="Эмч мэдээлэл оруулах" component={profile}  />
      <DrawerMenu.Screen name="Эмч мэдээлэл харах" component={doctor}  />
      <DrawerMenu.Screen name="Зөвөлгөө оруулах" component={NewsScreen}  />
      <DrawerMenu.Screen name="Эмч мэдээлэл засах" component={dre}  />
      <DrawerMenu.Screen name="Гарах" component={LogoutScreen}  />
    </DrawerMenu.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <StackMenu.Navigator >
        <StackMenu.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <StackMenu.Screen name="Register" component={RegisterScreen} />
        <StackMenu.Screen name='post' component={post} />
        <StackMenu.Screen name='news' component={NewsScreen}/>
        <StackMenu.Screen name="read" component={Read}  />

        <StackMenu.Screen name="DrawerNav"
          component={DrawerNav}
          headerLeft={null}
          gestureEnabled={false}
          options={{headerShown:false}}/>
        {/* <StackMenu.Screen name="AdminDrawerNav"
          component={AdminDrawerNav}
          headerLeft={null}
          gestureEnabled={false}
          options={{headerShown:false}}/> */}
      </StackMenu.Navigator>
    </NavigationContainer>
  );
};