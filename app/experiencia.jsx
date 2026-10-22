import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pagina, Cabecalho, Cartao, Ano, Vazio } from '../components/Ui';
import { useCurriculo } from '../context/CurriculoContext';
import { cores } from '../cores';

export default function Experiencia() {
  const { curriculo } = useCurriculo();
  return <Pagina>
    <Cabecalho apoio="Vivência" titulo="Experiência profissional" descricao="Atividades e projetos em que tive oportunidade de aprender na prática." />
    {curriculo && (curriculo.experiencias.length ? curriculo.experiencias.map(e => (
      <Cartao key={e.id}>
        <View style={s.topo}><View style={s.icone}><Ionicons name="briefcase-outline" color={cores.verde} size={22} /></View><Ano inicio={e.ano_inicio} fim={e.ano_fim}/></View>
        <Text style={s.cargo}>{e.cargo}</Text>
        <Text style={s.empresa}>{e.empresa}</Text>
        {e.descricao ? <Text style={s.descricao}>{e.descricao}</Text> : null}
      </Cartao>
    )) : <Vazio mensagem="Ainda não há experiências cadastradas. Projetos de estudo podem ser vistos na aba Projetos." />)}
  </Pagina>;
}
const s = StyleSheet.create({
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  icone: { width: 42, height: 42, backgroundColor: cores.verdeClaro, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  cargo: { fontWeight: '900', color: cores.texto, fontSize: 19 },
  empresa: { color: cores.verde, fontWeight: '800', fontSize: 14, marginTop: 7 },
  descricao: { color: cores.suave, lineHeight: 23, marginTop: 13 },
});
