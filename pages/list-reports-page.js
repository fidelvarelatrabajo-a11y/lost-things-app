import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { styles } from "../styles/styles";
import { db } from "../firebase";

export function ListReportPage({navigation}) {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    // Creamos una consulta: ordenar por fecha descendente
    const q = query(collection(db, "reportes"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReportes(lista);
    });

    return () => unsubscribe();
  }, []);
  console.log('Reportes',reportes);
  console.log('Set Reportes', reportes);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Reportes </Text>
      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textoTitulo}>Objeto Extraviado</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity style = {styles.buttonDetails} onPress={()=>{navigation.navigate('Detalle',{ id: item.id })}}>
                <Text style={styles.buttonText}> Ver detalles </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
