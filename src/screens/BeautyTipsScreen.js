/** @format */

import React, { Fragment, useState } from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
const BeautyTipsScreen = () => {
  const [tips, setTips] = useState("");

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "tips"), {
      user: auth.currentUser?.uid,
      tip: tips,
    });
    console.log("Document written with ID: ", docRef.id);
  };
  const handleGetTips = () => {};
  return (
    <View>
      <Text>What new Skin Care Tip would you love to store?</Text>
      <TextInput
        placeholder="Please enter tip"
        value={tips}
        onChangeText={(text) => setTips(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetTips} style={styles.button}>
        <Text style={styles.buttonText}>Get all my Tips</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BeautyTipsScreen;

const AllTips = () => {
  return (
    <View>
      {["hi"].map((item) => (
        <Text>{item}</Text>
      ))}
    </View>
  );
};
