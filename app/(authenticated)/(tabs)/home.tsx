import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import DropDown from "@/components/DropDown";
import { useBalanceStore } from "@/store/balance";
import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";

const home = () => {
  const { clearTransactions, balance, runTransaction, transactions } =
    useBalanceStore();
  console.log(balance(), transactions);

  const onAddMoney = () => {
    runTransaction({
      amount: Math.floor(Math.random() * 1000),
      id: Math.random().toString(),
      date: new Date(),
      title: "Added Money",
    });
    console.log("bal", balance());
  };

  useEffect(() => {
    console.log("hi");
  }, [balance]);
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton
          text={"Add money"}
          onPress={onAddMoney}
          icon={"add"}
        ></RoundButton>
        <RoundButton text={"Exchange Money"} icon={"refresh"}></RoundButton>
        <RoundButton text={"Details"} icon={"list"}></RoundButton>
        <DropDown />
      </View>

      <View
        style={{
          marginTop: 15,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            padding: 10,
            color: "black",
          }}
        >
          Transactions
        </Text>
      </View>

      {transactions.map((transaction) => (
        <View key={transaction.id}
          style={[
            defaultStyles.container,
            { 
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: 'center',
              // justifyContent: "space-between",
              gap: 10
            },
          ]}
        >
          <View style={styles.circle}>
            <Ionicons name={"add"} size={16} />
          </View>
          <View style={styles.content}>
            <Text style= {{ fontSize: 20 }}>{transaction.title}</Text>
            <Text>{transaction.date.toLocaleString()}</Text>
          </View>
          <View style={styles.amount}>
            <Text>{transaction.amount}</Text>
          </View>
        </View>
      ))}
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList/>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
  circle: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontWeight: 500,
    fontSize: 24,
    flex: 4,
    // backgroundColor: "grey",
  },
  amount: {
    flex: 1,
    // backgroundColor: "grey",
    // marginLeft: "50%",
  },
});
