# 🏗️ Sistema de Control IoT con MQTT

Sistema modular de control y monitoreo en tiempo real para dispositivos IoT, utilizando el protocolo MQTT para comunicación entre componentes. Incluye proyectos para **Hogar Inteligente** y **Metro/Tren Inteligente**.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Configuración Inicial](#configuración-inicial)
- [Proyectos Incluidos](#proyectos-incluidos)
- [Arquitectura MQTT](#arquitectura-mqtt)
- [Uso General](#uso-general)

---

## 📖 Descripción General

Este proyecto implementa un sistema de control y monitoreo IoT basado en MQTT, donde múltiples aplicaciones web se comunican en tiempo real para controlar y monitorear dispositivos. Cada proyecto (Hogar o Tren) consta de:

- **Panel de Control**: Interfaz para enviar comandos a los dispositivos
- **Dashboard de Monitoreo**: Visualización en tiempo real del estado de los sensores y dispositivos
- **Simulador**: Aplicación que simula el comportamiento de los dispositivos físicos

---

## 📁 Estructura del Proyecto

```
Doc/
├── env/
│   └── credential.js          # Configuración centralizada de clientes MQTT
├── hogar/
│   ├── control.html          # Panel de control del hogar
│   ├── dashboard.html        # Dashboard de monitoreo del hogar
│   └── INSTRUCCIONES.md      # Instrucciones detalladas del proyecto hogar
├── tren/
│   ├── control.html          # Panel de control del metro
│   ├── dashboard.html        # Dashboard de monitoreo del metro
│   └── INSTRUCCIONES.md      # Instrucciones detalladas del proyecto tren
└── README.md                 # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5/CSS3/JavaScript**: Frontend de las aplicaciones
- **MQTT.js**: Cliente MQTT para navegadores
- **HiveMQ Cloud**: Broker MQTT (puede cambiarse por cualquier broker MQTT)
- **WebSockets**: Protocolo de comunicación en tiempo real

---

## ⚙️ Configuración Inicial

### 1. Configurar Credenciales MQTT

Edita el archivo `env/credential.js` para configurar tus clientes MQTT:

```javascript
const mqttConfig = {
  client_hogar: {
    url: "wss://tu-servidor-mqtt.com:8884/mqtt",
    username: "tu_usuario",
    password: "tu_contraseña",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },
  client_tren: {
    url: "wss://tu-servidor-mqtt.com:8884/mqtt",
    username: "tu_usuario",
    password: "tu_contraseña",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  }
};
```

### 2. Agregar Nuevos Clientes

Para agregar un nuevo cliente MQTT, simplemente añádelo al objeto `mqttConfig`:

```javascript
client_nuevo: {
  url: "wss://servidor-mqtt.com:8884/mqtt",
  username: "usuario",
  password: "contraseña",
  options: {
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
  }
}
```

Luego úsalo en tus aplicaciones:

```javascript
const client = createMqttClient('client_nuevo');
```

---

## 🏠 Proyectos Incluidos

### 1. Sistema de Hogar Inteligente

Sistema completo para controlar y monitorear dispositivos de un hogar inteligente.

**Características:**
- Control de luces (Living, Cocina, Dormitorio)
- Control de puertas y ventanas
- Sistema de alarma
- Monitoreo de temperatura
- Sensores de humo, movimiento y gas
- Control de TV y refrigerador

**Archivos:**
- `hogar/control.html` - Panel de control
- `hogar/dashboard.html` - Dashboard de monitoreo
- `hogar/INSTRUCCIONES.md` - Documentación detallada

**Topics MQTT principales:**
- `hogar/living/luz/state` - Estado de la luz del living
- `hogar/cocina/luz/state` - Estado de la luz de la cocina
- `hogar/puerta/principal/state` - Estado de la puerta principal
- `hogar/alarma/state` - Estado de la alarma
- `hogar/clima/temperatura` - Temperatura ambiente
- `hogar/sensor/humo` - Sensor de humo
- `hogar/sensor/movimiento` - Sensor de movimiento
- `hogar/sensor/gas` - Sensor de gas

### 2. Sistema de Metro/Tren Inteligente

Sistema para controlar y monitorear un sistema de transporte público (metro/tren).

**Características:**
- Control de velocidad del tren
- Control de puertas del tren
- Freno de emergencia
- Monitoreo de capacidad de pasajeros
- Control de estaciones (luces, alarmas)
- Sistema de evacuación
- Modos de operación (Hora Punta, Baja Demanda, Normal)

**Archivos:**
- `tren/control.html` - Panel de control
- `tren/dashboard.html` - Dashboard de monitoreo
- `tren/INSTRUCCIONES.md` - Documentación detallada

**Topics MQTT principales:**
- `metro/tren1/velocidad` - Velocidad del tren
- `metro/tren1/ubicacion` - Ubicación del tren
- `metro/tren1/puertas` - Estado de las puertas
- `metro/tren1/capacidad` - Capacidad de pasajeros
- `metro/tren1/freno_emergencia` - Estado del freno de emergencia
- `metro/estacion1/luces` - Luces de la estación
- `metro/estacion1/alarma` - Alarma de la estación
- `metro/sistema/modo` - Modo de operación del sistema

### 3. Sistema de Seguridad de Celular

Sistema de monitoreo y seguridad en tiempo real para dispositivos móviles.

**Características:**
- Geolocalización en tiempo real
- Detección de movimiento
- Botón de pánico
- Monitoreo de actividad
- Mapa en vivo de ubicación
- Historial de ubicaciones
- Estado de conexión del dispositivo

**Archivos:**
- `duran/control.html` - Panel de control
- `duran/dashboard.html` - Dashboard de monitoreo con mapa
- `duran/INSTRUCCIONES.md` - Documentación detallada

**Topics MQTT principales:**
- `seguridad/celular/geolocalizacion/set` - Control de GPS
- `seguridad/celular/ubicacion` - Coordenadas del dispositivo
- `seguridad/celular/movimiento/set` - Control de detección de movimiento
- `seguridad/celular/movimiento/estado` - Estado de movimiento
- `seguridad/celular/panico` - Botón de pánico
- `seguridad/celular/dispositivo/estado` - Estado de conexión
- `seguridad/celular/monitoreo/set` - Control de monitoreo

---

## 🔌 Arquitectura MQTT

### Conceptos Clave

- **Broker MQTT**: Servidor que gestiona la comunicación entre clientes
- **Topic**: Canal de comunicación (ej: `hogar/living/luz/state`)
- **Publisher**: Cliente que envía mensajes a un topic
- **Subscriber**: Cliente que recibe mensajes de un topic
- **QoS (Quality of Service)**: Nivel de garantía de entrega (0, 1, 2)

### Flujo de Comunicación

```
┌─────────────────┐         ┌──────────┐         ┌─────────────────┐
│  Panel Control  │────────▶│  Broker  │────────▶│    Dashboard     │
│   (Publisher)   │  MQTT   │   MQTT   │  MQTT   │   (Subscriber)   │
└─────────────────┘         └──────────┘         └─────────────────┘
                                      │
                                      │
                                      ▼
                              ┌─────────────────┐
                              │   Simulador     │
                              │ (Subscriber/    │
                              │  Publisher)     │
                              └─────────────────┘
```

### Convención de Topics

- **Estado**: `proyecto/dispositivo/estado` (ej: `hogar/living/luz/state`)
- **Comando**: `proyecto/dispositivo/set` (ej: `hogar/living/luz/set`)
- **Sensores**: `proyecto/sensor/tipo` (ej: `hogar/sensor/humo`)

---

## 🚀 Uso General

### Para cada proyecto (Hogar o Tren):

1. **Abrir el Dashboard de Monitoreo**
   - Abre `dashboard.html` en tu navegador
   - Espera a que se conecte al broker MQTT
   - Verás el estado en tiempo real de todos los dispositivos

2. **Abrir el Panel de Control**
   - Abre `control.html` en tu navegador
   - Espera a que se conecte al broker MQTT
   - Usa los controles para enviar comandos a los dispositivos

3. **Ejecutar el Simulador** (si está disponible)
   - Ve a la carpeta del proyecto (`hogar/` o `tren/`)
   - Instala dependencias: `npm install`
   - Ejecuta: `npm start` o `node simulador.js`
   - El simulador responderá a los comandos y enviará actualizaciones de estado

### Características Comunes

- **Conexión Automática**: Los clientes se conectan automáticamente al iniciar
- **Reconexión Automática**: Si se pierde la conexión, se intenta reconectar automáticamente
- **Notificaciones Visuales**: Feedback inmediato de todas las acciones
- **Logs en Tiempo Real**: Registro de todos los eventos y mensajes MQTT
- **Interfaz Responsive**: Funciona en diferentes tamaños de pantalla

---

## 📝 Notas Importantes

1. **Seguridad**: Las credenciales están en `env/credential.js`. No subas este archivo a repositorios públicos.

2. **Broker MQTT**: Puedes usar cualquier broker MQTT compatible (HiveMQ, Mosquitto, AWS IoT, etc.). Solo necesitas actualizar la URL en `credential.js`.

3. **WebSockets**: Los clientes usan WebSockets (WSS) para conectarse al broker, lo que permite comunicación desde navegadores web.

4. **QoS**: Los mensajes importantes usan QoS 1 para garantizar la entrega al menos una vez.

---

## 🔧 Solución de Problemas

### No se conecta al broker MQTT
- Verifica las credenciales en `env/credential.js`
- Asegúrate de que la URL del broker sea correcta
- Verifica que el broker acepte conexiones WebSocket

### No se reciben mensajes
- Verifica que el simulador esté ejecutándose
- Revisa la consola del navegador para ver errores
- Verifica que los topics coincidan entre publicador y suscriptor

### Errores de CORS
- Asegúrate de que el broker MQTT permita conexiones desde tu dominio
- Algunos brokers requieren configuración específica para WebSockets

---

## 📚 Documentación Adicional

- [Instrucciones del Proyecto Hogar](hogar/INSTRUCCIONES.md)
- [Instrucciones del Proyecto Tren](tren/INSTRUCCIONES.md)
- [Instrucciones del Proyecto Seguridad de Celular](duran/INSTRUCCIONES.md)

---

## 👨‍💻 Autor

Sistema desarrollado para control y monitoreo IoT mediante MQTT.

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

