import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Types
type Song = { id: string; title: string; artist: string };
type Playlist = { id: string; title: string; description: string };

// Dummy data
const recentlyPlayed: Song[] = [
  { id: "1", title: "Song A", artist: "Artist 1" },
  { id: "2", title: "Song B", artist: "Artist 2" },
  { id: "3", title: "Song C", artist: "Artist 3" },
  { id: "4", title: "Song D", artist: "Artist 4" },
];

const recommended: Playlist[] = [
  { id: "1", title: "Playlist X", description: "Top hits" },
  { id: "2", title: "Playlist Y", description: "Chill vibes" },
  { id: "3", title: "Playlist Z", description: "Workout mix" },
  { id: "4", title: "Playlist W", description: "Relaxing" },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) setUserName(storedName);
    };
    fetchUserName();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.clear(); // Remove saved login data
          router.push("/"); // Redirect to login screen
        },
      },
    ]);
  };

  const renderSong = ({ item }: { item: Song }) => (
    <View style={styles.card}>
      <View style={styles.albumArt} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.artist}</Text>
    </View>
  );

  const renderPlaylist = ({ item }: { item: Playlist }) => (
    <View style={styles.playlistCard}>
      <View style={styles.playlistArt} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
      <Text style={styles.playlistSubtitle}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ Header with welcome and logout button */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {userName} 🎧</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        />

        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <FlatList
          data={recommended}
          renderItem={renderPlaylist}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  welcome: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  logoutButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: { color: "#000", fontWeight: "bold", fontSize: 14 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
    marginBottom: 10,
  },
  albumArt: {
    width: "100%",
    height: 100,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  cardSubtitle: { color: "#999", fontSize: 12 },
  playlistCard: {
    width: 140,
    height: 160,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
  },
  playlistArt: {
    width: "100%",
    height: 100,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
  },
  playlistTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  playlistSubtitle: { color: "#999", fontSize: 12 },
});
