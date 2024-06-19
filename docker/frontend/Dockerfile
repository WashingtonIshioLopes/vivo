# Use a imagem oficial do Caddy como base
FROM caddy:latest

# Copie o arquivo de configuração e o diretório dist para o contêiner
COPY Caddyfile /etc/caddy/Caddyfile
COPY dist/filmes-app /usr/share/caddy/dist

# Exponha a porta 80 do contêiner
EXPOSE 80
