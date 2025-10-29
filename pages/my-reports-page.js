import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { collection, onSnapshot, query, orderBy, where, deleteDoc, doc} from "firebase/firestore";
import { styles } from "../styles/styles";
import { auth, db } from "../firebase";

export function MyReports({navigation}) {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    //Recuperamos el id del usuario
    const user = auth.currentUser
    // Creamos una consulta: ordenar por fecha descendente
    console.log("Useeeer",user.uid);
    const q = query(collection(db, "reportes"), where('userId','==',user.uid), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReportes(lista);
    });

    return () => unsubscribe();
  }, []);
  const eliminarReporte = async(id)=>{
    try{
        await deleteDoc(doc(db,'reportes',id));
        setReportes((prev)=>prev.filter((rep)=> rep.id!== id))
        Alert.alert('Eliminado ✅', 'Se elimino de maner correcta ');
        console.log('Eliminado de manera correcta');
    }catch(e){
        Alert.alert('Error','Ocurrio un error al eliminar el reporte');
        console.log('Ocurrio un error',e);
    }
  }
  const confirmarEliminacion =(id)=>{
    Alert.alert("Eliminar Reporte","¿Seguro que quieres eliminar este reporte?",[
        { text:"Cancelar", style:"cancel" },
        { text: "Eliminar", style:"destructive", onPress: ()=> eliminarReporte(id)}
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Mis Reportes </Text>
      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textoTitulo}>Objeto Extraviado</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity style = {styles.buttonDelete} onPress={()=>{confirmarEliminacion( item.id)}}>
                <Text style={styles.buttonText}> Eliminar </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
