<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# EmpresaLivre - Diagnóstico Empresarial

Aplicação web para agendamento de diagnóstico empresarial desenvolvida com React, TypeScript e Vite.

Ver o app no AI Studio: https://ai.studio/apps/drive/1eMo9FMrWOf9ZCC7DPXH-IljYekN-Ki2b

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Repositório
Certifique-se de que seu código está no GitHub:
```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### Passo 2: Importar na Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente (veja abaixo)
5. Clique em "Deploy"

### Passo 3: Configurar Variáveis de Ambiente
No painel da Vercel, adicione a seguinte variável:
- **Nome:** `GEMINI_API_KEY`
- **Valor:** Sua chave da API Gemini (obtenha em https://aistudio.google.com/app/apikey)

## 💻 Executar Localmente

**Pré-requisitos:** Node.js

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env.local`
   - Adicione sua chave da API Gemini no arquivo `.env.local`:
     ```
     GEMINI_API_KEY=sua_chave_aqui
     ```

3. **Executar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação:**
   - Abra http://localhost:3000 no navegador

## 🔨 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run preview` - Visualiza o build de produção localmente

## 📦 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Lucide React** - Ícones
- **Google Gemini API** - IA para processamento de formulários

## 🔒 Segurança

⚠️ **Importante:** Nunca commite o arquivo `.env.local` no repositório. Ele já está incluído no `.gitignore` para sua segurança.
