import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pagina, Cartao } from '../components/Ui';
import { useCurriculo } from '../context/CurriculoContext';
import { cores } from '../cores';

export default function Inicio() {
  const { pessoas, pessoaId, curriculo, trocarPessoa } = useCurriculo();
  return (
    <Pagina>
      <Text style={s.marca}>PORTFÓLIO / 2026</Text>
      <Text style={s.pequeno}>Um pouco sobre mim, meus estudos e projetos.</Text>

      {pessoas.length > 1 && <View style={s.seletor}>
        <Text style={s.seletorTitulo}>Ver currículo de:</Text>
        <View style={s.linha}>
          {pessoas.map(p => (
            <Pressable key={p.id} onPress={() => trocarPessoa(p.id)} style={[s.pessoa, pessoaId === p.id && s.pessoaAtiva]}>
              <Text numberOfLines={1} style={[s.pessoaTexto, pessoaId === p.id && { color: 'white' }]}>{p.nome.split(' ')[0]}</Text>
            </Pressable>
          ))}
        </View>
      </View>}

      {curriculo && <>
        <View style={s.capa}>
          <View style={s.avatar}>
            {curriculo.pessoa.email === 'joaovictorvarela321@gmail.com' ? (
              <Image source={require('../assets/joao.jpg')} style={s.foto} resizeMode="cover" />
            ) : (
              <Text style={s.iniciais}>{curriculo.pessoa.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}</Text>
            )}
          </View>
          <Text style={s.boasVindas}>OLÁ, EU SOU</Text>
          <Text style={s.nome}>{curriculo.pessoa.nome}</Text>
          <Text style={s.titulo}>{curriculo.pessoa.titulo || 'Estudante de tecnologia'}</Text>
          <View style={s.local}><Ionicons name="location-outline" size={16} color="#BFE4DC" /><Text style={s.localTexto}>{curriculo.pessoa.cidade || 'Brasil'}</Text></View>
        </View>

        <Text style={s.secao}>Minha apresentação</Text>
        <Cartao><Text style={s.resumo}>{curriculo.pessoa.resumo || 'Conheça minhas experiências e meus projetos.'}</Text></Cartao>

        <Text style={s.secao}>Meu currículo em números</Text>
        <View style={s.numeros}>
          <Cartao style={s.numeroCartao}><Text style={s.numero}>{curriculo.formacoes.length}</Text><Text style={s.numeroNome}>Formações</Text></Cartao>
          <Cartao style={s.numeroCartao}><Text style={s.numero}>{curriculo.experiencias.length}</Text><Text style={s.numeroNome}>Experiências</Text></Cartao>
          <Cartao style={s.numeroCartao}><Text style={s.numero}>{curriculo.projetos.length}</Text><Text style={s.numeroNome}>Projetos</Text></Cartao>
        </View>

        <Pressable style={s.botao} onPress={() => router.push('/projetos')}>
          <View><Text style={s.botaoPrincipal}>Ver meus projetos</Text><Text style={s.botaoSub}>Tecnologias e trabalhos que fiz</Text></View>
          <Ionicons name="arrow-forward" size={23} color="white" />
        </Pressable>
      </>}
    </Pagina>
  );
}

const s = StyleSheet.create({
  marca: { fontWeight: '900', fontSize: 13, letterSpacing: 2.2, color: cores.verde, marginBottom: 5 },
  pequeno: { color: cores.suave, marginBottom: 20 },
  seletor: { marginBottom: 14 },
  seletorTitulo: { fontSize: 11, fontWeight: '800', marginBottom: 9, color: cores.suave },
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pessoa: { backgroundColor: 'white', borderRadius: 11, paddingHorizontal: 17, paddingVertical: 10, borderColor: cores.linha, borderWidth: 1 },
  pessoaAtiva: { backgroundColor: cores.verde, borderColor: cores.verde },
  pessoaTexto: { fontWeight: '800', fontSize: 13, color: cores.texto },
  capa: { backgroundColor: cores.escuro, borderRadius: 24, padding: 26, marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, overflow: 'hidden', borderWidth: 3, borderColor: cores.amarelo, backgroundColor: cores.amarelo, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  foto: { width: '100%', height: '100%' },
  iniciais: { color: cores.escuro, fontWeight: '900', fontSize: 20 },
  boasVindas: { color: '#A8DAD0', fontWeight: '800', fontSize: 11, letterSpacing: 2.8 },
  nome: { color: 'white', fontSize: 29, lineHeight: 36, fontWeight: '900', marginTop: 8 },
  titulo: { color: '#CEE1DC', fontSize: 16, marginTop: 10, lineHeight: 23 },
  local: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 25 },
  localTexto: { color: '#BFE4DC', fontWeight: '600', fontSize: 12 },
  secao: { fontSize: 18, fontWeight: '800', marginBottom: 12, color: cores.texto },
  resumo: { color: cores.suave, fontSize: 14, lineHeight: 24 },
  numeros: { flexDirection: 'row', gap: 9, marginBottom: 12 },
  numeroCartao: { flex: 1, alignItems: 'center', paddingHorizontal: 5 },
  numero: { fontWeight: '900', color: cores.verde, fontSize: 26 },
  numeroNome: { color: cores.suave, fontSize: 10, fontWeight: '800', marginTop: 3, textAlign: 'center' },
  botao: { backgroundColor: cores.verde, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 16 },
  botaoPrincipal: { color: 'white', fontWeight: '900', fontSize: 15 },
  botaoSub: { color: '#D3F0E9', fontSize: 11, marginTop: 4 },
});
