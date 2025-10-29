# Sistema de Autenticação com Pinia - Explicação Detalhada

## Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura do Store](#estrutura-do-store)
3. [Estado Reativo](#estado-reativo)
4. [Computed Properties](#computed-properties)
5. [Configuração de APIs](#configuração-de-apis)
6. [Função de Login](#função-de-login)
7. [Busca de Dados do Usuário](#busca-de-dados-do-usuário)
8. [Função de Logout](#função-de-logout)
9. [Sistema de Redirect](#sistema-de-redirect)
10. [Inicialização da Aplicação](#inicialização-da-aplicação)
11. [Fluxos do Sistema](#fluxos-do-sistema)
12. [Problemas Resolvidos](#problemas-resolvidos)

---

## Visão Geral

Este documento explica passo a passo como funciona o sistema de autenticação implementado com **Pinia** (gerenciador de estado do Vue 3). O sistema gerencia login, logout, persistência de sessão e redirecionamentos de forma reativa e segura.

---

## Estrutura do Store

### Definição do Store
```typescript
export const useAuthStore = defineStore("auth", () => {
```

**Explicação:**
- **`defineStore`**: Função do Pinia para criar um novo store
- **`"auth"`**: ID único do store no sistema
- **Composition API**: Usamos função ao invés de objeto para maior flexibilidade
- **Por que Pinia?** Gerencia estado global da aplicação de forma reativa entre componentes

---

## Estado Reativo

### Variáveis de Estado
```typescript
const alert = ref<string | null>(null);
const clientLogin = ref<ClientModel>({
    email: "",
    password: "",
});
const currentUser = ref<ClientModel | null>(null);
const token = ref<string | null>(localStorage.getItem('auth_token'));
const isLoading = ref(false);
```

**Cada linha explicada:**

#### `alert: ref<string | null>(null)`
- **Propósito**: Armazena mensagens de erro para exibir ao usuário
- **Tipo**: String ou null (quando não há erro)
- **Uso**: Feedback visual de erros de login/logout

#### `clientLogin: ref<ClientModel>`
- **Propósito**: Dados do formulário de login (email e senha)
- **Inicialização**: Objeto vazio para limpar campos
- **Reatividade**: Vinculado aos inputs do formulário

#### `currentUser: ref<ClientModel | null>`
- **Propósito**: Dados completos do usuário logado
- **Estado inicial**: `null` (usuário não logado)
- **Importância**: Base para verificar se usuário está autenticado

#### `token: ref<string | null>`
- **Propósito**: Token JWT de autenticação
- **Inicialização**: Busca no `localStorage` (persistência entre sessões)
- **Formato**: String Bearer token ou null

#### `isLoading: ref<boolean>`
- **Propósito**: Estado de carregamento para feedback visual
- **UX**: Desabilita botões e mostra spinners durante operações

---

## Computed Properties

### Verificação de Autenticação
```typescript
const isAuthenticated = computed(() => !!currentUser.value && !!token.value);
```

**Análise detalhada:**
- **`computed()`**: Propriedade calculada que recalcula automaticamente
- **Dependências**: `currentUser.value` e `token.value`
- **`!!`**: Dupla negação converte valores truthy/falsy em boolean
- **Lógica**: Usuário autenticado = tem dados do usuário E tem token válido
- **Reatividade**: Atualiza automaticamente quando dependências mudam

**Por que esta abordagem?**
- **Segurança**: Verifica tanto token quanto dados do usuário
- **Confiabilidade**: Se um dos dois falhar, considera não autenticado
- **Performance**: Cálculo reativo, não recalcula desnecessariamente

---

## Configuração de APIs

### URLs dos Endpoints
```typescript
const API_URL_CLIENT = "http://localhost:3000/login";
const API_URL_CURRENT = "http://localhost:3000/client/email";
```

### Configuração Inicial do Axios
```typescript
if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
}
```

**Explicação:**
- **Centralização**: URLs em constantes para fácil manutenção
- **Header global**: Configura Authorization para todas requisições futuras
- **Bearer Token**: Padrão JWT para autenticação HTTP
- **Inicialização**: Se já existe token (refresh da página), configura imediatamente

---

## Função de Login

### Estrutura Completa
```typescript
async function handleSubmitLogin() {
    // 1. Validação
    if (!clientLogin.value.email || !clientLogin.value.password) {
        return alert.value = "Preencha todos os campos obrigatórios";
    }
    
    try {
        // 2. Estados de Loading
        isLoading.value = true;
        alert.value = null;
        
        // 3. Chamada da API
        const response = await axios.post(API_URL_CLIENT, clientLogin.value);
        const authToken = response.data.token || response.data;
        
        // 4. Salvamento do Token
        token.value = authToken;
        localStorage.setItem('auth_token', authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        
        // 5. Buscar Dados do Usuário
        await getCurrentUser();
        
        // 6. Redirecionamento
        await router.push({ name: 'Inicio' });
        
    } catch (error) {
        // 7. Tratamento de Erro
        console.error("Erro no login", error);
        const backEndMessage = /* lógica de erro */;
        alert.value = backEndMessage;
    } finally {
        // 8. Limpeza
        isLoading.value = false;
    }
}
```

### Análise Passo a Passo

#### 1. Validação Frontend
```typescript
if (!clientLogin.value.email || !clientLogin.value.password) {
    return alert.value = "Preencha todos os campos obrigatórios";
}
```
- **Early return**: Sai da função se dados inválidos
- **UX**: Feedback imediato sem chamar API
- **Economia**: Evita requisições desnecessárias

#### 2. Estados de Loading
```typescript
isLoading.value = true;
alert.value = null;
```
- **UX**: Ativa indicadores visuais de carregamento
- **Limpeza**: Remove alertas de erros anteriores
- **Feedback**: Usuário sabe que ação está sendo processada

#### 3. Chamada da API
```typescript
const response = await axios.post(API_URL_CLIENT, clientLogin.value);
const authToken = response.data.token || response.data;
```
- **POST**: Envia email/senha para endpoint de login
- **Flexibilidade**: Aceita token em diferentes formatos de resposta
- **Await**: Aguarda resposta antes de continuar

#### 4. Salvamento do Token
```typescript
token.value = authToken;                                    // Estado reativo
localStorage.setItem('auth_token', authToken);              // Persistência
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;  // Config global
```
**Três níveis de salvamento:**
- **Store Pinia**: Para reatividade imediata
- **LocalStorage**: Para persistir entre sessões
- **Axios Header**: Para requisições automáticas

#### 5. Buscar Dados do Usuário
```typescript
await getCurrentUser();
```
- **Sequencial**: Só busca dados após salvar token
- **Necessário**: Popula `currentUser` para ativar `isAuthenticated`

#### 6. Redirecionamento
```typescript
await router.push({ name: 'Inicio' });
```
- **Programático**: Navega via código, não link
- **Await**: Garante que navegação complete

#### 7. Tratamento de Erro
```typescript
const backEndMessage =
    axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Falha ao fazer login. Verifique suas credenciais.";

alert.value = Array.isArray(backEndMessage)
    ? backEndMessage.join(", ")
    : backEndMessage;
```
- **Verificação**: Identifica se é erro do Axios
- **Flexibilidade**: Trata mensagens string ou array
- **Fallback**: Mensagem padrão se backend não enviar

#### 8. Limpeza (Finally)
```typescript
finally {
    isLoading.value = false;
}
```
- **Garantia**: Execute sempre, mesmo com erro
- **UX**: Remove loading independente do resultado

---

## Busca de Dados do Usuário

### Função getCurrentUser
```typescript
async function getCurrentUser() {
    if (!token.value) return;
    
    try {
        const response = await axios.get(`${API_URL_CURRENT}/${clientLogin.value.email}`);
        currentUser.value = response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
        await logout();
    }
}
```

### Análise Detalhada

#### Guard Clause
```typescript
if (!token.value) return;
```
- **Proteção**: Só executa se tem token
- **Performance**: Evita requisições desnecessárias

#### Requisição dos Dados
```typescript
const response = await axios.get(`${API_URL_CURRENT}/${clientLogin.value.email}`);
currentUser.value = response.data;
```
- **GET**: Busca dados usando email como parâmetro
- **Atualização**: Popula `currentUser` com dados completos
- **Reatividade**: Trigger para `isAuthenticated` ficar `true`

#### Tratamento de Erro
```typescript
catch (error) {
    await logout();
}
```
- **Segurança**: Se falhar, considera sessão inválida
- **Limpeza**: Força logout para resetar estado

---

## Função de Logout

### Estrutura Completa
```typescript
async function logout() {
    try {
        isLoading.value = true;
        
        // Limpar estado do Pinia
        token.value = null;
        currentUser.value = null;
        clientLogin.value = { email: "", password: "" };
        
        // Limpar persistência
        localStorage.removeItem('auth_token');
        
        // Limpar configuração global do Axios
        delete axios.defaults.headers.common['Authorization'];
        
        alert.value = null;
        
        // Redirecionamento
        await router.push({ name: 'Login' });
        
    } catch (error) {
        console.error("Erro ao fazer logout", error);
    } finally {
        isLoading.value = false;
    }
}
```

### Análise da Limpeza Completa

#### 1. Estado do Pinia
```typescript
token.value = null;
currentUser.value = null;
clientLogin.value = { email: "", password: "" };
alert.value = null;
```
- **Zerar refs**: Todas as variáveis reativas voltam ao estado inicial
- **Reatividade**: `isAuthenticated` automaticamente fica `false`

#### 2. Persistência Local
```typescript
localStorage.removeItem('auth_token');
```
- **Limpeza**: Remove token do storage do navegador
- **Segurança**: Evita autenticação automática no próximo acesso

#### 3. Configuração Global
```typescript
delete axios.defaults.headers.common['Authorization'];
```
- **Headers**: Remove Authorization de requisições futuras
- **Segurança**: Evita envio de token inválido

#### 4. Redirecionamento
```typescript
await router.push({ name: 'Login' });
```
- **Navegação**: Força volta para página de login
- **UX**: Usuário sabe que foi deslogado

---

## Sistema de Redirect

### No Componente SideBar.vue
```typescript
async function handleLogout(){
    authStore.logout()
}
```

### Fluxo Completo do Redirect

1. **Evento**: Usuário clica no ícone de logout
2. **Handler**: `handleLogout()` é chamada
3. **Store**: Executa `authStore.logout()`
4. **Limpeza**: Todos os estados são resetados
5. **Navigate**: `router.push()` vai para Login
6. **Reatividade**: `isAuthenticated` fica `false`
7. **UI Update**: Componentes reagem à mudança de estado

### Por que Funciona Agora?

**Problema anterior:**
```typescript
// ❌ ERRADO - sempre true
const isAuthenticated = computed(() => !!clientLogin.value);
```
- `clientLogin` sempre era um objeto, nunca `null`
- `isAuthenticated` sempre retornava `true`

**Solução atual:**
```typescript
// ✅ CORRETO - baseado em dados reais
const isAuthenticated = computed(() => !!currentUser.value && !!token.value);
```
- `currentUser` fica `null` após logout
- `token` fica `null` após logout
- `isAuthenticated` corretamente fica `false`

---

## Inicialização da Aplicação

### Função initializeAuth
```typescript
async function initializeAuth() {
    if (token.value && !currentUser.value) {
        try {
            if (clientLogin.value.email) {
                await getCurrentUser();
            } else {
                await logout();
            }
        } catch (error) {
            console.error("Erro ao inicializar autenticação", error);
            await logout();
        }
    }
}
```

### Cenários Tratados

#### 1. Token + Email existentes
- **Situação**: Usuário fez refresh da página
- **Ação**: Tenta recuperar dados do usuário
- **Resultado**: Restaura sessão completa

#### 2. Token sem Email
- **Situação**: Dados inconsistentes no localStorage
- **Ação**: Faz logout por segurança
- **Resultado**: Reset completo do estado

#### 3. Erro na inicialização
- **Situação**: Token inválido ou expirado
- **Ação**: Logout automático
- **Resultado**: Estado limpo e seguro

### Uso no main.ts
```typescript
app.mount("#app");

const authStore = useAuthStore();
authStore.initializeAuth();
```
- **Timing**: Após montar a aplicação
- **Automático**: Verifica estado sem intervenção do usuário

---

## Fluxos do Sistema

### Fluxo de Login
```
1. Usuário preenche formulário
2. Validação frontend
3. POST /login (email + senha)
4. Recebe token da API
5. Salva token (Pinia + localStorage + Axios)
6. GET /client/email (busca dados)
7. Salva currentUser
8. isAuthenticated = true
9. Redirect para /inicio
```

### Fluxo de Logout
```
1. Usuário clica logout
2. Limpa token (null)
3. Limpa currentUser (null)
4. Remove do localStorage
5. Remove header do Axios
6. isAuthenticated = false
7. Redirect para /login
```

### Fluxo de Inicialização
```
1. App inicia
2. Verifica token no localStorage
3. Se existe: tenta recuperar usuário
4. Se sucesso: restaura sessão
5. Se falha: faz logout
6. Se não existe: mantém deslogado
```

### Fluxo de Persistência
```
Refresh da página:
1. token = localStorage.getItem('auth_token')
2. Se token existe: initializeAuth()
3. Recupera dados do usuário
4. Sessão mantida automaticamente
```

---

## Problemas Resolvidos

### 1. **Autenticação Persistente**
**Problema**: Logout não funcionava, usuário continuava logado
**Causa**: `isAuthenticated` verificava objeto que sempre existia
**Solução**: Verificar `currentUser` que fica `null` após logout

### 2. **Persistência Entre Sessões**
**Problema**: Usuário perdia login ao recarregar página
**Causa**: Token não era salvo no localStorage
**Solução**: Salvar token no localStorage e verificar na inicialização

### 3. **Headers HTTP**
**Problema**: Requisições não incluíam token automaticamente
**Causa**: Header Authorization não era configurado globalmente
**Solução**: Configurar `axios.defaults.headers.common`

### 4. **Estados Inconsistentes**
**Problema**: Token salvo mas sem dados do usuário
**Causa**: Falta de validação na inicialização
**Solução**: Função `initializeAuth()` que valida e corrige

### 5. **Feedback Visual**
**Problema**: Usuário não sabia se ação estava processando
**Causa**: Falta de estados de loading
**Solução**: `isLoading` reativo para controlar UX

---

## Benefícios da Implementação

### 1. **Reatividade Automática**
- Estados mudam automaticamente em todos os componentes
- Não precisa atualizar manualmente as interfaces

### 2. **Persistência Inteligente**
- Sessão mantida entre refreshs da página
- Validação automática de tokens expirados

### 3. **Segurança Robusta**
- Limpeza completa no logout
- Validação em múltiplos níveis

### 4. **UX Otimizada**
- Estados de loading
- Mensagens de erro claras
- Redirecionamentos automáticos

### 5. **Manutenibilidade**
- Código centralizado no store
- APIs organizadas em constantes
- Tratamento de erro padronizado

### 6. **Escalabilidade**
- Fácil adicionar novos estados
- Integração simples com novos componentes
- Padrões consistentes

---

## Considerações de Segurança

### 1. **Token Storage**
- localStorage usado para persistência
- Considerar httpOnly cookies para produção
- Implementar refresh tokens

### 2. **Validação de Token**
- Verificar expiração no frontend
- Interceptors para renovação automática
- Logout forçado em caso de token inválido

### 3. **Headers HTTP**
- Bearer token padrão
- HTTPS obrigatório em produção
- Configuração de CORS apropriada

---

## Próximos Passos

### Melhorias Possíveis

1. **Refresh Token**
   - Implementar renovação automática
   - Melhorar segurança de longo prazo

2. **Interceptors Axios**
   - Tratar erros 401 automaticamente
   - Renovar tokens expirados

3. **Middleware de Rota**
   - Guards mais robustos
   - Verificação de permissões

4. **Criptografia Local**
   - Criptografar dados no localStorage
   - Melhorar segurança offline

5. **Logs de Auditoria**
   - Rastrear logins/logouts
   - Monitorar tentativas de acesso

---

**Documento gerado em**: 29 de outubro de 2025  
**Projeto**: Portal Front - Sistema de Autenticação  
**Framework**: Vue 3 + Pinia + TypeScript  
**Autor**: Sistema de Explicação Detalhada