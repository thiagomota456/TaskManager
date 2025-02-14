# Usa a imagem oficial do .NET SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia os arquivos do projeto e restaura as dependências
COPY . ./
RUN dotnet restore

# Compila o projeto em modo Release
RUN dotnet publish -c Release -o /out

# Usa uma imagem mais leve para rodar a API
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copia os arquivos da build para a imagem final
COPY --from=build /out .

# Expondo a porta para comunicação
EXPOSE 8080

# Define a variável de ambiente para ouvir todas as conexões
ENV ASPNETCORE_URLS=http://+:8080

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "ToDoListAPI.dll"]
