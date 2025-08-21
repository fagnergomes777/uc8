// ============================================================================
// NearbyGymsScreen.jsx - Tela que exibe academias próximas no mapa
// Funcionalidades: Geolocalização, exibição de mapa com marcadores
// ============================================================================

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Componente de mapa
import * as Location from "expo-location"; // Biblioteca de geolocalização

export default function NearbyGymsScreen({ theme }) {
  // ==================== ESTADOS DO COMPONENTE ====================
  const [location, setLocation] = useState(null); // Localização atual do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // ==================== DADOS ESTÁTICOS ====================
  // Lista de academias fictícias (em produção viria de uma API)
  const gyms = [
    {
      id: "1",
      title: "Academia PowerFit",
      coordinate: { latitude: -23.561684, longitude: -46.625378 },
    },
    {
      id: "2",
      title: "Smart Gym",
      coordinate: { latitude: -23.56321, longitude: -46.654321 },
    },
    {
      id: "3",
      title: "Academia Strong Life",
      coordinate: { latitude: -23.565, longitude: -46.64 },
    },
  ];

  // ==================== EFEITOS ====================
  // useEffect: executa após o componente ser montado
  useEffect(() => {
    // Função assíncrona auto-executável (IIFE - Immediately Invoked Function Expression)
    (async () => {
      // Solicita permissão para acessar localização
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar sua localização."
        );
        setLoading(false);
        return;
      }

      // Obtém a localização atual do usuário
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords); // Salva apenas as coordenadas
      setLoading(false); // Para o indicador de carregamento
    })();
  }, []); // Array vazio = executa apenas uma vez

  // ==================== RENDERIZAÇÃO CONDICIONAL ====================
  // Exibe indicador de carregamento enquanto obtém localização
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {/* Local do usuário */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Você está aqui"
            pinColor="blue"
          />

          {/* Academias */}
          {gyms.map((gym) => (
            <Marker
              key={gym.id}
              coordinate={gym.coordinate}
              title={gym.title}
              pinColor="red"
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});