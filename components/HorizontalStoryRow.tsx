import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Story } from '@/.expo/types/story';
import fallbackImage from '../assets/images/moodscroll.png';

interface Props {
  title: string;
  stories: Story[];
  color: string;
}

export default function HorizontalStoryRow({ title, stories, color }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        keyExtractor={(item, index) => `${title}-${index}`}
        contentContainerStyle={styles.scroll}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: color }]} // 💥 Apply section color to card
            onPress={() => {
              if (item.link) {
                window.open(item.link, '_blank');
              }
            }}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <Image source={fallbackImage} style={styles.image} />
            )}
            <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.source}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 24,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  scroll: {
    gap: 12,
    paddingRight: 16,
  },
  card: {
    width: 240,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  meta: {
    fontSize: 12,
    color: '#333',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
  },
});