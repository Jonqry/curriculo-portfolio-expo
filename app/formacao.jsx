import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pagina, Cabecalho, Cartao, Ano, Vazio } from '../components/Ui';
import { useCurriculo } from '../context/CurriculoContext';
import { cores } from '../cores';

export default function Formacao() {
  const { curriculo } = useCurriculo();
  return <Pagina>
    <Cabecalho apoio="Aprendizado" titulo="Formação acadêmica" descricao="Os cursos e experiências de estudo que fazem parte da minha trajetória." />
    {curriculo && (curriculo.formacoes.length ? curriculo.formacoes.map(f => (
      <Cartao key={f.id}>
        <View style={s.topo}><View style={s.icone}><Ionicons name="school-outline" color={cores.verde} size={23}/></View><Text style={s.tipo}>{f.tipo || 'Formação'}</Text></View>
        <Ano inicio={f.ano_inicio} fim={f.ano_fim} />
        <Text style={s.curso}>{f.curso}</Text>
        <Text style={s.instituicao}>{f.instituicao}</Text>
        {f.descricao ? <Text style={s.descricao}>{f.descricao}</Text> : null}
      </Cartao>
    )) : <Vazio mensagem="Nenhuma formação cadastrada." />)}
  </Pagina>;
}
const s = StyleSheet.create({
  topo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  icone: { width: 42, height: 42, backgroundColor: cores.verdeClaro, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  tipo: { color: cores.suave, fontWeight: '700', fontSize: 12 },
  curso: { color: cores.texto, fontWeight: '900', fontSize: 19, marginBottom: 6 },
  instituicao: { color: cores.verde, fontWeight: '800', fontSize: 14 },
  descricao: { color: cores.suave, marginTop: 13, lineHeight: 22 },
});
