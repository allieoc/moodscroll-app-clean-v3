import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Story = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
};

export default function FocusedPage() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch('/.netlify/functions/focused')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Focused News</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fffefc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSource: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
});
