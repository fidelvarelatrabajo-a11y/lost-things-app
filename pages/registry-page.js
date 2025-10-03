import { useState } from "react";
import { styles } from "../styles/styles";
import { Text,TextInput, TouchableOpacity,View } from "react-native";
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from "../firebase";

import { collection, getDocs } from "firebase/firestore";



export function RegisterPage (){
  const [name, setName] = useState('');
  const [apellido, setApellido ] = useState('');
  const [email, setEmail] = useState(''); 
  const [noBoleta, setNoBoleta] = useState('');
  const [carrera,setCarrera] = useState ('');
  const [password,setPassword] = useState ('');
  const [whatsApp,setWhatsapp] = useState('');
  const registroUsuario = async ()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(`Esta es la info ${name},${apellido},${email},${noBoleta},${carrera}`)
    //Validamos que es un correo
    if(!name || !apellido || !email || !noBoleta || !carrera || !password || !whatsApp ){
        console.log('Debes de llenar todos los campos requeridos');
        return;
    }
    if(email.length> 0 && !emailRegex.test(email)){
        console.log('Correo no valido')
        return;
    }
    try {
        const useDataLogin = await createUserWithEmailAndPassword (auth,email, password);
        const user = useDataLogin.user
        await setDoc(doc(db,'usuarios', user.uid),{
            name,
            apellido,
            email,
            noBoleta,
            carrera,
            whatsApp
        })
        console.log('Registro exitosoooooo')
    }catch (error) {
        console.log('Exisitio un error al reralizar el registro',error)
    }
    }

    //Funcion que elimina los numeros
    const onlyLetters =(input,setValue)=>{
      if(/[0-9]/.test(input)){
          console.log('No se permiten numeros, se eliminaron automaticamente');
      }
      const newText = input.replace(/[0-9]/g, '');
      setValue(newText);
    }
    //Funcion que elimina las letras
    const onlyNumbers = (input,setValue)=>{
      if(/[^0-9]/.test(input)){
          console.log('Solo se permiten numeros, las letras se eliminaron')
      }
      const setInputNoBoleta = input.replace(/[^0-9]/g, '');
      setValue(setInputNoBoleta)
    }
    return(
      <View style ={styles.container}>
        <Text style={styles.title}>Bienvenido a Lost Thing</Text>
        <Text style={styles.textRegistryDescription}>Inserta la informacion requerida</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={name}
              onChangeText={(text)=>onlyLetters(text , setName)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={apellido}
              onChangeText={(text)=>onlyLetters(text,setApellido)}
            />
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
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="No. Boleta"
              value={noBoleta}
              keyboardType="numeric"
              onChangeText={(text)=>onlyNumbers(text , setNoBoleta)}
            />
            <TextInput
              style={styles.input}
              placeholder="Carrera"
              value={carrera}
              onChangeText={(text)=>onlyLetters(text,setCarrera)}
            />
            <TextInput
              style={styles.input}
              placeholder="WhatsApp"
              value={whatsApp}
              onChangeText={(number)=>onlyNumbers(number,setWhatsapp)}
            />
            <TouchableOpacity 
            style={styles.buttonHome} 
            onPress={registroUsuario}>
              <Text style = {styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
      </View>
    )
}