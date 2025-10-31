import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.slice(0,10))); // solo 10
  }, []);

  return (
    <View style={{ flex:1, padding:20 }}>
      <FlatList 
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={{ margin:5 }}>{item.title}</Text>}
      />
    </View>
  );
}