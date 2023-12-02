import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Galeria() {
    const [albums, setAlbums] = useState([]);
    const navigation = useNavigation();
    const [novoAlbumNome, setNovoAlbumNome] = useState('');
    
    useEffect(() => {
        
        carregarAlbums();
        
    }, []);
    
    const limparAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Dados do AsyncStorage limpos com sucesso!');
        } catch (e) {
            console.error('Erro ao limpar o AsyncStorage:', e);
        }
    };
    
    // limparAsyncStorage();
    
    const carregarAlbums = async () => {
        try {
            const data = await AsyncStorage.getItem('albums');
            const albumsData = data;
            
            if (albumsData) {
                setAlbums(JSON.parse(albumsData));
            }
            
        } catch (error) {
            console.error('Erro ao carregar álbuns:', error);
        }
    };
    
    const salvarAlbums = async (albumsToSave) => {
        try {
            await AsyncStorage.setItem('albums', JSON.stringify(albumsToSave));
        } catch (error) {
            console.error('Erro ao salvar álbuns:', error);
        }
    };
    
    const criarAlbum = () => {
        if (novoAlbumNome.trim() !== '' && !albums.includes(novoAlbumNome)) {
            Keyboard.dismiss();
            const newAlbums = [...albums, novoAlbumNome];
            setAlbums(newAlbums);
            salvarAlbums(newAlbums);
            setNovoAlbumNome('');
        } else {
            alert('Álbum com nome inválido ou já existente!')
        }
    }
    
    const abrirAlbum = (nomeAlbum) => {
        navigation.navigate('Album', { nomeAlbum });
    }
    
    return (
        <View style={styles.container}>
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
            style={{backgroundColor: 'lightgrey', color: 'black'}}
            placeholder="Nome do novo álbum"
            placeholderTextColor={'black'}
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
        
        