import React, { useState } from 'react';
import { View, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFotos } from './PickContext';
import * as Sharing from 'expo-sharing';

export default function Album({ route }) {
    const { nomeAlbum, fotosP } = route.params;
    const [foto, setFoto] = useState(null);
    const navigation = useNavigation();
    const { fotos, addFoto } = useFotos();

    const fotosAlbum = fotos[nomeAlbum] || []
    
    const abrirCamera = async () => {

        await navigation.navigate('Camera', {nomeAlbum: nomeAlbum, fotosP: fotosP})

    };

    const atualizaFoto = () => {
        if (!foto) {
            setFoto(fotosP)
            const novaFoto = fotosP
            addFoto(nomeAlbum, novaFoto)
        }
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
            {atualizaFoto}
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