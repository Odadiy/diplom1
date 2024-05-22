import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import firestore from '@react-native-firebase/firestore';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const checkLogin = async () => {
    try {
      const userRef = firestore().collection('users').doc(email);
      const doc = await userRef.get();

      if (doc.exists) {
        const userData = doc.data();
        if (userData.password === password) {
          navigation.navigate('DrawerNav');
        } else {
          Alert.alert("Нууц үг буруу байна.");
        }
      } else {
        Alert.alert("Цахим шуудан буруу байна.");
      }
    } catch (error) {
      console.error('error: ', error);
      Alert.alert("Алдаа гарлаа.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/baby.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Нэвтрэх нэр"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Нууц үг"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={() => { navigation.navigate('Register') }}>Шинээр бүртгүүлэх</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={checkLogin}>
        <Text style={styles.loginText}>Нэвтрэх</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
