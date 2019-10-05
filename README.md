# www-back-end

![](https://img.shields.io/docker/automated/german1608/world-white-web?style=flat-square) ![](https://img.shields.io/travis/World-White-Web/www-back-end/develop?style=flat-square) ![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square) [![Coverage Status](https://coveralls.io/repos/github/World-White-Web/www-back-end/badge.svg?branch=develop)](https://coveralls.io/github/World-White-Web/www-back-end?branch=develop)

Backend para la aplicación World White Web. MiniProyecto de Desarrollo de Software para la USBve.

## Integrantes

* Yuni Quintero
* Germán Robayo
* Nairelys Hernandez
* Fabiola Martinez
* David Cabeza
* Jose Acevedo

## Tutores

* Yudith Cardinale
* Irvin Dongo

## Instalación del Proyecto

### Requerimientos

Solo es necesario tener instalado Node lts/dubnium (v10.16.0). Se recomienda usar nvm para administrar las versiones locales de node.

### Cómo ejecutar

#### Para desarrollo

1. Ejecuta `npm install` para descargar todas las dependencias.
2. Exporta el puerto como variable de entorno, abre un terminal y ejecuta:

Para un shell temporal:
```sh
$ export PORT=3000
```

Para todas las sesiones:
```sh
#- BASH
$ echo 'export PORT=3000' >> ~/.bash_profile
$ source ~/.bash_profile
#- ZSH
$ echo 'export PORT=3000' >> ~/.zsh_profile
$ source ~/.zsh_profile
```

3. Ejecuta `npm start` para correr el servidor de desarrollo. El mismo se encarga recargar las páginas en el navegador cuando guardas alguna modificación a los archvos del repositorio.
4. Visita http://localhost:3000/health
5. Verificar que retorne código 200 y un JSON { "status": "UP" }

## Como contribuir

1. Clona el repositorio y haz `checkout` a la rama `develop`
2. Crea una rama para que desarrolles lo tuyo. Dicha rama debe seguir las [convenciones de rama](#convenciones-de-rama).
3. Cuando creas que tu código está listo, haz un pull request para integrar tu rama a `develop`. Pones de reviewer a todos los otros integrantes del equipo.

### Convenciones de rama

* `feature/*` para ramas que contienen cosas nuevas. Ejemplo: `feature/anade-soporte-a-facebook`.
* `bugfix/*` para ramas que contienen fixes a cosas ya existentes. Ejemplo: `bugfix/arregla-calculo-de-pesos`.

## En caso de dudas

Contactar al administrador del repo: @german1608