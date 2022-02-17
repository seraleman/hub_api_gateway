# Api_Gateway

## Tabla de contenido

1. [Descripción](#descripción)
2. [Tecnología](#tecnología)
3. [Instalación](#instalación)

# Descripción

Este componente es el eje del desarrollo ya que en él se unen todos los microservicios de forma lógica y flexible para ser consumido por un frontend_client.

---

# Tecnología

- JavaScript
- GraphQL
- Apollo Server
- Docker

---

# Instalación

Para su uso se debe implementar un archivo que contenga las URL de los componentes (microservicios).

- Crear archivo **server.js** en _src/_ e incluir el siguiente código:

```
module.exports = {
	ejm1_api_url: '',
	ejm2_api_url: '',
}
```

- Correr la aplicación
  $ yarn dev

---
