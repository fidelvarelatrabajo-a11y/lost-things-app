import { Text, TextInput, TouchableOpacity, View, Button } from "react-native"
import { styles } from "../styles/styles"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export function GenerateReportPage (){
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const recoveryInfo = ()=> {
        console.log(description);
    }
     // Seleccionar imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
    // Obtener ubicación
  const getLocation = async () => {
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== "granted") {
       alert("Permiso de ubicación denegado");
       return;
     }
     let loc = await Location.getCurrentPositionAsync({});
     setLocation(loc.coords);
  };
    // Subir imagen a Firebase
  const uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = Date.now() + ".jpg";
    const storageRef = ref(storage, "reports/" + filename);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  // Guardar reporte en Firestore
  const saveReport = async () => {
    if (!image || !description || !location) {
      alert("Falta información");
      console.log('Falta información')
      return;
    }

  const imageUrl = await uploadImageAsync(image);

    await addDoc(collection(db, "reportes"), {
      description,
      imageUrl,
      location,
      createdAt: new Date(),
    });

    alert("Reporte guardado ✅");
  };
  return (
    <View style={styles.container}>
      <Text style ={styles.title}> Genera un reporte 🔎</Text>
      <TextInput 
        style={styles.input}
        value={description}
        placeholder="Descripcion del objeto encontrado"
        onChangeText={setDescription}        
      ></TextInput>

     <TouchableOpacity style = {styles.buttonHome}>
        <Text style = {styles.buttonText} onPress={pickImage}>Seleccionar Imagen</Text>
     </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    
    <TouchableOpacity style={ styles.buttonHome} onPress={getLocation}>
        <Text style = {styles.buttonText}>Obtener Ubicacion</Text>
    </TouchableOpacity>
      {location && (
        <Text>
          Lat: {location.latitude}, Lng: {location.longitude}
        </Text>
      )}

      <TouchableOpacity
        style={styles.buttonHomeSaveReport} 
        onPress={saveReport}
      >
        <Text style = {styles.buttonText}>Guardar Reporte</Text>
      </TouchableOpacity>
    </View>
  )
}
