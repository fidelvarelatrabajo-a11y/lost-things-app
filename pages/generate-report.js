import { Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native"
import { styles } from "../styles/styles"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Platform } from "react-native";
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

  const uriToBlob = async (uri) => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new Error("No se pudo convertir la imagen a blob"));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};
//Limpiar inputs 
const setInfo = ()=>{
  setDescription('');
  setLocation(null);
  setImage(null);
}
    // Subir imagen a Cloudinary
const uploadImageAsync = async (uri) => {
  const UPLOAD_PRESET = "lost_of_things";
  const CLOUD_NAME = "dz1bc5yta";
  const CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const imageName = `foto_${Date.now()}.jpg`;
  const data = new FormData();

  // 👇 En móvil (React Native o Expo)
  if (Platform.OS !== "web") {
    data.append("file", {
      uri,
      type: "image/jpeg", // cambia si usas otro tipo
      name: imageName,
    });
  } 
  // 👇 En web
  else {
    const response = await fetch(uri);
    const blob = await response.blob();
    data.append("file", blob);
  }

  data.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUD_URL, {
      method: "POST",
      body: data,
    });

    const json = await response.json();

    if (json.error) {
      console.error("❌ Error subiendo imagen a Cloudinary:", json.error);
      throw new Error(json.error.message);
    }

    console.log("✅ Imagen subida correctamente:", json.secure_url);
    return json.secure_url;
  } catch (error) {
    console.error("🚨 Error subiendo imagen:", error);
    throw error;
  }
};

  // Guardar reporte en Firestore
  const saveReport = async () => {
    if (!image || !description || !location) {
      Alert.alert('Error','Falta informacion por agregar');
      console.log('Falta información');
      return;
    }
try{
  const imageUrl = await uploadImageAsync(image);

    await addDoc(collection(db, "reportes"), {
      description,
      imageUrl,
      location,
      createdAt: new Date(),
    });
    Alert.alert('Registro exitoso ✅','Se realizo de manera correcta el registro del reporte');
    setInfo();
  }catch(e){
    console.log('Existio un error', e);
    Alert.alert('Error','Ocurrio un error al realizar el reporte');
    setInfo();
  }
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
