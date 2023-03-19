/** @format */

import React, { useEffect, useState } from "react";
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
        <Text key={item.id}>{item.tip}</Text>
      ))}
    </View>
  );
};

const BeautyTipsScreen = () => {
  const [tips, setTips] = useState("");
  const [isTipsShowing, setIsTipsShowing] = useState(false);

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "tips"), {
      user: auth.currentUser?.uid,
      tip: tips,
    });
  };
  //   const handleGetTips = () => {

  //   };
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
      <TouchableOpacity
        onPress={() => {
          setIsTipsShowing(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get all my Tips</Text>
      </TouchableOpacity>
      {isTipsShowing && <AllTips />}
    </View>
  );
};

export default BeautyTipsScreen;
