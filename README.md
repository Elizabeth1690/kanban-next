# Kanba con Next.js, TypeScript y Tailwind CSS

## 📌 Descripción

Aplicación web**Kanba**que permite crear tareas, asignarle a los usuarios sus tareas correspondientes **.

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** (16.x+)
- **npm, yarn o pnpm** (gestor de paquetes)

---

## 🚀 Instalación rápida

```bash
# Clonar el repositorio
git clone <url-repositorio>
cd kanban-next

# Instalar todas las dependencias del proyecto
npm install
```

---

## 📦 Dependencias principales

El proyecto utiliza las siguientes tecnologías principales:

- **next**, **react**, **react-dom**, **typescript**
- **tailwindcss**, **postcss**, **autoprefixer**
- **json-server**

🌟 **Todas se instalarán automáticamente con** `npm install`.

---

## 🎨 Configuración esencial

### Tailwind CSS

El proyecto ya tiene **Tailwind CSS** configurado. Si necesitas reinicializarlo, usa:

```bash
npx tailwindcss init -p
```

Asegúrate de que `tailwind.config.js` incluya:

```js
darkMode: "class";
```


## ▶️ Ejecución

```bash
# Modo desarrollo frontend
npm run dev

# Modo desarrollo backend
npm run backend

# Construcción para producción
npm run build
npm start
```

---

## ✅ Buenas prácticas implementadas

- **Componentes:** Separación modular, código tipado con TypeScript
- **Cliente/Servidor:** Uso correcto de `"use client"` donde es necesario
- **Estado:** Context API
- **UI/UX:** diseño responsivo

---
  🌐 **La aplicación estará disponible en** `http://localhost:3000` para el front
    **La aplicación estará disponible en** `http://localhost:3001` para el backend
