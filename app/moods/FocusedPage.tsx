import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Platform } from 'react-native';
import HorizontalStoryRow from '@/components/HorizontalStoryRow';
import { Story } from '@/.expo/types/story';

export default function FocusedPage() {
  const [topStories, setTopStories] = useState<Story[]>([]);
  const [politicsStories, setPoliticsStories] = useState<Story[]>([]);
  const [businessStories, setBusinessStories] = useState<Story[]>([]);
  const [healthStories, setHealthStories] = useState<Story[]>([]);
  const [worldStories, setWorldStories] = useState<Story[]>([]);
  const [redditStories, setRedditStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL = 'https://moodscroll-app.netlify.app';

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

    Promise.all([
      fetchStories('focused-topstories', setTopStories),
      fetchStories('focused-politics', setPoliticsStories),
      fetchStories('focused-world', setWorldStories),
      fetchStories('focused-business', setBusinessStories),
      fetchStories('focused-health', setHealthStories),
      fetchStories('focused-reddit', setRedditStories),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#444" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.page}>
      <HorizontalStoryRow title="Top Stories" stories={topStories} color="#eef2f5" />
      <HorizontalStoryRow title="Politics" stories={politicsStories} color="#fce4d6" />
      <HorizontalStoryRow title="World News" stories={worldStories} color="#e0f2f1" />
      <HorizontalStoryRow title="Business & Tech" stories={businessStories} color="#e3f2fd" />
      <HorizontalStoryRow title="Health & Science" stories={healthStories} color="#f3e5f5" />
      <HorizontalStoryRow title="Trending on Reddit" stories={redditStories} color="#fff3e0" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
