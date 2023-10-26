import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import IconButton from './IconButton';
import { useNavigation } from '@react-navigation/native';
import { FotoProvider, useFotos } from './PickContext';

const { width, height } = Dimensions.get('window');

export default function ExemploCamera( {route} ) {
    const { fotos, addFoto } = useFotos();
    const { nomeAlbum, FotosP } = route.params
    const [tipoCamera, setTipoCamera] = useState(CameraType.back);
    const [permissao, solicitaPermissao] = Camera.useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const [novaFotoNome, setNovaFotoNome] = useState('');
    const navigation = useNavigation();
    const camera = useRef();
    
    if (!permissao) {
        return <View />;
    }
    
    if (!permissao.granted) {
        return (
            <View style={styles2.container}>
            <Text style={{ textAlign: 'center' }}>Nós precisamos de sua permissão para abrir a camera</Text>
            <Button onPress={solicitaPermissao} title="Conceder permissão" />
            </View>
            );
        }
        
        function mudarTipoCamera() {
            setTipoCamera(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        }
        
        async function tirarFoto() {
            const fotoTirada = await camera.current.takePictureAsync();
            setFoto(fotoTirada);
            setNovaFotoNome(fotoTirada.uri)
        }
        
        function limpaFoto() {
            setFoto(null);
            setNovaFotoNome('');
        }
        
        const salvarFoto = () => {
            addFoto(nomeAlbum, novaFotoNome);
            setNovaFotoNome('');
            navigation.navigate('Album', {nomeAlbum: nomeAlbum, fotosP: novaFotoNome});
        }

        if ( foto !== null ) {
            return (
                <View style={styles2.container}>
                <View>
                <TouchableOpacity style={styles2.photoContainer}>
                    <Image source={{ uri: foto.uri }} width={(width/foto.width) * foto.width} height={(width/foto.width) * foto.height} />
                </TouchableOpacity>
                </View>
                <View style={styles2.buttonContainer}>
                <IconButton name="refresh" onPress={limpaFoto} />
                <IconButton name="save" onPress={salvarFoto} />
                </View>
                </View>
                )
            }
            
            return (
                <FotoProvider>
                <View style={styles2.container}>
                <Camera ref={camera} style={styles2.camera} type={tipoCamera} />
                <View style={styles2.buttonContainer}>
                <IconButton name="refresh" onPress={mudarTipoCamera} />
                <IconButton name="camera"  onPress={tirarFoto}/>
                </View>
                </View>
                </FotoProvider>
                );
            }
            
            const styles2 = StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    width: width,
                    backgroundColor: '#000',
                },
                camera: {
                    flex: 4,
                },
                buttonContainer: {
                    flex: 1,
                    flexDirection: 'row',
                    margin: 40,
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                },
                photoContainer: {
                    flex: 1,
                    width: width,
                },
                photo: {
                    
                }
            });
            