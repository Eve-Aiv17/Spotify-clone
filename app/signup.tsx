import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Save signup info to AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      await AsyncStorage.setItem("userName", username);

      Alert.alert("Success", "Account created successfully!");
      router.push("/dashboard"); // Navigate to login
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while signing up.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require('../assets/images/spotify.png')}
              style={styles.logoImage}
            />

            <Text style={styles.title}>Sign up to</Text>
            <Text style={styles.subtitle}>start listening</Text>

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@domain.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome
                name="google"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign
                name="apple"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.socialText}>Sign up with Apple</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={styles.loginText}
                onPress={() => router.push("/")}
              >
                Log in
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logoImage: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 32, color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 32, color: "#fff", fontWeight: "bold", marginBottom: 30 },
  label: { color: "#fff", alignSelf: "flex-start", marginBottom: 8, fontWeight: "600" },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#1DB954",
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  nextButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
  orText: { color: "#888", marginBottom: 20 },
  socialButton: {
    width: "100%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialText: { color: "#fff", fontWeight: "bold" },
  footerText: { color: "#999", marginTop: 30 },
  loginText: { color: "#fff", fontWeight: "bold", textDecorationLine: "underline" },
});
