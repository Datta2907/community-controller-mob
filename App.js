import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, StatusBar as statusBar } from 'react-native';
import LoginComponent from './screens/login';
import { useFonts, LibreFranklin_400Regular } from '@expo-google-fonts/libre-franklin';
import Variables from './common/constants';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    LibreFranklin_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View
      style={styles.mainContainer}>
      <StatusBar style='light' />
      <KeyboardAvoidingView behavior="padding" style={styles.scrollContainer} enabled>
        <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <LoginComponent />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Variables.colors.blue,
    paddingTop: statusBar.currentHeight
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '25%',
    paddingHorizontal: '10%',
    paddingBottom: '10%'
  }
});
