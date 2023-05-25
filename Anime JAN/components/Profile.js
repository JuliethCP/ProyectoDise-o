import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "497492911504-l137dn2ugof56iv0sfgjnue0541svnka.apps.googleusercontent.com",
    iosClientId: "497492911504-26s82532vueb8cmedj0rl0eenor8m6iq.apps.googleusercontent.com",
    expoClientId: "497492911504-8a864mrjnc9k2q659d1mo39cr38k84kq.apps.googleusercontent.com",
  });


  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }


  };
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    navigation.navigate("Login");
  };


  return (
    <View style={styles.container}>
      {!userInfo ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View style={styles.card}>
  {userInfo?.picture && (
    <Image source={{ uri: userInfo?.picture }} style={styles.image} />
  )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
          <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
        </View>
      )}
      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
    card: {
      width: '85%',
      height: '40%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });