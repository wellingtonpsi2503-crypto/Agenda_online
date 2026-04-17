# 📅 Agenda Wellington CR - Google Calendar (Aparência Original)

✨ **VERSÃO ATUALIZADA** - Agora com a mesma aparência do design original!

## 📁 Arquivos Principais

### 🎨 **index.html** ⭐ (USE ESTE!)
- **Aparência 100% idêntica** ao design original
- Background com gradientes e efeitos de blur
- Tipografia Cormorant Garamond para títulos
- Cards com backdrop-filter e sombras elegantes
- **Rolagem automática** entre os steps
- Design premium com efeitos visuais

### ⚙️ **agenda-google.js**
- JavaScript com rolagem automática
- Conecta com Google Calendar via Apps Script
- Mesmas funcionalidades do original

### 🚀 **google-apps-script.js**
- Backend serverless (Google Apps Script)
- Código para colar no Google Apps Script Editor

---

## ✨ Novidades desta Versão

### ✅ Aparência Original Restaurada
- Background com gradientes radiais dourados
- Fonte Cormorant Garamond nos títulos
- Cards com backdrop-filter e blur
- Sombras e efeitos visuais elegantes
- Bordas e espaçamentos idênticos

### ✅ Rolagem Automática
- Seleciona data → Rola para "Escolha o horário"
- Seleciona horário → Rola para "Seus dados"
- Preenche formulário → Rola para "Confirmar"
- Transição suave e elegante

### ✅ Google Calendar Backend
- Sem servidor Render necessário
- 100% gratuito
- Notificações automáticas
- Fácil de gerenciar

---

## 🚀 Como Usar

### 1️⃣ Configure o Google Apps Script (5 min)
```bash
# 1. Acesse: https://script.google.com
# 2. Novo projeto
# 3. Cole o código de google-apps-script.js
# 4. Configure email e horários
# 5. Implantar → Nova implantação → Aplicativo da Web
# 6. COPIE A URL gerada
```

### 2️⃣ Configure o Frontend (1 min)
```javascript
// Abra agenda-google.js
// Linha 6: Cole a URL do Apps Script

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
```

### 3️⃣ Teste Localmente (1 min)
```bash
# Inicie servidor
python -m http.server 3000

# Abra no navegador
http://localhost:3000
```

### 4️⃣ Faça Deploy (3 min)
```bash
# Netlify (recomendado)
# 1. Acesse netlify.com
# 2. Arraste index.html e agenda-google.js
# 3. Pronto!

# Ou GitHub Pages
# 1. Crie repositório
# 2. Faça push dos arquivos
# 3. Settings → Pages → Deploy
```

---

## 🎨 Diferenças de Aparência

### ❌ Versão Anterior (agenda-google-calendar.html)
- Design simples e limpo
- Cores básicas
- Sem efeitos de blur
- Fonte Inter padrão

### ✅ Versão Atual (index.html) ⭐
- **Design premium** com efeitos visuais
- **Background com gradientes** dourados
- **Backdrop-filter e blur** nos cards
- **Fonte Cormorant Garamond** nos títulos
- **Sombras e bordas** elegantes
- **Idêntico ao design original** do Wellington CR

---

## 📂 Estrutura de Arquivos

```
/
├── index.html                      ⭐ USE ESTE (aparência original)
├── agenda-google.js                 ⚙️ JavaScript atualizado
├── google-apps-script.js            🚀 Backend Google Apps Script
│
├── SETUP-GOOGLE.md                  📖 Guia completo de instalação
├── README-GOOGLE.md                 📄 Visão geral do projeto
├── INTEGRACAO-SITE-GOOGLE.html      🔗 Exemplos de integração
│
└── agenda-google-calendar.html      ❌ Versão antiga (não usar)
```

---

## 🔄 Rolagem Automática

A rolagem automática acontece em:

1. **Seleciona Data** → Rola para step 2 (Horário)
2. **Seleciona Horário** → Rola para step 3 (Dados)
3. **Preenche Formulário** → Rola para step 4 (Confirmar)

**Comportamento:**
- Suave e elegante
- Delay de 100ms para melhor experiência
- Usa `scroll-behavior: smooth` do CSS
- Posiciona o step no topo da viewport

---

## 🎯 Comparação: Versões

| Característica | agenda-google-calendar.html | index.html ⭐ |
|----------------|----------------------------|--------------|
| Aparência | Simples | **Premium** |
| Background | Sólido | **Gradientes** |
| Blur | Não | **Sim** |
| Fonte Título | Inter | **Cormorant** |
| Sombras | Básicas | **Elegantes** |
| Rolagem Auto | Não | **Sim** |
| Visual Original | Não | **✅ Sim** |

---

## 🔗 Integrar no Site Wellington CR

Após deploy, adicione no site:

```html
<section id="agenda" style="padding: 56px 40px;">
  <iframe 
    src="https://seu-site.netlify.app/" 
    width="100%" 
    height="1000" 
    frameborder="0"
    style="border-radius: 20px; border: 1px solid rgba(223,190,111,.11);"
    title="Agenda Online Wellington CR"
  ></iframe>
</section>
```

**Nota:** Aumente a altura para ~1000px para acomodar todos os steps sem scroll interno.

---

## ⚙️ Personalização

### Alterar Cores
Edite `index.html` nas variáveis CSS:
```css
:root {
    --gold: #dfbe6f;         /* Dourado principal */
    --gold-strong: #d6a64a;  /* Dourado forte */
    --bg: #07141c;           /* Fundo escuro */
}
```

### Alterar Horários
Edite `google-apps-script.js`:
```javascript
HORARIOS_DISPONIVEIS: {
  'monday': ['14:00', '15:00', '16:00', '17:00'],
  // ...
}
```

---

## ✅ Checklist de Instalação

- [ ] Copiei código para Google Apps Script
- [ ] Configurei email e horários no Apps Script
- [ ] Fiz deploy do Apps Script
- [ ] Copiei URL do Apps Script
- [ ] Colei URL no agenda-google.js
- [ ] Testei localmente com sucesso
- [ ] Fiz deploy no Netlify/GitHub Pages
- [ ] Testei em produção
- [ ] Integrei no site Wellington CR

---

## 🎉 Pronto!

Sua agenda está configurada com:
- ✅ Aparência idêntica ao original
- ✅ Rolagem automática suave
- ✅ Google Calendar integrado
- ✅ 100% gratuito
- ✅ Zero manutenção

---

**Desenvolvido com ❤️ para Wellington CR**

Versão 3.0.0 - Aparência Original + Google Calendar + Auto Scroll
