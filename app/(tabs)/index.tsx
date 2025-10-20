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
  View,
} from "react-native";
import appleIcon from "../../assets/images/apple.png";
import googleIcon from "../../assets/images/google.png";
import logo from "../../assets/images/spotify.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      Alert.alert("Success", "Account created successfully!");
      router.push("/dashboard"); // goes back to login
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during Login.");
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
            <Image source={logo} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.title}>Log In to</Text>
            <Text style={styles.subtitle}>start listening</Text>

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@domain.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={googleIcon} style={styles.socialIcon} />
              <Text style={styles.socialText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={appleIcon} style={styles.socialIcon} />
              <Text style={styles.socialText}>Login with Apple</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text
                style={styles.signupText}
                onPress={() => router.push("/signup")}
              >
                Sign Up
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
  logoImage: { width: 100, height: 100, marginBottom: 25 },
  title: { fontSize: 40, color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 35, color: "#fff", fontWeight: "bold", marginBottom: 30 },
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
  button: {
    backgroundColor: "#1DB954",
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonText: { color: "#000", fontSize: 20, fontWeight: "bold" },
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
  socialIcon: { width: 20, height: 20, marginRight: 10 },
  socialText: { color: "#fff", fontWeight: "bold" },
  footerText: { color: "#999", marginTop: 30 },
  signupText: { color: "#fff", fontWeight: "bold", textDecorationLine: "underline" },
});
