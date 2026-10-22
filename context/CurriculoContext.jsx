import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../config';

const Contexto = createContext(null);

export function CurriculoProvider({ children }) {
  const [pessoas, setPessoas] = useState([]);
  const [pessoaId, setPessoaId] = useState(null);
  const [curriculo, setCurriculo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarPessoas() {
    try {
      setErro('');
      const resposta = await fetch(`${API_URL}/pessoas`);
      if (!resposta.ok) throw new Error('Não foi possível consultar as pessoas.');
      const lista = await resposta.json();
      setPessoas(lista);
      if (!lista.length) {
        setErro('Ainda não existem currículos cadastrados no banco.');
        setCarregando(false);
      } else {
        setPessoaId(atual => atual ?? (lista.find(p => p.email === 'joaovictorvarela321@gmail.com') || lista[0]).id);
      }
    } catch (e) {
      setErro('Não foi possível acessar a API. Confira o endereço do servidor e a internet.');
      setCarregando(false);
    }
  }

  async function buscarCurriculo(id = pessoaId) {
    if (!id) return;
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(`${API_URL}/pessoas/${id}/curriculo`);
      if (!resposta.ok) throw new Error('Erro na resposta');
      const dados = await resposta.json();
      setCurriculo(dados);
    } catch (e) {
      setCurriculo(null);
      setErro('Não foi possível carregar o currículo. Verifique a conexão e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { buscarPessoas(); }, []);
  useEffect(() => { if (pessoaId) buscarCurriculo(pessoaId); }, [pessoaId]);

  function trocarPessoa(id) {
    if (id === pessoaId) return;
    setCurriculo(null);
    setPessoaId(id);
  }

  async function atualizar() {
    if (pessoaId) await buscarCurriculo(pessoaId);
    else await buscarPessoas();
  }

  return (
    <Contexto.Provider value={{ pessoas, pessoaId, curriculo, carregando, erro, trocarPessoa, atualizar }}>
      {children}
    </Contexto.Provider>
  );
}

export function useCurriculo() {
  return useContext(Contexto);
}
