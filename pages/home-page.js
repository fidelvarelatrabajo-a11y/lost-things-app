import { View, Text, TouchableOpacity, } from "react-native-web";
import { styles } from "../styles/styles";

export function HomeScreen({ route, navigation }) {
  const { nombreUsuario } = route.params
  const handleCloseSesion = ()=>{
    auth.signOut();
    navigation.replace('Login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido {nombreUsuario} a Lost Thing Politecnico 🎉 </Text>
      <TouchableOpacity 
        style={styles.buttonHome} 
        onPress={() => navigation.navigate('Productos encontrados')}
      >
        <Text style={styles.buttonText}> Constultar los reportes </Text>
    </TouchableOpacity>

    <TouchableOpacity 
        style={styles.buttonHome} 
        onPress={() => navigation.navigate('Reportes de productos')}
      >
        <Text style={styles.buttonText}>Realizar un reporte</Text>
    </TouchableOpacity>
      
    <TouchableOpacity 
        style={styles.buttonHome} 
        onPress={handleCloseSesion}
      >
        <Text style={styles.buttonText}>Cerrar Sesion</Text>
    </TouchableOpacity>
    </View>
  );
}
