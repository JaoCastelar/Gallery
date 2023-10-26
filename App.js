import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Galeria from './components/Galeria';
import Album from './components/Album';
import Camera from './components/Camera';
import { AlbumProvider } from './components/AlbumContex';
import { FotoProvider } from './components/PickContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AlbumProvider>
      <FotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Galeria">
          <Stack.Screen name="Gallery" component={Galeria} />
          <Stack.Screen name="Album" component={Album} />
          <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
      </FotoProvider>
    </AlbumProvider>
  );
}
