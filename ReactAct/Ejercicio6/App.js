import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function App() {
  const frutas = ["Manzana", "Plátano", "Naranja", "Uvas"];

  return (
    <View style={{ flex:1, padding:20 }}>
      <FlatList 
        data={frutas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={{ fontSize:20, margin:5 }}>{item}</Text>}
      />
    </View>
  );
}