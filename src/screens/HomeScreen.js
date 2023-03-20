/** @format */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app,auth } from "../../firebase";

const HomeScreen = () => {
  // const auth = getAuth(app);
  const [user, setUser] = useState("");
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
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      setUser({
        ...user,
        error: error.message,
      });
    }
  };

  const handleMakeUp = async () => {
    navigation.navigate("MakeUp");
  };
  const handleSkinCare = async () => {
    navigation.navigate("SkinCare");
  };
  const handleCustomizeSkin = async () => {
    navigation.navigate("CustomizeSkin");
  };
  const handleBeautyTips = async () => {
    navigation.navigate("BeautyTips");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#5A3315",
      width: "50%",
      padding: 10,
      borderRadius: 10,
      marginTop: 38,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    small: {
      fontSize: 24,
    },
    big: {
      fontSize: 36,
      marginBottom: 26,
    },
  });
  return (
    <View style={styles.container}>
      {/* email: {auth.currentUser?.email} */}
      <Text style ={styles.big}>Hello {auth.currentUser?.displayName},</Text>
      <Text style ={styles.small}>What would you want to do with Estee today?</Text>
      <TouchableOpacity onPress={handleMakeUp} style={styles.button}>
          <Text style={styles.buttonText}>MakeUp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkinCare} style={styles.button}>
          <Text style={styles.buttonText}>SkinCare</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBeautyTips} style={styles.button}>
          <Text style={styles.buttonText}>Note beauty tips</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
