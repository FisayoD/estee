/** @format */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SkinCareScreen = () => {
  const navigation = useNavigation();

  const handleBack = async () => {
    navigation.navigate("Home");
  };

  let today = new Date();
  let curHr = today.getHours();
  let time;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];
  let routine = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];
  if (curHr < 17) {
    time = "Daytime sunshine emoji";
  } else if (curHr >= 18 && day == "Sunday"||"Monday"||"Wednesday"||"Thursday"||"Saturday"){
    time = "Evening moon emoji";
    routine = ["Cleanser", "Toner", "Serum", "Moisturizer"];
  }
  else if (curHr >= 18 && day == "Tuesday"){
    time = "Evening moon emoji";
    routine = ["Cleanser", "Toner", "Serum", "Retinol", "Moisturizer"];
  }
  else{
    time = "Evening moon emoji";
    routine = ["Cleanser", "Exfoliating Toner", "Serum", "Moisturizer"];
    
  }

 

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
      {/* I want to be able to see routine and change it tbh not sure how to. */}
      <Text>{time}</Text>
      <Text>Here is your skincare routine: </Text>
      <Text></Text>
    </View>
  );
};

export default SkinCareScreen;
