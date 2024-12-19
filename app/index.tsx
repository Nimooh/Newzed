import { Navbar } from "@/components/Navbar";
import { PostForm } from "@/components/PostForm";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors()
  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
        <SafeAreaView style={[styles.root,{backgroundColor: colors.background}]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.body}></ScrollView>
          <Navbar/>          
        </SafeAreaView>
      </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  body: {
    flex:1,

  }
})