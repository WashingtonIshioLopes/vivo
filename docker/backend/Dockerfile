# Use a imagem oficial do Node.js na versão 20.14.0
FROM node:20.14.0

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

RUN npm config set strict-ssl false

# Copia o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

RUN npm cache verify

# Instala as dependências do projeto
RUN npm install --unsafe-perm

# Copia todos os arquivos do projeto (exceto node_modules) para dentro do contêiner

COPY . .

# Expõe a porta em que a aplicação estará escutando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

