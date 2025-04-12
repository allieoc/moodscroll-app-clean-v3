import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import fallbackImage from '@/public/moodscroll.png';

type Story = {
  title: string;
  link: string;
  source: string;
  published: string;
  image?: string;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export default function MellowPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL = Platform.OS === 'web'
    ? 'http://localhost:8888'
    : 'https://moodscroll.netlify.app';

  useEffect(() => {
    const fetchStories = async (endpoint: string, setter: (stories: Story[]) => void) => {
          try {
            const res = await fetch(`${baseURL}/.netlify/functions/${endpoint}`);
            const contentType = res.headers.get('content-type');
            if (!res.ok || !contentType?.includes('application/json')) {
              const text = await res.text(); // log what came back
              throw new Error(`Bad response for ${endpoint}: ${text}`);
            }
        
            const data = await res.json();
            setter(data);
          } catch (err) {
            console.error(`Failed to fetch ${endpoint}`, err);
          }
        };
        fetchStories('mellow', setStories);
  }, []);

  return (
    <LinearGradient colors={['#d0f0fd', '#e0f7fa']} style={styles.container}>
      <Text style={styles.title}>🌈 Mellow News</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#60a5fa" />
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item, index) => `${item.link}-${index}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                if (item.link) {
                  window.open(item.link, '_blank');
                }
              }}
            >
              <Image
                source={{ uri: item.image || fallbackImage }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.headline}>{item.title}</Text>
                <Text style={styles.meta}>{item.source}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0f172a',
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: CARD_WIDTH,
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  headline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#6b7280',
  },
});
