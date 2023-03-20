import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import {
  collection,
  addDoc, doc,
  onSnapshot,
  query,
  where,
  orderBy, limit, Timestamp} from "firebase/firestore";
  import { db, auth } from "../../firebase";

const AllStorage = () => {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "storage"),
      where("user", "==", auth.currentUser?.uid),
      orderBy("storageTime", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempStorage = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempStorage.push({id:doc.id,...data});
        
      });
      setStorage(tempStorage);
    });

    return () => {
      unsubscribe();
    };

    // const fetchLastStorage = async () => {
    //   const docRef = doc(
    //     collection(db, "storage"),
    //     where("user", "==", auth.currentUser?.uid),
    //     orderBy("storageTime"),
    //     limit(1));
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     setStorage(docSnap.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // };
    // fetchLastStorage();
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
  const [clock, setClock] = useState("");
  const [storage, setStorage] = useState("");
  const [isStorageShowing, setIsStorageShowing] = useState(false);
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
    } else if (
      (curHr >= 18 && day == "Sunday") ||
      "Monday" ||
      "Wednesday" ||
      "Thursday" ||
      "Saturday"
    ) {
      time = "Evening moon emoji";
      routine = ["Cleanser", "Toner", "Serum", "Moisturizer"];
    } else if (curHr >= 18 && day == "Tuesday") {
      time = "Evening moon emoji";
      routine = ["Cleanser", "Toner", "Serum", "Retinol", "Moisturizer"];
    } else {
      time = "Evening moon emoji";
      routine = ["Cleanser", "Exfoliating Toner", "Serum", "Moisturizer"];
    }
    setDaily(routine);
    setClock(time);
  }, []);

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "storage"), {
      user: auth.currentUser?.uid,
      storage: storage,
      storageTime: Timestamp.now()
    });
    setStorage('');
    
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
    inputContainer: {
      marginTop: 40,
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text>{clock}</Text>
      <Text>Here is your skincare routine: </Text>
      {daily.map((data, index) => {
        return <Text key={index}>{data}</Text>;
      })}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter storage place for your items."
          value={storage}
          onChangeText={(text) => setStorage(text)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsStorageShowing(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Storage place.</Text>
      </TouchableOpacity>

      {isStorageShowing && <AllStorage />}

      {/* also remember we are also going to try to get the most recent
       item in the collection aka newly added document to enable user get the last place we st*/}

      
    </View>
  );
};

export default SkinCareScreen;
