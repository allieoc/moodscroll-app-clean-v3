// app/moods/FocusedPage.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HorizontalStoryRow from '@/components/HorizontalStoryRow';
import { Story } from '@/.expo/types/story';

export default function FocusedPage() {
  const [topStories, setTopStories] = useState<Story[]>([]);
  const [politicsStories, setPoliticsStories] = useState<Story[]>([]);
  const [businessStories, setBusinessStories] = useState<Story[]>([]);
  const [healthStories, setHealthStories] = useState<Story[]>([]);
  const [worldStories, setWorldStories] = useState<Story[]>([]);
  const [redditStories, setRedditStories] = useState<Story[]>([]);

  const baseURL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8888'
    : '';

  const fetchStories = async (endpoint: string, setter: (stories: Story[]) => void) => {
    try {
      const res = await fetch(`${baseURL}/.netlify/functions/focused-${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}`, err);
    }
  };

  useEffect(() => {
    fetchStories('topstories', setTopStories);
    fetchStories('politics', setPoliticsStories);
    fetchStories('world', setWorldStories);
    fetchStories('business', setBusinessStories);
    fetchStories('health', setHealthStories);
    fetchStories('reddit', setRedditStories);
  }, []);

  return (
    <LinearGradient
      colors={['#f1f4f9', '#dfe8f0']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <HorizontalStoryRow title="Top Stories" stories={topStories} color="#fff" />
        <HorizontalStoryRow title="Politics" stories={politicsStories} color="#fde2cf" />
        <HorizontalStoryRow title="World News" stories={worldStories} color="#cce3dc" />
        <HorizontalStoryRow title="Business & Tech" stories={businessStories} color="#dbeafe" />
        <HorizontalStoryRow title="Health & Science" stories={healthStories} color="#e9d5ff" />
        <HorizontalStoryRow title="Trending on Reddit" stories={redditStories} color="#fff7d6" />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
});