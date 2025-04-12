// app/moods/[mood].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import FocusedPage from './FocusedPage';
import MellowPage from './MellowPage';
import ListenPage from './ListenPage';

export default function MoodPager() {
  const { mood } = useLocalSearchParams();

  const pageMap = {
    focused: 0,
    mellow: 1,
    listen: 2,
  };

  const initialPage = pageMap[mood as keyof typeof pageMap] ?? 0;

  return (
    <PagerView style={styles.pager} initialPage={initialPage}>
      <View key="1">
        <FocusedPage />
      </View>
      <View key="2">
        <MellowPage />
      </View>
      <View key="3">
        <ListenPage />
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
