# 📅 Agenda Online com Google Calendar - Guia Completo

Sistema de agendamento online integrado ao **Google Calendar**, com interface personalizada nas cores do seu site.

## ✨ Características

- ✅ **100% Gratuito** - sem custos mensais
- ✅ **Sem servidor backend** - usa Google Apps Script (serverless)
- ✅ **Visual personalizado** - cores douradas do Wellington CR
- ✅ **Google Calendar** como sistema principal
- ✅ **Notificações automáticas** por email
- ✅ **Convites automáticos** para clientes
- ✅ **Responsivo** - funciona em mobile e desktop

---

## 🚀 Instalação - Passo a Passo

### **Passo 1: Criar o Google Apps Script** (5 min)

1. Acesse: https://script.google.com
2. Clique em **"Novo projeto"**
3. Cole todo o conteúdo do arquivo `google-apps-script.js`
4. **Configure suas preferências:**

```javascript
const CONFIG = {
  CALENDAR_ID: 'primary',  // Seu calendário principal
  
  HORARIOS_DISPONIVEIS: {
    'monday': ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    'tuesday': ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    // ... ajuste conforme sua disponibilidade
  },
  
  DURACAO_SESSAO: 60,  // Duração em minutos
  
  EMAIL_NOTIFICACAO: 'seu-email@gmail.com'  // Seu email real
};
```

5. Clique em **"Salvar"** (ícone de disquete)
6. Dê um nome ao projeto: **"Agenda Wellington CR"**

### **Passo 2: Fazer Deploy do Apps Script** (3 min)

1. No Apps Script, clique em **"Implantar"** → **"Nova implantação"**
2. Clique no ícone de **engrenagem** ⚙️ ao lado de "Selecione o tipo"
3. Selecione **"Aplicativo da Web"**
4. Configure:
   - **Descrição:** "Agenda Wellington CR"
   - **Executar como:** "Eu (seu email)"
   - **Quem tem acesso:** "Qualquer pessoa"
5. Clique em **"Implantar"**
6. **Autorize o acesso:**
   - Clique em "Autorizar acesso"
   - Selecione sua conta Google
   - Clique em "Avançado"
   - Clique em "Acessar Agenda Wellington CR (não seguro)"
   - Clique em "Permitir"
7. **COPIE A URL** que aparece (algo como: `https://script.google.com/macros/s/...`)

### **Passo 3: Configurar o Frontend** (2 min)

1. Abra o arquivo `agenda-google.js`
2. Na **linha 6**, cole a URL do Apps Script:

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfy...SUA_URL_AQUI.../exec';
```

3. Salve o arquivo

### **Passo 4: Testar Localmente** (1 min)

```bash
# Abra a pasta do projeto no terminal

# Inicie um servidor local
python -m http.server 3000

# Ou use Node.js
npx serve
```

Acesse: `http://localhost:3000/agenda-google-calendar.html`

### **Passo 5: Fazer o Primeiro Teste** ✅

1. Abra a agenda no navegador
2. Escolha uma data
3. Escolha um horário
4. Preencha seus dados
5. Clique em "Confirmar"
6. Verifique seu **Google Calendar** - o evento deve aparecer!
7. Verifique seu **email** - você deve receber uma notificação

---

## 🌐 Deploy em Produção

### **Opção 1: Netlify (Recomendado)**

1. Acesse: https://netlify.com
2. Faça login com GitHub
3. Clique em **"Add new site"** → **"Deploy manually"**
4. Arraste os arquivos:
   - `agenda-google-calendar.html`
   - `agenda-google.js`
5. Aguarde o deploy
6. **Copie a URL** gerada (exemplo: `https://seu-site.netlify.app`)

### **Opção 2: GitHub Pages**

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em **Settings** → **Pages**
4. Selecione **"Deploy from main branch"**
5. Aguarde alguns minutos
6. Acesse: `https://seu-usuario.github.io/nome-repo`

### **Opção 3: Vercel**

```bash
# Instale o Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel --prod
```

---

## 🔗 Incorporar no Seu Site

Depois do deploy, adicione no seu site Wellington CR:

```html
<section id="agenda" class="glass panel" style="padding: 56px 40px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <p class="eyebrow">Agenda Online</p>
    <h2 class="title-font section-title">Agende sua Sessão</h2>
  </div>
  
  <iframe 
    src="https://seu-site.netlify.app/agenda-google-calendar.html" 
    width="100%" 
    height="900" 
    frameborder="0"
    style="border-radius: 20px; border: 1px solid rgba(223,190,111,.11); overflow: hidden;"
    title="Agenda Online Wellington CR"
    loading="lazy"
  ></iframe>
</section>
```

**Substitua** `https://seu-site.netlify.app` pela URL real do seu deploy!

---

## ⚙️ Personalização

### **Alterar Horários Disponíveis**

Edite `google-apps-script.js` no Apps Script Editor:

```javascript
HORARIOS_DISPONIVEIS: {
  'monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],  // Segunda
  'tuesday': ['14:00', '15:00', '16:00', '17:00'],          // Terça
  'wednesday': ['14:00', '15:00', '16:00', '17:00'],        // Quarta
  'thursday': ['14:00', '15:00', '16:00', '17:00'],         // Quinta
  'friday': ['14:00', '15:00', '16:00', '17:00'],           // Sexta
  'saturday': ['09:00', '10:00', '11:00']                   // Sábado (opcional)
}
```

