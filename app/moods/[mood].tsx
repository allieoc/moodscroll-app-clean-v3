import { useLocalSearchParams } from 'expo-router';
import FocusedPage from './FocusedPage';
import MellowPage from './MellowPage';
import ListenPage from './ListenPage'

export default function MoodRouter() {
  const { mood } = useLocalSearchParams();

  if (mood === 'focused') return <FocusedPage />;
  if (mood === 'mellow') return <MellowPage />;
  if (mood === 'listen') return <ListenPage />;

  return null; // or a fallback screen
}