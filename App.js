import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import Galeria from './components/Galeria';
import Album from './components/Album';
import Camera from './components/Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlbumProvider } from './components/AlbumContex';
import { FotoProvider } from './components/PickContext';

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  useEffect(() => {
    const retrieveTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error retrieving theme from AsyncStorage:', error);
      }
    };
    
    retrieveTheme();
  }, []);
  
  const HeaderRight = ({ toggleTheme }) => (
    <Appbar.Header>
    <Appbar.Action icon="lightbulb-outline" color={isDarkTheme ? 'white' : 'black'} onPress={toggleTheme} />
    </Appbar.Header>
    );
    
    const toggleTheme = () => {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      const storeTheme = async () => {
        try {
          await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
          console.error('Error storing theme in AsyncStorage:', error);
        }
      };
      
      storeTheme();
    };
    
    return (
      <AlbumProvider>
      <FotoProvider>
      <PaperProvider theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Galeria">
      <Stack.Screen
      name="Gallery"
      component={Galeria}
      initialParams={{ isDarkTheme }}
      options={{
        headerRight: () => <HeaderRight toggleTheme={toggleTheme} />,
        headerRightContainerStyle: {
          top: -14,
        },
      }}
      />
      <Stack.Screen
      name="Album"
      component={Album}
      options={{
        headerRight: () => <HeaderRight toggleTheme={toggleTheme} />,
        headerRightContainerStyle: {
          top: -14,
        },
      }}
      />
      <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
      </FotoProvider>
      </AlbumProvider>
      );
    }
    