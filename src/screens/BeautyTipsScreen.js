/** @format */

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  FieldValue
} from "firebase/firestore";
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
  button2: {
   
      backgroundColor: "#5A3315",
      width: "60%",
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
      alignItems: "center",
   
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  big: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 200,
  },
  medium: {
    fontSize: 24,
    marginBottom: 30,
  },
  center: {
    marginLeft: 15,
    marginRight: 15,
  },
  buttonNavigate: {
    width: "60%",
    marginTop: 30,
    alignItems: "left",
    marginBottom: -30,
  },
});
const AllTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "tips"),
      where("user", "==", auth.currentUser?.uid)
    );


    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempTips = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempTips.push({id:doc.id,...data});
        
      });

       
      setTips(tempTips);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  

  return (
    <View>
      {tips.map((item) => (
        <Text key={item.id} style={styles.medium}>{item.tip}</Text>
      ))}
    </View>
  );
};

const BeautyTipsScreen = () => {
  const [tips, setTips] = useState("");
  const [isTipsShowing, setIsTipsShowing] = useState(false);
  const navigation = useNavigation();


  const handleBack = async () => {
    navigation.navigate("Home");
  };

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "tips"), {
      user: auth.currentUser?.uid,
      tip: tips,
    });
  };
  //   const handleGetTips = () => {

  //   };
  return (
    <View style = {styles.center}>
      <View style={styles.buttonNavigate}>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.big}>What new Skin Care Tip would you love to store?</Text>
      <TextInput
        placeholder="Please enter tip"
        value={tips}
        onChangeText={(text) => setTips(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsTipsShowing(true);
        }}
        style={styles.button2}
      >
        <Text style={styles.buttonText}>Get all my Tips</Text>
      </TouchableOpacity>
      {isTipsShowing && <AllTips />}
    </View>
  );
};

export default BeautyTipsScreen;
