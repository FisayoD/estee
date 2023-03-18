/** @format */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase";

const HomeScreen = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState('');
  const navigation = useNavigation();

  // const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
       
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);
  console.log(user);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace("Login");
    } catch (error) {
      setUser({
        ...user,
        error: error.message,
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#5A3315",
      width: "60%",
      padding: 15,
      borderRadius: 10,
      marginTop: 40,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
