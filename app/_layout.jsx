import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CurriculoProvider } from '../context/CurriculoContext';
import { cores } from '../cores';
import { StatusBar } from 'expo-status-bar';

const menu = {
  index: ['Início', 'home-outline', 'home'],
  formacao: ['Formação', 'school-outline', 'school'],
  experiencia: ['Experiência', 'briefcase-outline', 'briefcase'],
  projetos: ['Projetos', 'code-slash-outline', 'code-slash'],
  sobre: ['Sobre', 'information-circle-outline', 'information-circle'],
};

export default function Layout() {
  return (
    <CurriculoProvider>
      <StatusBar style="dark" />
      <Tabs screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: cores.verde,
        tabBarInactiveTintColor: '#819093',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', paddingBottom: 2 },
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: cores.linha, height: 64, paddingTop: 6 },
        tabBarIcon: ({ color, focused, size }) => {
          const dados = menu[route.name] || menu.index;
          return <Ionicons name={focused ? dados[2] : dados[1]} size={22} color={color} />;
        },
      })}>
        <Tabs.Screen name="index" options={{ title: menu.index[0] }} />
        <Tabs.Screen name="formacao" options={{ title: menu.formacao[0] }} />
        <Tabs.Screen name="experiencia" options={{ title: menu.experiencia[0] }} />
        <Tabs.Screen name="projetos" options={{ title: menu.projetos[0] }} />
        <Tabs.Screen name="sobre" options={{ title: menu.sobre[0] }} />
      </Tabs>
    </CurriculoProvider>
  );
}
