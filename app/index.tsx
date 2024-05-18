import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { defaultStyles } from "@/constants/styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets, error] = useAssets(require("@/assets/videos/intro.mp4"));

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.COVER}
          shouldRasterizeIOS
          isLooping
          isMuted
          shouldPlay
        />
      )}
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "white",
            marginLeft: 20,
          }}
        >
          Ready to change the way you spend money ?
        </Text>
      </View>
      <View style={styles.footer}>
        <Link style={defaultStyles.pillButton} href="/login" asChild>
          <TouchableOpacity style={{ width: 100}}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: 800 }}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/signup" style={defaultStyles.pillButton} asChild>
          <TouchableOpacity style={{backgroundColor: '#ffff', width: 150}}>
            <Text style={{ color: Colors.dark, fontSize:22, fontWeight: 800 }}>SignUp</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "grey",
  },
  header: {
    position: "absolute",
    display: "flex",
    top: "10%",
    // backgroundColor: 'red',
    height: "20%",
    width: "90%",
    color: "white",
  },
  footer: {
    // backgroundColor: "red",
    bottom: 100,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
    width: "100%",
  },
});
