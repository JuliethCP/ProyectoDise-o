import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
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
    if (response?.type === "success") {
      // setToken(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
    }
  }

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
      setUserInfo(user);
      navigation.navigate('TabNavigator');
    } catch (error) {
      // Add your own error handler here
    }
  };

  // Agrega esta constante para definir la imagen de fondo
  const image = { uri: "https://wallpaperaccess.com/full/2444776.jpg" };

  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => promptAsync()} style={[styles.googleButton, {position: 'absolute' ,zIndex: 1, }]}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        {!userInfo && (
          <TouchableOpacity onPress={() => promptAsync()}  style={styles.customButton}>
            <Image source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7b1877f2-3c6c-4084-87cc-3eaaa944c5ee/dee2ta5-9795c9dc-d102-433b-b9bb-c9a9e3b9b5e4.jpg/v1/fill/w_1280,h_720,q_75,strp/wallpaper_spirited_away_chihiro_by_miojosopa_dee2ta5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvN2IxODc3ZjItM2M2Yy00MDg0LTg3Y2MtM2VhYWE5NDRjNWVlXC9kZWUydGE1LTk3OTVjOWRjLWQxMDItNDMzYi1iOWJiLWM5YTllM2I5YjVlNC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.GI54QYJDaLGPfMpC_w6rmyxeFKaBcTxDINXTvFdabj4' }} style={{ width: 275, height: 105, borderRadius: 40}} />
            </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleButtonText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      justifyContent: 'center',
      left: 40,
    },
    buttonContainer: {
      position: 'relative',
      top: 200,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 40,
    },
  });