import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pagina, Cabecalho, Cartao, Etiqueta } from '../components/Ui';
import { useCurriculo } from '../context/CurriculoContext';
import { cores } from '../cores';

const recursos = [
  ['React Native', 'Componentes para criar as telas do aplicativo.'],
  ['Expo e Expo Router', 'Execução no celular e navegação pelas cinco telas.'],
  ['Fetch API', 'Conexão com a API REST publicada na Vercel.'],
  ['AsyncStorage', 'Guarda os projetos marcados como favoritos no próprio celular.'],
  ['Ionicons', 'Ícones das abas, botões e cartões.'],
  ['Express + PostgreSQL', 'Backend com CRUD e informações guardadas no Neon.'],
];

export default function Sobre() {
  const { curriculo } = useCurriculo();
  const tecnologias = [...new Set((curriculo?.projetos || []).flatMap(p => (p.tecnologias || []).map(t => t.nome)))];
  const pessoa = curriculo?.pessoa;
  return <Pagina>
    <Cabecalho apoio="Por trás do projeto" titulo="Sobre o app" descricao="Como o portfólio foi feito e o que ele consegue fazer." />
    <Cartao>
      <Text style={s.subtitulo}>O que é este aplicativo?</Text>
      <Text style={s.paragrafo}>Este app reúne currículo, formação, experiência e projetos. Os dados são carregados da API, então podem ser atualizados no banco sem precisar editar cada tela.</Text>
    </Cartao>
    <Cartao>
      <Text style={s.subtitulo}>Tecnologias e módulos usados</Text>
      {recursos.map(([nome, descricao]) => <View style={s.recurso} key={nome}>
        <Ionicons name="checkmark-circle" size={19} color={cores.verde}/>
        <View style={{ flex: 1 }}><Text style={s.recursoNome}>{nome}</Text><Text style={s.recursoDescricao}>{descricao}</Text></View>
      </View>)}
    </Cartao>
    <Cartao style={s.extra}>
      <View style={s.linha}><Ionicons name="heart" size={25} color={cores.verde}/><Text style={s.subtitulo}>Funcionalidade extra</Text></View>
      <Text style={s.paragrafo}>Na aba Projetos é possível pesquisar pelo nome ou pela tecnologia, marcar favoritos no coração e mostrar apenas os favoritos. Eles continuam salvos mesmo depois de fechar o app.</Text>
      <Text style={s.paragrafo}>Na Home também dá para alternar entre os três currículos cadastrados (um real e dois fictícios) no banco.</Text>
    </Cartao>
    {tecnologias.length > 0 && <Cartao><Text style={s.subtitulo}>Tecnologias dos projetos</Text><View style={s.tags}>{tecnologias.map(nome => <Etiqueta key={nome} nome={nome}/>)}</View></Cartao>}
    {pessoa?.github && <Pressable style={s.botao} onPress={() => Linking.openURL(pessoa.github)}><Text style={s.botaoTexto}>Ver GitHub</Text><Ionicons name="open-outline" size={20} color="white"/></Pressable>}
    <Text style={s.rodape}>Trabalho acadêmico • 3º período</Text>
  </Pagina>;
}
const s = StyleSheet.create({
  subtitulo: { fontSize: 17, fontWeight: '900', color: cores.texto, marginBottom: 12 },
  paragrafo: { lineHeight: 23, color: cores.suave, marginBottom: 9 },
  recurso: { flexDirection: 'row', gap: 11, paddingTop: 13, paddingBottom: 14, borderBottomColor: cores.linha, borderBottomWidth: 1 },
  recursoNome: { color: cores.texto, fontWeight: '800' },
  recursoDescricao: { color: cores.suave, fontSize: 12, lineHeight: 19, marginTop: 4 },
  extra: { borderColor: '#CCE5D9', backgroundColor: '#F0FAF5' },
  linha: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  botao: { backgroundColor: cores.verde, padding: 18, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between' },
  botaoTexto: { fontWeight: '900', color: 'white' },
  rodape: { textAlign: 'center', color: cores.suave, marginTop: 14, fontSize: 12 },
});
