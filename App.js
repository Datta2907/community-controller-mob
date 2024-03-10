import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import LoginComponent from './screens/login';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, LibreFranklin_400Regular } from '@expo-google-fonts/libre-franklin';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    LibreFranklin_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient
      style={styles.scrollContainer}
      colors={['#24297A', '#333994', '#424799']}>
      <StatusBar style='light' />
      <KeyboardAvoidingView behavior="padding" style={styles.scrollContainer} enabled>
        <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <LoginComponent />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '30%',
    paddingHorizontal: '10%',
    paddingBottom: '10%'
  }
});
