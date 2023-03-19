import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
 
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

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
      marginTop: 5,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#5A3315",
      width: "100%",
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
  });
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
<Text>Welcome to Estee</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
         
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
