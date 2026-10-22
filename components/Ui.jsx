import React from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../cores';
import { useCurriculo } from '../context/CurriculoContext';

export function Pagina({ children }) {
  const { carregando, erro, curriculo, atualizar } = useCurriculo();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <ScrollView contentContainerStyle={estilos.pagina} refreshControl={<RefreshControl refreshing={carregando && !!curriculo} onRefresh={atualizar} tintColor={cores.verde} />}>
        {!curriculo && carregando ? (
          <View style={estilos.estado}><ActivityIndicator color={cores.verde} size="large" /><Text style={estilos.ajuda}>Carregando currículo...</Text></View>
        ) : erro && !curriculo ? (
          <View style={estilos.estado}>
            <Ionicons name="cloud-offline-outline" size={42} color={cores.verde} />
            <Text style={estilos.tituloEstado}>Não deu para carregar</Text>
            <Text style={estilos.ajuda}>{erro}</Text>
            <Pressable onPress={atualizar} style={estilos.botao}><Text style={estilos.botaoTexto}>Tentar novamente</Text></Pressable>
          </View>
        ) : children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Cabecalho({ apoio, titulo, descricao }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={estilos.apoio}>{apoio?.toUpperCase()}</Text>
      <Text style={estilos.titulo}>{titulo}</Text>
      {descricao ? <Text style={estilos.descricao}>{descricao}</Text> : null}
    </View>
  );
}

export function Cartao({ children, style }) {
  return <View style={[estilos.cartao, style]}>{children}</View>;
}

export function Etiqueta({ nome }) {
  return <View style={estilos.tag}><Text style={estilos.tagTexto}>{nome}</Text></View>;
}

export function Vazio({ mensagem }) {
  return <Cartao><Text style={estilos.ajuda}>{mensagem}</Text></Cartao>;
}

export function Ano({ inicio, fim }) {
  if (!inicio) return null;
  return <Text style={estilos.ano}>{inicio}{fim ? ` — ${fim}` : ' — atualmente'}</Text>;
}

const estilos = StyleSheet.create({
  pagina: { paddingHorizontal: 21, paddingTop: 24, paddingBottom: 40, flexGrow: 1 },
  apoio: { color: cores.verde, fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 7 },
  titulo: { fontSize: 31, fontWeight: '800', color: cores.texto, letterSpacing: -.7 },
  descricao: { color: cores.suave, fontSize: 14, lineHeight: 22, marginTop: 8 },
  cartao: { backgroundColor: cores.branco, padding: 19, borderRadius: 18, borderWidth: 1, borderColor: cores.linha, marginBottom: 12 },
  tag: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 12, backgroundColor: cores.verdeClaro, marginRight: 7, marginBottom: 8 },
  tagTexto: { color: cores.verde, fontSize: 12, fontWeight: '700' },
  ano: { color: cores.verde, fontWeight: '800', fontSize: 12, marginBottom: 10 },
  estado: { flex: 1, minHeight: 370, alignItems: 'center', justifyContent: 'center', gap: 13 },
  tituloEstado: { fontSize: 20, color: cores.texto, fontWeight: '800' },
  ajuda: { color: cores.suave, lineHeight: 22, textAlign: 'center' },
  botao: { backgroundColor: cores.verde, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  botaoTexto: { color: 'white', fontWeight: '800' }
});
