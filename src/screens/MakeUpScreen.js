import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MakeUpScreen = () => {
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
        <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text>Hey Bestie, Let's get your make up done in no time.</Text>
      {/* This is for camera to let people input their face so it can identify what they look like */}
      <Text>Instructions:</Text>
      <Text>Do X </Text>
      <Text>Do Y</Text>
      <Text>Do Z</Text>
      <TouchableOpacity onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MakeUpScreen;
