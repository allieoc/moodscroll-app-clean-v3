import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, Linking } from 'react-native';

type Story = {
  title: string;
  link: string;
  summary: string;
  source: string;
  pubDate?: string;
  image?: string;
};

export default function FocusedPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('https://moodscroll.netlify.app/.netlify/functions/focused');
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching focused stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const renderItem = ({ item }: { item: Story }) => (
    <Pressable onPress={() => Linking.openURL(item.link)} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>{item.source}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
      {item.pubDate && <Text style={styles.date}>{new Date(item.pubDate).toLocaleDateString()}</Text>}
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading focused news...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.link}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  source: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginTop: 4,
  },
  summary: {
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    color: '#999',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
