import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import { app,auth, db} from "../../firebase";


const FirstNameScreen = () => {
  const [firstname, setFirstname] = useState("");
  
  const navigation = useNavigation();

 

  const handleGoToLogin = () => {
    navigation.navigate("Login");
  };

  const handleSubmit = () => {

updateProfile(auth.currentUser, {
  displayName: firstname
}).then(() => {
  // Profile updated!
  // ...
  navigation.navigate("Home");
}).catch((error) => {
  // An error occurred
  // ...
});
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 26,
      marginBottom: 24,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    buttonNavigate: {
      width: "60%",
      marginTop: -250,
      marginLeft: -80,
      alignItems: "left",
      marginBottom: 180,
     
    },
    button: {
      backgroundColor: "#5A3315",
      width: "59%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#5A3315",
      borderWidth: 2,
    },
    buttonOutlineText: {
      color: "#5A3315",
      fontWeight: "700",
      fontSize: 16,
    },
    input2: {
      color: "#5A3315",
      fontWeight: "700",
      fontSize: 18,
    },
  });
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.buttonNavigate}>
        <TouchableOpacity onPress={handleGoToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>    
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input2}>What would you like to be called?</Text>
        <TextInput
          placeholder="Please enter name" value =  {firstname} onChangeText={(text) => setFirstname(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
      </View>

      
    </KeyboardAvoidingView>
  );
};

export default FirstNameScreen;
