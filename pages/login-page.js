import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { styles } from "../styles/styles";
import { Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseErrorMessages } from '../errorMesagges/error-message-firebase'
export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
  //Nos conectamos con la base de datos 
    try{
      const userData = await signInWithEmailAndPassword (auth,email,password);
      const user = userData.user;
      const getName = doc(db,'usuarios', user.uid);
      const nameRecovery = await getDoc(getName);
      if(nameRecovery.exists()){
        const nombreUsuario = nameRecovery.data().name;
        navigation.replace('Inicio',{nombreUsuario});
      }
      console.log("Exito Iniciaste Sesion");
      //navigation.replace(); // reemplaza para que no vuelva al login
    }
    catch(error){
      const messageErrorUser = firebaseErrorMessages[error.code] || 'Ocurrio un error al tratar de ingresar';
      console.log("Errorr",messageErrorUser);
    }
    
  };
const goToRegisterPage = ()=>{
  navigation.navigate('Registrarse');
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOST THINGS</Text>
      <Text style={styles.textDescription}>Para ingresar a la aplicacion de cosas perdidas, inicia sesion</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegistry} onPress={goToRegisterPage}>
        <Text style={styles.textRegistry} >Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}