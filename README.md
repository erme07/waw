# 🌐 Widget de Accesibilidad Web (WAW)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)

La accesibilidad web es fundamental para garantizar que todas las personas, independientemente de sus capacidades físicas, sensoriales, cognitivas o tecnológicas, puedan navegar y utilizar sitios web de manera equitativa. **WAW** es un widget completo que permite mejorar la accesibilidad de cualquier sitio web sin necesidad de realizar cambios complejos en el código.

## 🚀 [Demostración en Vivo](https://alexanderandrada.github.io/waw_demo/)

---

## ✨ Características

### 🎨 Ajustes Visuales

#### Tamaño y Espaciado de Texto
- **Tamaño de Texto**: 3 niveles incrementales para mejorar la legibilidad
- **Interlineado**: Ajuste del espacio entre líneas (3 niveles)
- **Espaciado de Letras**: Control del kerning para mayor claridad

#### Filtros de Color
- **Escala de Grises**: Convierte toda la página a escala de grises
- **Invertir Colores**: Invierte los colores de la página (modo alto contraste)
- **Temas**: Modo claro/oscuro para el widget

#### Elementos Visuales
- **Cursor Grande**: Aumenta el tamaño del cursor para mejor visibilidad
- **Resaltar Enlaces**: Destaca todos los enlaces con color y borde
- **Resaltar Encabezados**: Resalta títulos y encabezados (h1-h6)
- **Ocultar Imágenes**: Oculta todas las imágenes para reducir distracciones

### 📖 Ayudas de Lectura

#### Guía de Lectura
- Línea horizontal que sigue el cursor del mouse
- Configurable en:
  - **Opacidad**: 4 niveles (nula, baja, media, alta)
  - **Grosor**: Pequeño, mediano o grande
  - **Color**: 6 colores predefinidos (verde, amarillo, rojo, azul, blanco, negro)
- Controles táctiles para dispositivos móviles

#### Máscara de Lectura
- Área transparente que resalta una sección del texto
- Configurable en:
  - **Opacidad del fondo**: Baja, media o alta
  - **Altura del área**: Pequeña, mediana, grande o extra grande
- Botones +/- para ajuste rápido durante el uso
- Sigue el movimiento del cursor automáticamente

### 🔊 Accesibilidad Auditiva

#### Lector de Pantalla
- Lee en voz alta los elementos enfocados
- Funciona con:
  - Navegación por teclado (Tab)
  - Click del mouse
- Características:
  - Identifica el tipo de elemento (botón, enlace, campo, etc.)
  - Lee el contenido o etiqueta del elemento
  - Velocidad ajustable (lenta, normal, rápida)
  - Selección de voz (según idioma del sistema)
  - Botón de prueba para verificar configuración

#### Silenciador de Medios
- Silencia automáticamente todos los elementos de audio y video
- Indicador visual cuando está activo
- Desactiva temporalmente el lector de pantalla

### ♿ Características de Accesibilidad

#### Fuente para Dislexia
- Tipografía especial **OpenDyslexic**
- Diseñada específicamente para personas con dislexia
- Se aplica a todo el sitio web

#### Control de Animaciones
- Detiene todas las animaciones CSS y transiciones
- Congela GIFs animados
- Reduce movimiento para personas sensibles

### ⚙️ Gestión de Preferencias

- **Persistencia**: Todas las configuraciones se guardan en localStorage
- **Restablecimiento**: Botón para volver a configuración por defecto
- **Sincronización**: Mantiene estado entre sesiones

---

## 📦 Instalación y Uso de WAW Widget


### 1️⃣ Usando CDN (sin instalación)

```html

<link rel="stylesheet" href="https://unpkg.com/waw-widget@1.0.5/dist/style.css">
<script src="https://unpkg.com/waw-widget@1.0.5/dist/waw.iife.js"></script>

<script>

  const widget = new WAW();
  widget.run();

</script>


```

### 2️⃣ Usando NPM

````bash

npm install waw-widget

````

```html


<script type="module">

  import WAW from "waw-widget/dist/waw.js";
  import "waw-widget/dist/style.css";

  const widget = new WAW();
  widget.run()

</script>


```
