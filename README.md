# Consulta CNPJ

O objetivo desta aplicação é coletar um cpnj, através da leitura de um QRCode, para realizar a consulta desse cnpj na API https://receitaws.com.br/api.
Após realizada a consulta, a aplicação gravará no SQLite a razão social e o cnpj retornado pela API, para posteriormente exibir a última razão social e cnpj gravados no SQLite.

### Tecnologias utilizadas
* React Native
* Expo 
* SQLite

### Configuração do ambiente de desenvolvimento
Instalar VSCode, Node.js, Yarn e Expo.

### Execução do projeto

Clonar repositório e dentro do VSCode executar o seguinte:

```
yarn install
yarn start
```

Para executar o aplicativo dentro do seu dispositivo, baixar o expo e ler o QRCode exibido após a execução do último comando listado acima.

### Demonstração do projeto

<img src="https://i.picasion.com/pic90/af4ff14c0762422f7c4dc48f6275939d.gif" width="300" height="633" border="0"/>
