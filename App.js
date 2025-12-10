import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Inicio from './screens/Inicio';
import Retos from './screens/Retos';
import Perfil from './screens/Perfil';
import Configuracion from './screens/Configuracion';
import Login from './screens/Login';
import Registro from './screens/Registro';
import { AguaProvider } from './context/AguaContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ route }) {
  const user = route?.params?.user;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Retos') iconName = 'trophy';
          else if (route.name === 'Perfil') iconName = 'person';
          else if (route.name === 'Configuración') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E86C1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} initialParams={{ user }} />
      <Tab.Screen name="Retos" component={Retos} initialParams={{ user }} />
      <Tab.Screen name="Perfil" component={Perfil} initialParams={{ user }} />
      <Tab.Screen name="Configuración" component={Configuracion} initialParams={{ user }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AguaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Registro" component={Registro} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AguaProvider>
  );
}
