import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/styles";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useAuth, useSignUp } from "@clerk/clerk-expo";

export default function Signup() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const { signUp } = useSignUp();
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    const phoneNumber = `${countryCode}${phone}`;
    try {
      await signUp!.create({
        phoneNumber,
        password
      });
      await signUp!.preparePhoneNumberVerification({ strategy: "phone_code" });
      router.push({
        pathname: `/verify/${phone}`,
        params: { phone: phoneNumber, password },
      });
    } catch (error) {
      console.log("error in signup", JSON.stringify(error));
    }
  };
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    console.log("isSigned in", isSignedIn);
  }, [isSignedIn]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
      behavior="padding"
    >
      <View style={[defaultStyles.container]}>
        <Text style={defaultStyles.header}>Let's get started</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number we will send you a code.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="+91">
            {countryCode}
          </TextInput>
          <TextInput
            style={[
              styles.input,
              { flex: 1, marginLeft: 10, letterSpacing: 7 },
            ]}
            placeholder="9455523456"
            keyboardType="phone-pad"
            onChangeText={(e) => setPhone(e)}
          >
            {phone}
          </TextInput>
        </View>
        <Text style={[defaultStyles.buttonText, {color: Colors.dark, marginTop: 20, marginBottom: 20}]}> Password</Text>
        <TextInput
          style={[styles.password, { letterSpacing: 7 }]}
          placeholder="password"
          keyboardType="default"
          onChangeText={(e) => setPassword(e)}
        >
          {password}
        </TextInput>
        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={[defaultStyles.textLink, { marginTop: 40 }]}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </Link>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column-reverse",
            paddingBottom: 100,
          }}
        >
          <TouchableOpacity
            style={[
              phone !== "" ? styles.enabled : styles.disabled,
              defaultStyles.pillButton,
              { marginTop: 20, flexDirection: "column-reverse" },
            ]}
            onPress={onSignup}
          >
            <Text style={[defaultStyles.buttonText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    borderColor: "black",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 0,
  },
  input: {
    // marginLeft: 10,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    padding: 15,
    fontSize: 25,
    margin: "auto",
    fontWeight: 700,
    borderRadius: 20,
  },
  enabled: {
    backgroundColor: Colors.dark,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
  },
  password: {
    width: "100%",
    borderRadius: 20,
    height: 70,
    // marginRight: 0,
    backgroundColor: Colors.lightGray,
  },
});
