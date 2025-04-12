import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Story } from '@/.expo/types/story';
import  fallbackImage  from '../public/moodscroll.png';

interface Props {
  title: string;
  stories: Story[];
  color: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.75, 320);

export default function HorizontalStoryRow({ title, stories, color }: Props) {
  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${title}-${index}`}
        contentContainerStyle={{ paddingLeft: 16, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: color }]}
            onPress={() => {
              if (item.link) {
                window.open(item.link, '_blank');
              }
            }}
          >
            <Image
                source={item.image ? { uri: item.image } : fallbackImage}
                style={styles.image}
                />
            <View style={styles.textContainer}>
              <Text numberOfLines={3} style={styles.headline}>{item.title}</Text>
              <Text style={styles.meta}>{item.source}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    paddingLeft: 4,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 140,
  },
  textContainer: {
    padding: 12,
  },
  headline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#6b7280',
  },
});
