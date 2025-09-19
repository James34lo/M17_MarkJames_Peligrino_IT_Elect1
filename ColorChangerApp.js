// ColorChangerApp.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ColorChangerApp() {
  const [bgColor, setBgColor] = useState('#ffffff'); // default white

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Button title="white" onPress={() => setBgColor('white')} />
      <Button title="Light Blue" onPress={() => setBgColor('#add8e6')} />
      <Button title="Light Green" onPress={() => setBgColor('#90ee90')} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 ,padding:50,paddingTop:50,margin :50}
  
});