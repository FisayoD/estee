/** @format */

import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const AllStorage = () => {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "storage"),
      where("user", "==", auth.currentUser?.uid)
    );


    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempStorage = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempStorage.push({id:doc.id,...data});
        
      });

       
      setStorage(Storage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  

  return (
    <View>
      {storage.map((item) => (
        <Text key={item.id}>{item.storage}</Text>
      ))}
    </View>
  );
};


const SkinCareScreen = () => {
  const [daily, setDaily] = useState([]);
  const [clock, setClock] = useState('');
  const navigation = useNavigation();

  const handleBack = async () => {
    navigation.navigate("Home");
  };

  
  useEffect(() => {
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
  let routine = [];
  if (curHr < 17 && curHr > 7) {
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
  setDaily(routine);
  setClock(time);    
  }, [])
  
 

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
      <Text>{clock}</Text>
      <Text>Here is your skincare routine: </Text>
      {daily.map((data, index) => {
        return <Text key={index}>{data}</Text>
      })}


       <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter storage place for your items."
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          style={styles.input}
        />
      </View>

      {/* also remember we are also going to try to get the most recent
       item in the collection aka newly added document to enable user get the last place we st*/}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SkinCareScreen;
