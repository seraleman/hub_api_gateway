# API_Gateway

## Tabla de contenido

1. [Descripción](#descripción)
2. [Tecnología](#tecnología)
3. [Instalación](#instalación)

## Descripción

Este componente es el eje del desarrollo ya que en él se unen todos los microservicios de forma lógica y flexible para ser consumido por un _frontend_client_.

---

## Tecnología

- JavaScript
- GraphQL
- Apollo Server
- Docker

---

## Instalación

Para su uso se debe implementar un archivo que contenga las URL de los componentes (microservicios).

- Instalar los módulos `$ yarn install`

- Crear archivo **server.js** en _src/_ e incluir el siguiente código:

```
module.exports = {
	microservice1_api_url: 'http:/url_microservice1/',
	microservice2_api_url: 'http:/url_microservice2/',
}
```

- Correr la aplicación `$ yarn dev`

---
