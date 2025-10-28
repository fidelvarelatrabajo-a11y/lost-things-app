import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { styles } from '../styles/styles'; 
export function DetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "reportes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem(docSnap.data());
        } else {
          console.log("No se encontró el documento");
          Alert.alert('Upss','No se pudo recuperar el detalle')
        }
      } catch (error) {
        console.error("Error al obtener detalle:", error);
        Alert.alert('Error','Ocurrio un error al tratar de obtener el detalle')
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (!item) return <Text>No se encontró el artículo</Text>;
  console.log('*****esta es la info*****',item)
  return (
    <View style={ styles.container }>
      <Text style={styles.title}>Producto Extraviado</Text>
      <Text style = {styles.textDescription}>{item.description}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.textDescription}>El Objeto fue encontrado en: </Text>
      <Marker
        key={item.id}
        coordinate={{latitude:item.location.latitude, longitude: item.location.longitude }}
      />
    </View>
  );
}