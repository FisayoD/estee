import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector';

const MakeUpScreen = () => {
  const navigation = useNavigation();


  const handleBack = async () => {
    navigation.navigate("Home");
  };

  // <Camera
  //   // other props
  //   onFacesDetected={handleFacesDetected}
  //   faceDetectorSettings={{
  //     mode: FaceDetector.FaceDetectorMode.fast,
  //     detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
  //     runClassifications: FaceDetector.FaceDetectorClassifications.none,
  //     minDetectionInterval: 100,
  //     tracking: true,
  //   }}
  // />

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
    big: {
      fontSize: 32,
      marginBottom: 30,
    },
    small: {
      fontSize: 18,
      marginBottom: 15,
      fontWeight: 500,
      marginLeft: 15,
      marginRight: 15,
    },
    medium: {
      fontSize: 22,
      marginBottom: 18,
    },
    buttonNavigate: {
      width: "60%",
      marginTop: -90,
      marginLeft: -90,
      alignItems: "left",
      marginBottom: 70,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.buttonNavigate}>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      </View>
      <Text style = {styles.big}>Hey Bestie, Let's get your make up done in no time.</Text>
      {/* This is for camera to let people input their face so it can identify what they look like */}
      <Text style={styles.medium}>Instructions:</Text>
      <Text style={styles.small}>We advice for a very simple make up and this guide is towards a very simple look.</Text>
      <Text style={styles.small}>Once you hack this you can check out some tips we have to step up the game</Text>
      <Text style={styles.small}>Use your brush or blender to apply powder or foundation or both across your face.</Text>
      <Text style={styles.small}>Take a bit of eye shadow with a brush and apply over your eye, our model
         can verify if you are doing this correrctly.</Text>
         <Text style={styles.small}>Trace your lips with your bare hands and use an eye pencil to line your lips.</Text>
      <Text style={styles.small}>Take a bit of lip gloss or lipstick and apply on your lips, our model can verify this correctly.</Text>
     

      {/* <TouchableOpacity onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>Get tips</Text>
      </TouchableOpacity> */}

      {/* This one takes you to a new page where you can get tips and go back to make up screen, finito! */}

    </View>
  );
};

export default MakeUpScreen;
