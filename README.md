# Meu Portfólio — Expo

Portfólio acadêmico com cinco abas, dados de API publicada e funcionalidade extra de favoritos.

**Abas:** Início, Formação, Experiência, Projetos, Sobre.

**Funcionalidade extra:** buscar projetos pelo nome ou tecnologia, favoritar/desfavoritar com coração e filtrar apenas favoritos. Os favoritos ficam salvos no aparelho com AsyncStorage. A Home também permite ver os três currículos da API.

## Como testar no celular

1. Tenha Node.js instalado.
2. Na pasta do projeto, copie `.env.example` para `.env` e altere a URL:

```env
EXPO_PUBLIC_API_URL=https://SEU-BACKEND-REAL.vercel.app
```

3. Abra o terminal:

```bash
npm install
npx expo-doctor@latest
npx expo start
```

4. Abra com Expo Go no iPhone ou Android. Se não conectar, execute `npx expo start --tunnel`.

**Não use `localhost` em `EXPO_PUBLIC_API_URL` no celular**; ele apontaria para o próprio telefone, e não para seu computador. É melhor testar com a API já publicada no Vercel.

O código usa **Expo SDK 54** para compatibilidade com a versão do Expo Go disponibilizada na App Store para iOS. Não rode `npm update` indiscriminadamente ou troque de SDK sem verificar o Expo Go da pessoa que vai testar.

## Configuração da organização e publicação

- O `app.json` já tem `"owner": "jonqryorg"`, usando a organização JonqryORG (https://expo.dev/accounts/jonqryorg).
- Confirme na sua conta que a organização `jonqryorg` está criada e que você pode publicar nela. Confira também que o professor recebeu o convite para a organização, conforme a atividade.
- Faça login e vincule o projeto, usando `npx eas-cli login` e `npx eas-cli project:init` (ou o procedimento indicado pelo CLI).
- Instale/configure EAS Update conforme a documentação oficial do Expo, por exemplo: `npx expo install expo-updates` e `npx eas-cli update:configure`.
- Uma vez configurado e com a API real definida em `.env`, publique uma atualização de teste via `npx eas-cli update --branch preview --message "Primeira versão do portfólio"` (ou siga o canal/branch sugerido pelo CLI).
- Abra o link da atualização no painel Expo e verifique se a função **Preview** gera QR e se ele realmente abre no Expo Go do aparelho que será usado na avaliação. Se esse fluxo pedir um development build, não apresente seu QR como se fosse Expo Go: consulte as opções da documentação do Expo para um preview compatível com Expo Go.

**Atenção à diferença:** `npx expo start --tunnel` mostra um QR local, que para de funcionar quando o terminal é fechado. Para entrega o professor pediu um link/QR de projeto publicado (over-the-air), portanto o QR local **não substitui** a publicação exigida. Algumas atualizações EAS configuradas com `runtimeVersion` precisam de um development build e **não abrem no Expo Go**; teste com antecedência.

Fontes oficiais: https://docs.expo.dev/eas-update/getting-started/ , https://docs.expo.dev/build/updates/ , https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ .

## Tecnologias e bibliotecas

- React Native e Expo: app para Android/iOS;
- Expo Router: navegação entre as cinco abas;
- React Context + `fetch`: compartilha os dados recebidos de `/pessoas/:id/curriculo`;
- `@react-native-async-storage/async-storage`: guarda favoritos;
- `@expo/vector-icons`: ícones da interface;
- Express + PostgreSQL no back-end: endpoints e persistência;
- NeonDB + Vercel: infraestrutura de dados e API.

**Foto:** a imagem dentro de `assets/joao.jpg` veio da foto selecionada pelo autor, sem alterações no rosto.
