import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './pages/login-page.js'
import { RegisterPage } from './pages/registry-page.js'
import { HomeScreen } from './pages/home-page.js';
import { GenerateReportPage } from './pages/generate-report.js';
import { ListReportPage } from './pages/list-reports-page.js'
import { DetailScreen } from './pages/details-report-page.js'
const Stack = createNativeStackNavigator();

// App principal la cual realiza toda la navegacion
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Registrarse"component={RegisterPage} options={{ headerShown: true }}/>
        <Stack.Screen name="Productos encontrados" component={ListReportPage} />
        <Stack.Screen name="Reportes de productos" component={GenerateReportPage}/>
        <Stack.Screen name='Detalle' component={ DetailScreen }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Estos son los estilos correspondiente
