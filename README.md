# Pokedex Challenge

## Descripcion

Para construir este proyecto usé Vite para la instalación/arquitectura del repo, Vue 3, Bootstrap y TypeScript. Sumé Fuse.js para mejorar el filtrado de pokémon: como el diseño no plantea paginación, me pareció correcto darle “ayuda” al usuario para navegar mejor.

Me gusta trabajar desde siempre bajo los principios SOLID, KISS y DRY. Separo vistas de componentes y, dentro de componentes, diferencio los de UI básicos (botón, inputs) de los que tienen lógica. Intenté que todo sea reutilizable y alimentado por props. Cuando un componente/vista concentra bastante HTML + lógica, separo CSS dedicado para hacerlo más legible y escalable, asignando responsabilidades únicas a cada archivo.

También separé las stores: una para todos los pokémon y otra sólo para favoritos. Elegí Pinia en lugar de Vuex porque necesita menos boilerplate y es más directo: importás/exportás lo que necesitás y con una action modificás el state sin mutaciones innecesarias.

Apliqué un guard a la ruta “/pokemons” para cubrir el caso de recargar el navegador: si falta data, dispara el fetch y deja pasar mostrando el loading (sin redirecciones). Además usé Lazy Loading en rutas y KeepAlive para cachear las vistas de tabs.

Vue 3: directivas claras, menos boilerplate que Vue 2, y Router/KeepAlive/Lazy Loading listos.
Bootstrap 5: utilidades y variables CSS que permiten avanzar rápido sin perder buenas prácticas.
Fuse.js: fuzzy search para mejorar el filtrado cuando no hay paginación.
TypeScript: tipado que evita errores comunes y mejora autocompletado/compilación.
Vite: proyecto liviano, arranque rápido y tooling moderno (Vitest para tests).

## Tecnologi­as utilizadas

- Vue 3, Vite, TypeScript
- Pinia, Vue Router
- Bootstrap 5, CSS
- Fuse.js
- Vitest, @vue/test-utils, Testing Library

## Instalacion y ejecucion

- Clonar el repositorio
- git clone https://github.com/LSO182/pokedex-app.git
- cd pokedex-app
- Instalar dependencias
- npm install
  Ejecutar en desarrollo
- npm run dev
- Correr tests (opcional)
- npm run test

## Requisitos

Node.js v20 (se recomienda usar nvm para gestionar versiones)

Para cambiar a la version correcta:

nvm use 20
