
import * as React from "react";
import { 
  StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, 
  SafeAreaView, TouchableOpacity, ScrollView 
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 

const AuthContext = React.createContext();

const initialWaterActivities = [
  { 
    id: 'A1', 
    title: 'Ducha de 5 minutos', 
    description: 'Toma una ducha de máximo 5 minutos (Ahorro promedio de 50L).', 
    points: 50, 
    litersSaved: 50, 
    isCompleted: false, 
    difficulty: 'Fácil' 
  },
  { 
    id: 'A2', 
    title: 'Cierra el grifo al cepillarte', 
    description: 'No dejes correr el agua (Ahorro promedio de 12L).', 
    points: 30, 
    litersSaved: 12, 
    isCompleted: false, 
    difficulty: 'Fácil' 
  },
  { 
    id: 'A3', 
    title: 'Lava platos eficientemente', 
    description: 'Llena el fregadero en vez de dejar el grifo abierto (Ahorro de 80L).', 
    points: 40, 
    litersSaved: 80, 
    isCompleted: false, 
    difficulty: 'Fácil' 
  },
  { 
    id: 'A4', 
    title: 'Usa la lavadora a carga completa', 
    description: 'Evita lavados con media carga (Ahorro de 35L).', 
    points: 60, 
    litersSaved: 35, 
    isCompleted: false, 
    difficulty: 'Medio' 
  },
];

function ProfileOption({ iconName, title, subtitle, onPress }) {
    return (
        <TouchableOpacity style={profileStyles.optionContainer} onPress={onPress}>
            <Ionicons name={iconName} size={24} color="#007AFF" />
            <View style={profileStyles.optionTextContainer}>
                <Text style={profileStyles.optionTitle}>{title}</Text>
                {subtitle && <Text style={profileStyles.optionSubtitle}>{subtitle}</Text>}
            </View>
            {}
            {title !== 'Cerrar Sesión' && (
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            )}
        </TouchableOpacity>
    );
}

const ProgressBar = ({ label, percentage }) => (
    <View style={homeStyles.progressRow}>
      <Text style={homeStyles.progressLabel}>{label}</Text>
      <Text style={[homeStyles.progressPercent, {color: percentage >= 75 ? '#4CAF50' : '#FF9800'}]}>{percentage.toFixed(0)}%</Text>
      <View style={homeStyles.progressBarContainer}>
        <View style={[homeStyles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
);

function HomeScreen(){
  const [activities, setActivities] = React.useState(initialWaterActivities);
  const [rachaDays, setRachaDays] = React.useState(0); 
  const [progresoSemanalPct, setProgresoSemanalPct] = React.useState(60); 

  const isRachaBeingUpdated = React.useRef(false); 

  const totalLitrosAhorradosHoy = activities.reduce((sum, activity) => 
    sum + (activity.isCompleted ? activity.litersSaved : 0), 0);
    
  const completedCount = activities.filter(a => a.isCompleted).length;
  const totalCount = activities.length;
  const progresoDiarioPct = (completedCount / totalCount) * 100;

  React.useEffect(() => {
    if (isRachaBeingUpdated.current) {
      isRachaBeingUpdated.current = false; 
      return;
    }

    if (progresoDiarioPct === 100) {
      isRachaBeingUpdated.current = true; 
      
      const newRacha = rachaDays + 1;
      setRachaDays(prevRacha => {
        const calculatedRacha = prevRacha + 1;
        return calculatedRacha;
      });
      
      const resetActivities = initialWaterActivities.map(activity => ({
          ...activity,
          isCompleted: false,
      }));
      
      setTimeout(() => {
        setActivities(resetActivities);
        Alert.alert("¡Racha Aumentada!", `Felicidades, tu racha es ahora de ${newRacha} días. Los desafíos han sido restablecidos.`);
      }, 500); 
    }
  }, [progresoDiarioPct]);

  const handleCompleteActivity = (id) => {
    const isCurrentlyCompleted = activities.find(a => a.id === id).isCompleted;
    
    const newActivities = activities.map(activity => 
      activity.id === id ? { ...activity, isCompleted: !isCurrentlyCompleted } : activity
    );
    setActivities(newActivities);
  };

  const ActivityCard = ({ activity }) => {
    const cardColor = activity.isCompleted ? '#E8F5E9' : '#F5F5F5';
    const buttonColor = activity.isCompleted ? '#4CAF50' : '#2196F3';
    const buttonText = activity.isCompleted ? 'Completado' : 'Marcar como Completado';
    const buttonIcon = activity.isCompleted ? 'check-circle' : 'water-outline';

    return (
      <View style={[homeStyles.card, { backgroundColor: cardColor }]}>
        <View style={homeStyles.cardHeader}>
          <Text style={homeStyles.cardTitle}>{activity.title}</Text>
          <Text style={homeStyles.cardDifficulty}>{activity.difficulty}</Text>
        </View>
        <Text style={homeStyles.cardDescription}>{activity.description}</Text>
        <View style={homeStyles.cardStats}>
          <View style={homeStyles.statItem}>
             <AntDesign name="star" size={16} color="#FFD700" />
             <Text style={homeStyles.statText}>{activity.points} pts</Text>
          </View>
          <View style={homeStyles.statItem}>
             <MaterialCommunityIcons name="water" size={16} color="#03A9F4" />
             <Text style={homeStyles.statText}>{activity.litersSaved}L ahorrados</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[homeStyles.button, { backgroundColor: buttonColor }]}
          onPress={() => handleCompleteActivity(activity.id)}
        >
          <Ionicons name={buttonIcon} size={20} color="#fff" style={{marginRight: 8}} />
          <Text style={homeStyles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView style={homeStyles.safeArea}>
      <ScrollView style={homeStyles.scrollView} contentContainerStyle={homeStyles.scrollContent}>
        
        {/* Dashboard */}
        <View style={homeStyles.impactCard}>
          <View style={homeStyles.impactHeader}>
            <Text style={homeStyles.impactTitle}>Tu Impacto Hoy</Text>
            <AntDesign name="staro" size={24} color="#FFD700" />
          </View>

          <View style={homeStyles.statsContainer}>
            <View style={[homeStyles.statBox, homeStyles.blueBox]}>
              <View style={homeStyles.statBoxRow}>
                <Feather name="trending-up" size={16} color="#007AFF" />
                <Text style={homeStyles.statBoxLabel}>Ahorro Hoy</Text>
              </View>
              <Text style={homeStyles.statBoxValueBlue}>{totalLitrosAhorradosHoy}L</Text>
            </View>
            
            <View style={[homeStyles.statBox, homeStyles.orangeBox]}>
              <View style={homeStyles.statBoxRow}>
                <MaterialCommunityIcons name="ribbon" size={16} color="#FF9800" />
                <Text style={homeStyles.statBoxLabel}>Racha</Text>
              </View>
              <Text style={homeStyles.statBoxValueOrange}>
                {rachaDays > 0 ? `${rachaDays} días` : '—'}
              </Text>
            </View>
          </View>

          <ProgressBar label="Progreso Diario" percentage={progresoDiarioPct} />
          <ProgressBar label="Progreso Semanal" percentage={progresoSemanalPct} />
        </View>
        
        <Text style={homeStyles.retosTitle}>Retos Diarios</Text>
        
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
        
        <View style={{ height: 100 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen(){
  const { signOut } = React.useContext(AuthContext); 
  
  return(
    <SafeAreaView style={profileStyles.safeArea}>
      <ScrollView contentContainerStyle={profileStyles.scrollContent}>
        
        {}
        <View style={profileStyles.headerContainer}>
            <Text style={profileStyles.headerTitle}>Configuración</Text>
        </View>

        {}
        <View style={profileStyles.sectionContainer}>
             <ProfileOption 
                iconName="moon-outline" 
                title="Modo Oscuro"
                subtitle="Automático"
            />
        </View>

        {}
        <View style={profileStyles.sectionContainer}>
             <ProfileOption 
                iconName="information-circle-outline" 
                title="Versión de la App"
                subtitle="v1.0.0"
            />
            <ProfileOption 
                iconName="document-text-outline" 
                title="Términos de Servicio"
            />
        </View>

        {}
        <View style={[profileStyles.sectionContainer, {marginTop: 20}]}>
             <ProfileOption 
                iconName="log-out-outline" 
                title="Cerrar Sesión"
                onPress={signOut}
            />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function Perfil(){
  return(
    <SafeAreaView style={profileStyles.safeArea}>
      <ScrollView contentContainerStyle={profileStyles.scrollContent}>
        
        {}
        <View style={profileStyles.headerContainer}>
            <View style={profileStyles.avatarPlaceholder}>
                <Feather name="user" size={60} color="#fff" />
            </View>
            <Text style={profileStyles.headerTitle}>Mi Perfil</Text>
        </View>

        {}
        <View style={profileStyles.sectionContainer}>
             <ProfileOption 
                iconName="bar-chart-outline" 
                title="Estadísticas de Ahorro"
                subtitle="Ver tu historial de impacto"
            />
            <ProfileOption 
                iconName="notifications-outline" 
                title="Notificaciones"
                subtitle="Ajustar preferencias de alerta"
            />
        </View>

        {}
        <View style={profileStyles.sectionContainer}>
            <ProfileOption 
                iconName="help-circle-outline" 
                title="Ayuda y Soporte"
            />
            <ProfileOption 
                iconName="document-text-outline" 
                title="Política de Privacidad"
            />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { signIn } = React.useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, rellena ambos campos.');
      return;
    }
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const userToken = 'simulated-token-123'; 
      signIn(userToken); 
      
    } catch (e) {
      Alert.alert('Error', 'Credenciales inválidas o error de red.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Iniciar Sesión</Text>
        <TextInput style={loginStyles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={loginStyles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={[loginStyles.button, isLoading && loginStyles.buttonDisabled]} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (<ActivityIndicator color="#fff" />) : (<Text style={loginStyles.buttonText}>Entrar</Text>)}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'; 
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Inicio', tabBarIcon:() => <AntDesign name="home" size={24} color="black" />}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{title: 'Configuracion', tabBarIcon:() => <Ionicons name="settings-outline" size={24} color="black" /> }}/>
      <Tab.Screen name="Perfil" component={Perfil} options={{title: 'Perfil', tabBarIcon: () => <Feather name="user" size={24} color="black" />}}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [userToken, setUserToken] = React.useState(null); 
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => { setIsLoading(false); }, 1000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (token) => { setUserToken(token); },
      signOut: () => { setUserToken(null); },
    }),
    []
  );

  if (isLoading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{marginTop: 10}}>Verificando sesión...</Text>
        </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken == null ? (
            <Stack.Screen name="Auth" component={LoginScreen} />
          ) : (
            <Stack.Screen name="AppTabs" component={AppTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const loginStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  input: { height: 50, backgroundColor: '#f5f5f5', marginBottom: 20, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', borderRadius: 8, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

const homeStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollView: { paddingHorizontal: 15 },
  scrollContent: { paddingTop: 20, paddingBottom: 20 },
  
  impactCard: {
    backgroundColor: '#F7F7F7', padding: 20, borderRadius: 15, marginBottom: 25,
    borderWidth: 1, borderColor: '#eee', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5,
  },
  impactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  impactTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statBox: { width: '48%', padding: 15, borderRadius: 12, borderWidth: 1 },
  blueBox: { backgroundColor: '#E6F3FF', borderColor: '#B3D9FF' },
  orangeBox: { backgroundColor: '#FFF2E6', borderColor: '#FFDAB3' },
  statBoxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  statBoxLabel: { marginLeft: 5, fontSize: 14, color: '#555' },
  statBoxValueBlue: { fontSize: 28, fontWeight: 'bold', color: '#007AFF' },
  statBoxValueOrange: { fontSize: 28, fontWeight: 'bold', color: '#FF9800' },
  
  progressRow: { marginBottom: 15, width: '100%' },
  progressLabel: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 5 },
  progressPercent: { position: 'absolute', right: 0, top: 0, fontSize: 14, fontWeight: '600' },
  progressBarContainer: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 },
  
  retosTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
  card: {
    padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEE', elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDifficulty: { fontSize: 12, fontWeight: '600', color: '#4CAF50', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  cardDescription: { fontSize: 14, color: '#666', marginBottom: 15 },
  cardStats: { flexDirection: 'row', marginBottom: 15 },
  statItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  statText: { marginLeft: 5, fontSize: 14, color: '#555' },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


const profileStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F0F2F5' },
    scrollContent: { paddingBottom: 30 },
    
    headerContainer: {
        backgroundColor: '#007AFF', 
        padding: 40,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10, 
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20, 
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 2,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    optionSubtitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    }
});
