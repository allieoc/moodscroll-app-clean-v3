// app/moods/focused.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Linking, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';

type Story = {
  title: string;
  link: string;
  source: string;
  published: string;
};

export default function FocusedPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://moodscroll.netlify.app/.netlify/functions/focused')
      .then((res) => res.json())
      .then((data) => {
        setStories(data.stories || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching focused stories:', err);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧠 Focused News</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : (
        stories.map((story, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.meta}>
              {story.source} · {story.published}
            </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(story.link)}
            >
              Read more →
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1e1e1e',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  link: {
    color: '#007AFF',
    fontWeight: '500',
  },
});
