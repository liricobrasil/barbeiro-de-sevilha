# Guia de Publicação — O Barbeiro de Sevilha

Este documento fornece instruções passo a passo para publicar o site permanentemente em plataformas de hospedagem estática.

## Opção 1: GitHub Pages (Recomendado)

### Pré-requisitos
- Conta no GitHub (grátis em https://github.com)
- Git instalado no seu computador

### Passos

1. **Criar um Repositório no GitHub**
   - Acesse https://github.com/new
   - Nome do repositório: `barbeiro-sevilha` (ou outro nome de sua preferência)
   - Descrição: "Programa Musical Oficial - O Barbeiro de Sevilha - Companhia Lírico Brasil"
   - Escolha "Public" para que seja acessível
   - Clique em "Create repository"

2. **Fazer Upload dos Arquivos**
   ```bash
   cd /caminho/para/barbeiro_sevilha
   git remote add origin https://github.com/seu-usuario/barbeiro-sevilha.git
   git branch -M main
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - Vá para as configurações do repositório
   - Desça até "GitHub Pages"
   - Em "Source", selecione "main branch"
   - Clique em "Save"

4. **Acessar o Site**
   - O site estará disponível em: `https://seu-usuario.github.io/barbeiro-sevilha/`
   - Pode levar alguns minutos para ficar ativo

### Vantagens
- ✅ Hospedagem gratuita e permanente
- ✅ Domínio GitHub Pages incluído
- ✅ SSL/HTTPS automático
- ✅ Fácil de atualizar (basta fazer push)
- ✅ Histórico de versões com Git

---

## Opção 2: Netlify

### Pré-requisitos
- Conta no Netlify (grátis em https://netlify.com)
- Repositório GitHub (opcional, mas recomendado)

### Passos

1. **Fazer Upload via Netlify Drop**
   - Acesse https://app.netlify.com/drop
   - Arraste a pasta `barbeiro_sevilha` para a área indicada
   - Pronto! O site estará online em minutos

2. **Ou Conectar um Repositório GitHub**
   - Faça login no Netlify
   - Clique em "New site from Git"
   - Conecte sua conta GitHub
   - Selecione o repositório `barbeiro-sevilha`
   - Clique em "Deploy"

3. **Configurar Domínio Personalizado (Opcional)**
   - Na seção "Domain settings"
   - Clique em "Add custom domain"
   - Siga as instruções para apontar seu domínio

### Vantagens
- ✅ Hospedagem gratuita
- ✅ Deploy automático ao fazer push no Git
- ✅ Preview de mudanças antes de publicar
- ✅ Suporte a formulários e funções serverless

---

## Opção 3: Vercel

### Pré-requisitos
- Conta no Vercel (grátis em https://vercel.com)
- Repositório GitHub

### Passos

1. **Conectar Repositório**
   - Acesse https://vercel.com/new
   - Clique em "Import Git Repository"
   - Selecione o repositório `barbeiro-sevilha`

2. **Configurar Projeto**
   - Framework: Selecione "Other" (para site estático)
   - Build Command: deixe em branco
   - Output Directory: `.` (diretório raiz)

3. **Deploy**
   - Clique em "Deploy"
   - O site estará online em segundos

### Vantagens
- ✅ Hospedagem ultra-rápida
- ✅ Deploy automático
- ✅ Analytics incluído
- ✅ Domínio Vercel gratuito

---

## Opção 4: Firebase Hosting

### Pré-requisitos
- Conta no Google Firebase (grátis em https://firebase.google.com)
- Node.js instalado

### Passos

1. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Fazer Login**
   ```bash
   firebase login
   ```

3. **Inicializar Projeto**
   ```bash
   cd /caminho/para/barbeiro_sevilha
   firebase init hosting
   ```
   - Selecione "Use an existing project" ou crie um novo
   - Public directory: `.` (diretório raiz)

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Vantagens
- ✅ Hospedagem gratuita do Google
- ✅ CDN global
- ✅ SSL/HTTPS automático
- ✅ Integração com outros serviços Google

---

## Manutenção e Atualizações

### Fazer Atualizações no Site

1. **Editar Arquivos Localmente**
   - Modifique o HTML, CSS ou JavaScript conforme necessário
   - Adicione novas imagens ou vídeos

2. **Fazer Commit e Push**
   ```bash
   git add .
   git commit -m "Descrição da atualização"
   git push origin main
   ```

3. **Deploy Automático**
   - GitHub Pages, Netlify e Vercel atualizam automaticamente
   - Firebase requer `firebase deploy`

### Versionamento

Mantenha um histórico de versões com commits descritivos:
```bash
git commit -m "Adiciona novos vídeos da apresentação"
git commit -m "Atualiza informações do elenco"
git commit -m "Corrige links e otimiza imagens"
```

---

## Monitoramento e Performance

### Ferramentas Recomendadas

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Analisa velocidade e performance

2. **GTmetrix**
   - https://gtmetrix.com/
   - Relatório detalhado de performance

3. **Google Analytics**
   - Adicione ao `index.html` para rastrear visitantes
   - Código de rastreamento: `<!-- Google Analytics -->`

---

## Domínio Personalizado

Se desejar um domínio próprio (ex: `www.barbeiro-sevilha.com.br`):

1. **Registrar Domínio**
   - Registradores: GoDaddy, Namecheap, HostGator, etc.
   - Custo: ~R$ 30-50 por ano

2. **Apontar para Hospedagem**
   - Configure os DNS records para apontar para GitHub Pages, Netlify ou Vercel
   - Cada plataforma fornece instruções específicas

3. **SSL/HTTPS**
   - Automaticamente incluído em todas as plataformas

---

## Suporte e Troubleshooting

### Problema: Site não carrega
- Verifique se todos os arquivos foram enviados
- Confirme que o `index.html` está no diretório raiz
- Aguarde 5-10 minutos para propagação de DNS

### Problema: Vídeos não reproduzem
- Confirme que os arquivos MP4 foram enviados
- Verifique os caminhos no `index.html`
- Teste em diferentes navegadores

### Problema: Imagens não aparecem
- Verifique os caminhos relativos no HTML
- Confirme que as imagens estão no diretório correto
- Teste com URLs absolutas se necessário

---

## Próximos Passos

1. ✅ Escolha uma plataforma de hospedagem
2. ✅ Siga as instruções de publicação
3. ✅ Teste o site em diferentes dispositivos
4. ✅ Compartilhe o link com o público
5. ✅ Monitore o desempenho e faça atualizações conforme necessário

---

**Programa Musical Oficial — O Barbeiro de Sevilha**  
Companhia de Ópera Lírico Brasil · Instituto Antonio Gasparini  
Feira de Santana, Bahia — 2026
