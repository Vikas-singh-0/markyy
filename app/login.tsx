import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/styles";
import { Link, router } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

export default function Login() {
  enum signInType {
    Phone,
    Email,
    Google,
    Apple,
  }

  const { signIn } = useSignIn();
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const onSignIn = async (type: signInType) => {
    if (type === signInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phone}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber
        });
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => factor.strategy === 'phone_code');
        console.log(firstPhoneFactor);
        const {phoneNumberId} = firstPhoneFactor;
        const res = await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId
        });
        console.log(res);
        
        router.push({
          pathname: '/verify/[phone]',
          params: {phone: fullPhoneNumber, signin: 'true'}
        }); 
      } catch (err) {
        console.log('err in signin ', JSON.stringify(err));
        if(isClerkAPIResponseError(err)) {
          if(err.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
      behavior="padding"
    >
      <View style={[defaultStyles.container]}>
        <Text style={defaultStyles.header}>Let's get started</Text>
        <Text style={defaultStyles.descriptionText}>Welcome back!</Text>
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
        <View
          style={{
            flex: 1,
            display: "flex",
            gap: 30,
            flexDirection: "column",
            paddingBottom: 200,
          }}
        >
          <TouchableOpacity
            style={[
              phone !== "" ? styles.enabled : styles.disabled,
              defaultStyles.pillButton,
              { marginTop: 20, flexDirection: "column-reverse" },
            ]}
            onPress={() => onSignIn(signInType.Phone)}
          >
            <Text style={[defaultStyles.buttonText]}>Continue</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View
              style={{ flex: 1, height: 1, backgroundColor: Colors.gray }}
            ></View>
            <Text style={{ fontSize: 20, color: Colors.gray }}>or</Text>
            <View
              style={{ flex: 1, height: 1, backgroundColor: Colors.gray }}
            ></View>
          </View>

          <TouchableOpacity
            onPress={() => onSignIn(signInType.Email)}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                marginTop: 10,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Ionicons name="logo-apple" size={24} color={"#000"} />
            <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
              Continue with Apple Id
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSignIn(signInType.Apple)}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                marginTop: 10,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Ionicons name="mail" size={24} color={"#000"} />
            <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
              Continue with Gmail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSignIn(signInType.Google)}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                marginTop: 10,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Ionicons name="logo-google" size={24} color={"#000"} />
            <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
              Continue with gmail
            </Text>
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
});
