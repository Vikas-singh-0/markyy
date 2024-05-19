import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import DropDown from "@/components/DropDown";

const home = () => {
  const balance = 123;
  const onAddMoney = () => {

  }
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton text={'Add money'} onPress={onAddMoney} icon={'add'} ></RoundButton>
        <RoundButton text={'Exchange Money'} icon={'refresh'} ></RoundButton>
        <RoundButton text={'Details'} icon={'list'} ></RoundButton>
        <DropDown/>
      </View>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
    backgroundColor: "grey",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
  },
  balance: {
    fontSize: 60,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 30,
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: "space-around"
  },
});
