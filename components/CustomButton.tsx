import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import React from "react";
import { Link } from "expo-router";

const CustomButton = ({ text }) => {
  return (
    <View>
      {/* <Pressable style={styles.loginBtn}> */}
        <Link href="/login" style={styles.loginBtn}>Login </Link>
      {/* </Pressable> */}
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginBtn: {
    height: 40,
    display: "flex",
    backgroundColor: "white",
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    alignContent: "center",
    position: "relative",
  },
});
