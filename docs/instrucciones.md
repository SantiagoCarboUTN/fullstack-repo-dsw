# Instrucciones de instalación del proyecto

## Node

Para el correcto funcionamiento del proyecto debemos instalar la versión específica del runtime. La herramienta que utilizamos para instalar node fue fnm

### Versión de node

Nosotros en el proyecto utilizamos la version 23.10

### fnm

- [Instrucciones de instalación](https://github.com/Schniz/fnm)

## PNPM

Como package manager del proyecto utilizamos PNPM

- [Instrucciones de instalación](https://pnpm.io/installation)

## Nx y CI

Para el control del monorepo y para la implementación de integración continua (con github actions) usamos Nx.Para aprovechar Nx en Visual Studio instalamos la extensión "Nx console". Para ver los pipelines de CI se deberá registrarse eb Nx cloud ya sea creando una cuenta o con github.

## Clonado del repo

Para poder traer el repo a tu equipo se debe clonarlo. Una vez situados en el directorio donde estará el repo, ejecutamos:
git clone https://github.com/SantiagoCarboUTN/fullstack-repo-dsw.git

Si creas un directorio para tener el repo antes ejecutar: git init

## Dependencias

Una vez clonado el repo deberemos utilizar el package manager para instalar las dependencias especificadas tanto
del front como del back, para ello ejecutamos:
pnpm install

## Scripts

Para desarrollo tanto en el front como en el back tenemos el script de desarrollo dev que inicia el servidor de desarrollo:
En el package.json del back: "dev": "tsc-watch --noClear -p ./tsconfig.json --onSuccess \"node ./dist/app.js\""
En el package.json del front: "dev":"vite"

Para correr uno específico podemos correr desde el directorio raiz:
pnpm --filter backend dev --> para levantar solo el back
pnpm --filter frontend dev --> para levantar solo el front
pnpm run dev ó node --run dev --> para ejecutar ambos scripts

Tambien podemos usar la Nx console para ejecutar un script especifico de cada parte (ej:build, test,lint ,dev)
