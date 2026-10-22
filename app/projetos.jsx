import React, { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pagina, Cabecalho, Cartao, Etiqueta, Vazio } from '../components/Ui';
import { useCurriculo } from '../context/CurriculoContext';
import { cores } from '../cores';

export default function Projetos() {
  const { curriculo, pessoaId } = useCurriculo();
  const [busca, setBusca] = useState('');
  const [soFavoritos, setSoFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const chave = `favoritos-${pessoaId}`;

  useEffect(() => {
    setFavoritos([]);
    setSoFavoritos(false);
    setBusca('');
    let ativo = true;
    AsyncStorage.getItem(chave).then(valor => {
      if (ativo) setFavoritos(valor ? JSON.parse(valor) : []);
    }).catch(() => {});
    return () => { ativo = false; };
  }, [chave]);

  async function alternarFavorito(id) {
    const novos = favoritos.includes(id) ? favoritos.filter(x => x !== id) : [...favoritos, id];
    setFavoritos(novos);
    try { await AsyncStorage.setItem(chave, JSON.stringify(novos)); } catch (e) { console.warn('Erro ao salvar favorito:', e); }
  }

  const projetos = (curriculo?.projetos || []).filter(p => {
    const texto = `${p.titulo} ${p.descricao || ''} ${(p.tecnologias || []).map(t => t.nome).join(' ')}`.toLowerCase();
    return texto.includes(busca.toLowerCase()) && (!soFavoritos || favoritos.includes(p.id));
  });

  return <Pagina>
    <Cabecalho apoio="Portfólio" titulo="Meus projetos" descricao="Aplicativos e sites que ajudei a desenvolver para praticar programação." />
    {curriculo && <>
      <View style={s.busca}><Ionicons name="search-outline" size={19} color={cores.suave}/>
        <TextInput placeholder="Buscar projeto ou tecnologia" placeholderTextColor="#8C989A" value={busca} onChangeText={setBusca} style={s.input} autoCapitalize="none" />
      </View>
      <Pressable onPress={() => setSoFavoritos(!soFavoritos)} style={[s.filtro, soFavoritos && s.filtroAtivo]}>
        <Ionicons name={soFavoritos ? 'heart' : 'heart-outline'} size={18} color={soFavoritos ? 'white' : cores.verde}/>
        <Text style={[s.filtroTexto, soFavoritos && { color: 'white' }]}>Só favoritos ({favoritos.length})</Text>
      </Pressable>
      <Text style={s.resultado}>{projetos.length} {projetos.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}</Text>
      {projetos.length ? projetos.map(p => (
        <Cartao key={p.id}>
          <View style={s.linha}>
            <View style={s.identificador}><Ionicons name="code-slash" color={cores.verde} size={21}/></View>
            <Pressable onPress={() => alternarFavorito(p.id)} accessibilityLabel={favoritos.includes(p.id) ? 'Remover favorito' : 'Adicionar favorito'} style={s.favorito}>
              <Ionicons name={favoritos.includes(p.id) ? 'heart' : 'heart-outline'} color={favoritos.includes(p.id) ? '#E86D6D' : cores.suave} size={25}/>
            </Pressable>
          </View>
          <Text style={s.ano}>{p.ano || 'Projeto'}</Text>
          <Text style={s.titulo}>{p.titulo}</Text>
          <Text style={s.descricao}>{p.descricao}</Text>
          <View style={s.tecnologias}>{(p.tecnologias || []).map(t => <Etiqueta key={t.id} nome={t.nome}/>)}</View>
          {p.link && /^https?:\/\//.test(p.link) ? <Pressable onPress={() => Linking.openURL(p.link)} style={s.link}>
            <Text style={s.linkTexto}>Abrir projeto</Text><Ionicons name="open-outline" size={17} color={cores.verde}/>
          </Pressable> : null}
        </Cartao>
      )) : <Vazio mensagem="Nenhum projeto combina com o filtro. Experimente mudar a busca ou ver todos os projetos." />}
    </>}
  </Pagina>;
}
const s = StyleSheet.create({
  busca: { height: 50, backgroundColor: 'white', borderColor: cores.linha, borderWidth: 1, borderRadius: 13, flexDirection: 'row', gap: 10, paddingHorizontal: 14, alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, fontSize: 13, color: cores.texto },
  filtro: { alignSelf: 'flex-start', flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 9, gap: 8, borderRadius: 18, borderWidth: 1, borderColor: cores.verde, alignItems: 'center' },
  filtroAtivo: { backgroundColor: cores.verde },
  filtroTexto: { color: cores.verde, fontWeight: '800', fontSize: 12 },
  resultado: { color: cores.suave, fontSize: 12, fontWeight: '700', marginTop: 18, marginBottom: 12 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  identificador: { backgroundColor: cores.verdeClaro, height: 42, width: 42, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  favorito: { padding: 8 },
  ano: { fontWeight: '800', fontSize: 11, color: cores.verde, marginBottom: 5 },
  titulo: { fontWeight: '900', fontSize: 20, color: cores.texto },
  descricao: { color: cores.suave, lineHeight: 22, marginTop: 10, marginBottom: 16 },
  tecnologias: { flexDirection: 'row', flexWrap: 'wrap' },
  link: { marginTop: 11, borderTopColor: cores.linha, borderTopWidth: 1, paddingTop: 15, flexDirection: 'row', alignItems: 'center', gap: 6 },
  linkTexto: { color: cores.verde, fontWeight: '800' },
});
