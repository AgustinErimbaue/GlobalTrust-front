# 🏦 GlobalTrust - Banking Frontend Application

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

Una aplicación bancaria moderna y elegante construida con React, Redux Toolkit y un diseño glassmorphism que ofrece una experiencia de usuario premium y confiable.

## 🌟 Características Principales

### ✨ Autenticación y Seguridad
- 🔐 Sistema de login/registro seguro
- 🔑 Gestión de tokens JWT
- 👤 Perfiles de usuario personalizados
- 🚪 Logout seguro con limpieza de sesión

### 💳 Gestión Financiera
- 💰 Visualización de balance de cuenta
- 📊 Dashboard de transacciones
- 💳 Gestión de tarjetas de crédito
- 🏠 Solicitud y gestión de préstamos
- 📈 Historial de movimientos

### 🎨 Diseño Moderno
- ✨ Interfaz glassmorphism premium
- 📱 Diseño completamente responsive
- 🌙 Colores corporativos elegantes
- ⚡ Animaciones fluidas y transiciones
- 🎯 UX/UI optimizada para banking

### 🔧 Tecnologías Avanzadas
- ⚡ Hot Module Replacement (HMR)
- 🔄 Estado global con Redux Toolkit
- 🌐 Navegación con React Router
- 📡 Peticiones HTTP con Axios
- 🎨 CSS modular y organizado

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:8080`

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/GlobalTrust-front.git
cd GlobalTrust-front/Globaltrust
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_API_URL=http://localhost:8080
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   └── store.js                 # Configuración Redux Store
├── components/                  # Componentes React
│   ├── Account/                 # Gestión de cuentas
│   ├── Card/                    # Tarjetas de crédito
│   ├── Footer/                  # Pie de página
│   ├── Header/                  # Navegación principal
│   ├── Home/                    # Página principal
│   ├── Loan/                    # Gestión de préstamos
│   ├── LoanForm/               # Formulario de préstamos
│   ├── Login/                   # Autenticación
│   ├── Logout/                  # Cierre de sesión
│   ├── Profile/                 # Perfil de usuario
│   └── Register/                # Registro de usuarios
├── features/                    # Redux slices
│   ├── account/                 # Estado de cuentas
│   ├── auth/                    # Estado de autenticación
│   ├── card/                    # Estado de tarjetas
│   └── loan/                    # Estado de préstamos
└── assets/                      # Recursos estáticos
```

## 🎯 Funcionalidades Principales

### 🏠 Dashboard Principal
- Vista general del balance
- Accesos rápidos a servicios
- Información de tarjetas y préstamos
- Navegación intuitiva

### 👤 Gestión de Usuario
- Registro de nuevos usuarios
- Login seguro con validación
- Actualización de perfil
- Gestión de información personal

### 💳 Tarjetas de Crédito
- Visualización de tarjetas activas
- Solicitud de nuevas tarjetas
- Gestión de límites de crédito
- Historial de transacciones

### 🏠 Sistema de Préstamos
- Solicitud de préstamos
- Cálculo de cuotas
- Seguimiento de estado
- Historial de préstamos

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción

# Linting
npm run lint         # Ejecuta ESLint

# Preview
npm run preview      # Preview de build de producción
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: `#0038a8` (Azul corporativo)
- **Secundario**: `#a0c4ff` (Azul claro)
- **Gradientes**: Glassmorphism con transparencias
- **Fondos**: Efectos de desenfoque y transparencia

### Responsive Design
- 📱 **Mobile**: < 768px
- 📊 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: > 1024px

### Accesibilidad
- ♿ ARIA labels y roles
- ⌨️ Navegación por teclado
- 🎯 Áreas de click táctiles (48px mínimo)
- 🔍 Focus visible para elementos interactivos

## 🔧 Configuración Técnica

### Redux Store
- **auth**: Estado de autenticación
- **account**: Información de cuentas
- **card**: Gestión de tarjetas
- **loan**: Préstamos del usuario

### API Endpoints
```
POST /users/login     # Autenticación
POST /users/register  # Registro
GET  /users/user/:id  # Obtener usuario
PUT  /users/update    # Actualizar perfil
DELETE /users/logout  # Cerrar sesión
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Variables de Entorno Producción
```env
VITE_API_URL=https://tu-api-backend.com
VITE_APP_NAME=GlobalTrust
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Frontend**: React + Redux Toolkit
- **Diseño**: Glassmorphism UI/UX
- **Backend**: Node.js + Express (repositorio separado)

## 🔗 Enlaces Útiles

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

<div align="center">

**🏦 GlobalTrust - Tu Banco de Confianza Digital**

*Construido con ❤️ y las mejores tecnologías modernas*

</div>
