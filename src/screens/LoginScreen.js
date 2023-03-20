import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { app, auth} from "../../firebase";


const LoginScreen = () => {
  // const auth = getAuth(app);
  const [user, setUser] = useState("");
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const navigation = useNavigation();

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

  async function handleSignUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      // console.log(response);
      navigation.navigate("FirstName");
    } catch (error) {
      let message = "";
      
        // if(error instanceof FirebaseError){}
        if(error.code === "auth/weak-password"){
          message = "Enter a strong password of at least 6 characters.";
        }
        /**
         * 
         * https://firebase.google.com/docs/reference/js/auth#autherrorcodes
         */
        if(error.code === "auth/email-already-in-use"){
          message = "Enter a strong password of at least 6 characters.";
        }
      setValue({
        ...value,
        error: message,
      });
    }
  }

  async function handleLogin() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Home");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 8,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#5A3315",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    button2: {
      backgroundColor: "#ffffff",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 8,
      borderColor: "#5A3315",
      borderWidth: 2,
    },
    buttonOutlineText: {
      color: "#5A3315",
      fontWeight: "700",
      fontSize: 16,
    },
    inputContainer1: {
      marginBottom: 10,
    },
    input2: {
      color: "#5A3315",
      fontWeight: "700",
      fontSize: 26,
    },
    buttonText2: {
      color: "#5A3315",
      fontWeight: "600",
      fontSize: 16,
    }
  });
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer1}>
        <Text style={styles.input2}>Let's get you In!</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>{value.error}</Text>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
