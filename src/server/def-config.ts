export const staticConfigYaml=`
server:
  port: 3021
  session-store: memory-saved
db:
  motor: postgresql
  host: localhost
  database: puntapie_inicial_db
  schema: puntapie_inicial
  user: puntapie_inicial_owner
login:
  table: usuarios
  userFieldName: usuario
  passFieldName: md5clave
  rolFieldName: rol
  infoFieldList: [usuario, rol]
  activeClausule: activo
  plus:
    allowHttpLogin: true
    fileStore: true
    loginForm:
      formTitle: entrada
      formImg: unlogged/tables-lock.png
    noLoggedUrlPath: /pub
client-setup:
  menu: true
  lang: es
  user-scalable: no
install:
  dump:
    scripts:
      post-adapt: []
logo: 
  path: client/img
`;