import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

type RoundButtonProps = {
    text: String,
    icon: typeof Ionicons.defaultProps,
    onPress?: () => void;
}
const RoundButton = ({text, icon, onPress}: RoundButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.circle}>
            <Ionicons name={icon} size={30} color={Colors.dark}/>
        </View>
        <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.dark
    }
})