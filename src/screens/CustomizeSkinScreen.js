/** @format */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomizeSkinScreen = () => {
  const navigation = useNavigation();

  const handleBack = async () => {
    navigation.navigate("Home");
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
      This should just be a note like file that lets you update it with skincare tips finito.
    </View>
  );
};

export default CustomizeSkinScreen;