Depois de editar, clique em **"Implantar"** → **"Gerenciar implantações"** → **"Editar"** → **"Implantar"**

### **Alterar Duração das Sessões**

```javascript
DURACAO_SESSAO: 60,  // Altere para 50, 90, etc.
```

### **Alterar Cores do Site**

Edite `agenda-google-calendar.html` na seção `<style>`:

```css
:root {
    --bg: #07141c;           /* Fundo principal */
    --bg-soft: #0b1a24;      /* Fundo secundário */
    --gold: #dfbe6f;         /* Dourado */
    --gold-strong: #d6a64a;  /* Dourado forte */
}
```

---

## 📊 Gerenciar Agendamentos

### **Ver Agendamentos**

1. Acesse: https://calendar.google.com
2. Todos os agendamentos aparecem automaticamente
3. Clique em um evento para ver detalhes do cliente

### **Cancelar Agendamento**

1. Abra o evento no Google Calendar
2. Clique em "Excluir"
3. O cliente receberá notificação de cancelamento

### **Reagendar**

1. Arraste o evento para nova data/hora no Google Calendar
2. O cliente receberá notificação de alteração

---

## 🔔 Notificações

### **Você Recebe:**
- ✅ Email quando alguém agenda
- ✅ Notificação no Google Calendar
- ✅ Lembrete antes da sessão (configurável no Calendar)

### **Cliente Recebe:**
- ✅ Convite do Google Calendar por email
- ✅ Confirmação de horário
- ✅ Lembrete antes da sessão
- ✅ Notificação se você reagendar/cancelar

---

## 🛠️ Troubleshooting

### **"APPS_SCRIPT_URL não configurado"**

Verifique:
1. Você copiou a URL correta do Apps Script
2. A URL está entre aspas em `agenda-google.js`
3. A URL termina com `/exec`

### **"Erro ao carregar datas"**

Verifique:
1. O Apps Script está implantado
2. A URL está correta
3. Você autorizou o acesso ao Google Calendar

### **"Agendamento não aparece no Calendar"**

Verifique:
1. `CALENDAR_ID` está correto (use `'primary'` para calendário principal)
2. Você autorizou o acesso
3. Olhe no calendário correto (se tiver múltiplos)

### **"Cliente não recebeu email"**

Verifique:
1. Email do cliente está correto
2. Verifique a caixa de spam do cliente
3. O Google Calendar pode demorar alguns minutos

---

## 🎯 Próximas Melhorias (Opcional)

- [ ] Sincronizar com Google Meet (adicionar link automático)
- [ ] Integrar com WhatsApp (notificações)
- [ ] Adicionar pagamento online
- [ ] Dashboard de métricas
- [ ] Reagendamento pelo cliente

---

## 🔐 Segurança

✅ Seus dados ficam no Google Calendar (seguro e privado)  
✅ Google Apps Script é executado no servidor do Google  
✅ Nenhum dado sensível é armazenado no frontend  
✅ HTTPS automático em todos os deploys  

---

## 📞 Comandos Úteis

### **Testar Apps Script**

No Apps Script Editor:
1. Selecione a função `testarConfiguracao`
2. Clique em ▶️ **Executar**
3. Veja os logs em **Execuções**

### **Ver Logs**

No Apps Script Editor:
1. Clique em "Execuções" (menu lateral)
2. Veja todas as requisições e erros

### **Atualizar Código**

1. Edite o código no Apps Script
2. Salve (Ctrl+S)
3. **Implantar** → **Gerenciar implantações** → **Editar** → **Implantar**

---

## 📄 Estrutura de Arquivos

```
agenda-google-calendar/
├── agenda-google-calendar.html    # Frontend (interface visual)
├── agenda-google.js                # JavaScript do frontend
├── google-apps-script.js           # Backend (Google Apps Script)
└── SETUP-GOOGLE.md                 # Este guia
```

---

## 💡 Dicas Importantes

1. **Sempre use `'primary'` como CALENDAR_ID** (é o mais simples)
2. **Teste localmente antes do deploy**
3. **Faça backup da URL do Apps Script** (anote em lugar seguro)
4. **Personalize os horários conforme sua agenda real**
5. **Configure lembretes no Google Calendar** para não esquecer

---

## ✅ Checklist Final

- [ ] Apps Script criado e configurado
- [ ] Apps Script implantado (deploy feito)
- [ ] URL do Apps Script copiada
- [ ] URL colada no `agenda-google.js`
- [ ] Testado localmente com sucesso
- [ ] Deploy feito (Netlify/GitHub Pages/Vercel)
- [ ] Testado em produção
- [ ] Incorporado no site Wellington CR
- [ ] Primeiro agendamento de teste realizado
- [ ] Email de notificação recebido

---

## 🎉 Tudo Pronto!

Sua agenda está configurada e funcionando!

**Vantagens desta solução:**
- ✅ 100% gratuita
- ✅ Sem servidor para manter
- ✅ Google Calendar gerencia tudo
- ✅ Visual personalizado
- ✅ Notificações automáticas
- ✅ Fácil de gerenciar

---

**Desenvolvido com ❤️ para Wellington CR**

Versão 2.0.0 - Google Calendar Edition
