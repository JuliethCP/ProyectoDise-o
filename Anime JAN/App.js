import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { SearchBar } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons'; 


//importar los componentes del proyecto
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';
import CategoryList from './components/CaregoryList';
import CategoriasScreen from './components/CategoriasScreen';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Profile from './components/Profile';



const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AnimeList" component={AnimeList} options={{ headerShown: false }}/>
      <Stack.Screen name="AnimeDetails" component={AnimeDetails} /> 
    </Stack.Navigator>
  );
}


function Categorias() {
  return (
      <Stack.Navigator>
      <Stack.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} />
      <Stack.Screen name="CategoriasScreen" component={CategoriasScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

  );
}

function Buscar() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="SearchBar" component={SearchBar} options={{ headerShown: false }} />
    <Stack.Screen name="AnimeDetails" component={AnimeDetails} /> 
    </Stack.Navigator>
  );
}

function Perfil() {
  return (
    <Stack.Navigator>
   <Stack.Screen name="Perfila" component={Profile} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator(){
  return(

      <Tab.Navigator>
        <Tab.Screen 
          name="Home" component={HomeScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" size={size} color={color} /> )}}/>
        <Tab.Screen 
          name="Buscar" component={Buscar} 
          options={{ 
            tabBarIcon: ({ color, size }) => (<Ionicons name="search-outline" size={size} color={color} />)}}/>
        <Tab.Screen 
          name="Categorias" component={Categorias} 
          options={{ 
            tabBarIcon: ({ color, size }) => (<Ionicons name="list-outline" size={size} color={color} />)}}/>
        <Tab.Screen 
          name="Perfil" component={Perfil} 
          options={{ 
            tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />)}}/>
      </Tab.Navigator>
  
  );
}
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}  />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
    
  );
}