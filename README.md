# Aplicativo SP Medical Group  
Aplicatiovo da empresa fantasma SP Medical Group.  
Tem o objetivo de mostrar as consultas para os usuarios.  
## Sumario  

- 1 [Instalação](#Instalação)  
    - 1.1 [Preparação](#Preparação)  
    - 1.2 [Bibliotecas](#Bibliotecas)  
- 2 [Telas](#Telas)  
- 3 [Services](#Services)  
- 4 [Cronograma](#Cronograma)  
- 4 [Bibliografia](#Bibliografia)  

## Instalação  
Para que o projeto funcione você precisará ter :  
 - [Banco de dados](https://github.com/Chingling152/SQL-SPMedgroup)  
 - [API](https://github.com/Chingling152/WebApi-SPMedGroup) (E todos seus requisitos)  
 - [Node.js , JDK e Android SDK](https://gist.github.com/Chingling152/dc3e7dc6cd784636649a43e9fcaeb060)  
 Todos eles tem uma documentação propria, então é só seguir as instruções.  
 
### Preparação  
Antes de iniciar o projeto você deve fazer tudo que está nos links acima. Então você deverá :  
- Executar a API (verifique se ela esta funcionando ou não no endpoint */swagger/index.html* testando o login)  
- Caso tudo esteja funcionando, abra o cmd na pasta do projeto (aperte F4 , apague todo o caminho da pasta e digite **cmd**)  
- Execute o primeiro comando : **npm install** (irá instalar tudo que o projeto precisa ([Veja:Bibliotecas](#Bibliotecas)))
- Você vai precisar ir no arquivo [APIService.js](https://github.com/Chingling152/ReactNative-SpMedicalGroup/blob/master/src/services/apiServices.js) e mudar a variavel **baseURL** para o ip da sua API.  
Exemplo :
```javascript
const baseURL = "http://{coloque seu ip aqui}:5000/api/v1/"//mude para o seu ip aqui
```
- Você tambem devera ir para a API e setar o mesmo ip para ela no arquivo [Properties/launchSettings](https://github.com/Chingling152/WebApi-SPMedGroup/blob/master/Senai.WebApi.SpMedGroup/Properties/launchSettings.json)
- O proximo comando sera : **react-native run-android**  
- O projeto ira abrir na avd ou no seu celular (depende qual você esta usando)  

### Bibliotecas  
Aqui está todas as bibliotecas que serão instaladas ao ser digitado o comando **npm install** na pasta do projeto (alem do react-native)  

- react-navigation  
- react-native-gesture-handler  
- \@react-native-community/async-storage  
- jwt-decode  

## Telas
Apos iniciar o projeto a primeira tela sera a de login (você precisa pelo menos ter um valor cadastrado no banco de dados ([Veja: Banco de dados- Valores inicias](https://github.com/Chingling152/SQL-SPMedGroup/blob/master/Essenciais/5-Valores_iniciais.sql)) ou insira algum usando a API/Site)  
Ao logar você poderá apenas visualizar suas consultas, ou clicar em uma delas e ver todas as suas informações.  
Todas as telas só são acessiveis depois de o usuario estar logado.  

> Tela de login
![Login.png](https://trello-attachments.s3.amazonaws.com/5cd94e84ab55b2087ea1c77b/1080x1920/fa9777b3dbad89e9806dccc8ffe95c22/tela_login.png)
>

Caso ocorra algum problema (com a API por exemplo) será retornado apenas um erro sem muitos detalhes.  
O mesmo acontece com erro de autenticação e validação.  

Ao entrar na tela de visualizar consultas, você verá todas as consultas (caso você logue como administrador você podera ver todas , mas não podera altera-las porque esta função só é disponivel no [Site da SPMedicalGroup](https://github.com/Chingling152/React-SpMedGroup))

> Tela de listagem de consultas
![Listagem consultas](https://trello-attachments.s3.amazonaws.com/5cd94e84ab55b2087ea1c77b/1080x1920/571e7501d37fe1e2646bea3aeadf0a38/Screenshot_1558127194.png)
>

Na tela de visualizar terá apenas alguns detalhes a mais. Como por exemplo a descrição completa (que na listagem de todas as consultas apenas mostra no maximo 114 caracteres).  

> Tela de listagem de consulta
![Listagem consulta](https://trello-attachments.s3.amazonaws.com/5cd94e84ab55b2087ea1c77b/1080x1920/f982fbbf07f75bf519a21f642ff0f719/Screenshot_1558128253.png)
>

Você podera ver a sua localização atual e o caminho para a clinica onde a consulta foi marcada. Para isso voce deverá permitir que o aplicativo use a função GPS do seu celular e estar com ela ligada.  

## Services

## Cronograma

O projeto foi iniciado no dia **13/05/2019** e finalizado no dia **23/05/2019**.  
Aqui ficara meu cronograma do projeto com todas minhas atividades.  

- **Dia 0**  
Eu ja tinha o layout pronto do mobile que foi feito na criação do site (então deixei isso como dia 0 porque não aconteceu no dia do projeto em si, mas foi usado nele (um pouco))
- **Dia 1**  
	- Iniciei a arquitetura do projeto criando todas as paginas (apenas com um Text nela com o nome da pagina).  
	- Instalei quase todas as bibliotecas necessarias (AsyncStorage foi instalada no **dia 3**).  
	- Iniciei a pagina de login. Fiz os primeiros testes de login.  
- **Dia 2**  
	- Importei meu arquivo de services padrão (Conexão com API e Validação de token).  
	- Recebi o token e lidei com os erros de email/senha.  
	- Criei as rotas entre as telas e fiz a o usuario ser redirecionado para a pagina de listar consultas ao logar.  
	- Iniciei a pagina de visualização de consultas.  
	- Componentizei a consulta assim poderia buscar os valores.  
- **Dia 3**  
	- Iniciei a estilização do projeto.  
	- Adicionei uma Splashscreen ao projeto e um icone.  
	- Estilizei a pagina de Login e  o StackNavigator.  
	- Instalei a biblioteca para o AsyncStorage e iniciei o login automatico.  
	- Iniciei a função de deslogar o usuario (ainda não estava 100% funcional).  
- **Dia 4**  
	- Finalizei a visualização de consultas. 
	- Finalizei a função de logout.  
	- Iniciei a visualização de apenas uma consulta.  
	- Adicionei um indicador de carregamento nas telas de login e listagem de consulta.  
- **Dia 5**  
	- Finalizei a listagem de uma consulta.  
	- Iniciei a documentação colocando informações ate aqui (fui incrementando esse cronograma a cada dia)  
	- Adicionei feedback aos usuarios que não tem consultas
	- Adicionei uma pagina inicial para verificar dados do usuario e API  
- **Dia 6**  
	- Passei o dia inteiro retocando o projeto (testando vulnerabilidades). 
	- Arrumei o design do aplicativo 
	- Fixei alguns problemas de UX 
- **Dia 7**
	- Iniciei a parte de localização do usuario.  
	- Tentei resolver problemas com permissão do usuario para acessar o GPS. 
	- Finalizei o
- **Dia 8**
	- Resolvi problemas do GPS e permissão do usuario
	- Inicei o mapa 
	- Modifiquei a status bar



## Bibliografia  
- [Autenticação, SwitchNavigator](https://github.com/senai-desenvolvimento/1s2019-t2-sprint-5-mobile)
- [Passando parametros para telas](https://reactnavigation.org/docs/en/params.html)  
- [AsyncStorage - MultiGet](https://facebook.github.io/react-native/docs/asyncstorage#multiget)  
- [Icone e Splashscreen](https://www.youtube.com/watch?v=3Gf9yb53bJM)  
- [StatusBar](https://github.com/Saulomsantos/senai_roman_desafio_projectmanagement/blob/master/frontEnd/RNRoman/android/app/src/main/res/drawable/background_splash.xmll)  
- [Stack Navigator](https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-used-by-stacknavigator)  
- [Activity Indicator](https://facebook.github.io/react-native/docs/activityindicator)  
- [Logout Button](https://www.youtube.com/watch?v=Aj5QN7q3xdI)  
- [Permissão e localização do usuario](https://facebook.github.io/react-native/docs/geolocation.html)
- [Texto Animado](https://www.youtube.com/watch?v=IWW72SArDMo)
https://medium.com/@princessjanf/react-native-maps-with-direction-from-current-location-ab1a371732c2
https://medium.com/nerdzao/utilizando-rotas-com-a-google-maps-api-no-react-native-69a05a434ab5
