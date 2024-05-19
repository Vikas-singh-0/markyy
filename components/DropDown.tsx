import { StyleSheet, Text, View } from 'react-native'; 
// import * as DropdownMenu from 'zeego/dropdown-menu'
import React from 'react'
import RoundButton from './RoundButton';

const DropDown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={'ellipse-horizontal'} text={'More'}/>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}

export default DropDown

const styles = StyleSheet.create({})