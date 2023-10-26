import React, { useState } from 'react';
import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAlbums } from './AlbumContex';

export default function Galeria() {
  const { albums, addAlbum, error, setError } = useAlbums();
  const navigation = useNavigation();
  const [novoAlbumNome, setNovoAlbumNome] = useState('');

  const criarAlbum = () => {
    if (novoAlbumNome.trim() !== '') {
        Keyboard.dismiss();
      addAlbum(novoAlbumNome);
      setNovoAlbumNome('');
    }
  }

  const abrirAlbum = (nomeAlbum) => {
    navigation.navigate('Album', { nomeAlbum });
  }

  setTimeout(() => {
    setError(null);
  }, 4000);


  return (
      <View style={styles.container}>
        {error && 
        <View style={styles.errorBox}>
            <View style={styles.errorCont}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </View>
        }
        <ScrollView style={styles.scroll}>
        <View style={styles.albuns}>
            {albums.map((album, index) => (
                <View key={index} style={styles.album}>
                    <TouchableOpacity style={styles.button} onPress={() => abrirAlbum(album)}>
                        <Text style={styles.buttonText}>{album}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
        </ScrollView>
      <View style={styles.criarAlbum}>
        <TextInput
            style={styles.input}
            placeholder="Nome do novo álbum"
            value={novoAlbumNome}
            onChangeText={(text) => setNovoAlbumNome(text)}
        />
        <Button title="Criar Álbum" onPress={criarAlbum} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

    errorBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    errorCont: {
        backgroundColor: '#fff',
        width: '60%',
        height: '20%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },

    errorText: {
        fontWeight: 'bold',
        fontSize: 18
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },

    scroll: {
        width: '100%',
        height: 'auto',
    },

    album: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        margin: 10,
    },
    
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#2b80ff',
        borderRadius: 15,
        width: '100%',
        height: '100%',
    },

    buttonText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },

    albuns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 16,
    },

    criarAlbum: {
        display: 'flex',
        width: '100%',
    },
  });
