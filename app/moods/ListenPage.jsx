import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// type Story = {
//   title: string;
//   link: string;
//   pubDate: string;
//   source: string;
//   description: string;
// };

export default function ListenPage() {
  const [stories, setStories] = useState<Story[any]>([]);

    useEffect(() => {
      fetch('/.netlify/functions/listen')
        .then(res => res.json())
        .then(data => setStories(data))
        .catch(console.error);
    }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎧 Tuned In</Text>
      <Text style={styles.paragraph}>Podcasts and videos just for you.</Text>
      <View style={styles.container}>
            <FlatList
              data={stories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSource}>{item.source} · {new Date(item.pubDate).toLocaleDateString()}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              )}
            />
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 32,
  },
  paragraph: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
  },
});
