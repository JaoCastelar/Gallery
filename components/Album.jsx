import React, { useState, useEffect } from 'react';
import { View, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFotos } from './PickContext';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Album({ route }) {
    const { nomeAlbum, fotosP } = route.params;
    const [foto, setFoto] = useState(null);
    const navigation = useNavigation();
    const { fotos, addFoto } = useFotos();
    
    const fotosAlbum = fotos[nomeAlbum] || []
    
    useEffect(() => {
        getSavedPhotos();
    }, []);
    
    const getSavedPhotos = async () => {
        try {
            const savedPhotos = await AsyncStorage.getItem(`photos_${nomeAlbum}`);
            if (savedPhotos) {
                const parsedPhotos = JSON.parse(savedPhotos);
                
                console.log(fotosAlbum);
                
                if (fotosAlbum.length == 0) {
                    parsedPhotos.forEach(i => {
                        addFoto(nomeAlbum, i);
                    });
                }
                
            }
        } catch (error) {
            console.error('Erro ao recuperar as fotos salvas:', error);
        }
    };

    const limparAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Dados do AsyncStorage limpos com sucesso!');
        } catch (e) {
            console.error('Erro ao limpar o AsyncStorage:', e);
        }
    };
    
    // limparAsyncStorage();
    
    const abrirCamera = async () => {
        await navigation.navigate('Camera', { nomeAlbum: nomeAlbum, fotosP: fotosP  });
    };
    
    const compartilharFoto = async (foto) => {
        if (foto) {
            await Sharing.shareAsync(foto);
        }
    };
    
    return (
        <View style={styles.containerFotos}>
        <ScrollView>
        <View style={styles.fotos}>
        {fotosAlbum.map((foto, index) => (
            <View key={index} style={styles.foto}>
            <TouchableOpacity style={styles.button} onPress={() => compartilharFoto(fotosAlbum[index])}>
            <Image source={{ uri: foto }} style={styles.pick}/>
            </TouchableOpacity>
            </View>
            ))}
            </View>
            </ScrollView>
            <View style={styles.addFoto}>
            <Button title="Abrir Câmera" onPress={() => abrirCamera()} />
            </View>
            </View>
            );
        }
        
        const styles = StyleSheet.create({
            containerFotos: {
                display: 'flex',
                width: '100%',
                height: '100%',
            },
            
            fotos: {
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                padding: 16,
            },
            
            button: {
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                width: '100%',
                height: '100%',
            },
            
            pick: {
                width: '100%',
                height: '100%',
                borderRadius: 15,
            }, 
            
            foto: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 150,
                margin: 10,
            },
            
            addFoto: {
                display: 'flex',
                width: '100%',
            }
        })