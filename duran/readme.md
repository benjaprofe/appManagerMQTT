# 📱 Sistema de Seguridad de Celular

Aplicación de seguridad y monitoreo en tiempo real para dispositivos móviles, utilizando MQTT para comunicación IoT.

## ✨ Características Principales

### 📍 Geolocalización en Tiempo Real
- Rastreo continuo de la ubicación del dispositivo
- Visualización en mapa interactivo con Leaflet.js
- Actualización automática de coordenadas GPS

### 🏃 Detección de Movimiento
- Sensor de movimiento del dispositivo
- Alertas cuando se detecta actividad
- Monitoreo continuo de estado

### 🚨 Botón de Pánico
- Activación de alerta de emergencia
- Envío automático de ubicación actual
- Notificaciones visuales y sonoras en el dashboard

### 📊 Monitoreo de Actividad
- Verifica si el dispositivo está en movimiento
- Estado de conexión en tiempo real
- Indicadores visuales claros

### 🗺️ Dashboard de Monitoreo
- **Mapa en vivo** de la ubicación del celular
- **Alertas en tiempo real** de la ubicación
- **Historial simple** de ubicaciones anteriores
- **Estado de conexión** (conectado/desconectado)

## 📁 Estructura del Proyecto

```
duran/
├── control.html          # Panel de control
├── dashboard.html        # Dashboard de monitoreo con mapa
├── INSTRUCCIONES.md      # Documentación detallada
└── readme.md            # Este archivo
```

## 🚀 Inicio Rápido

1. **Abrir Panel de Control**
   ```
   Abre control.html en tu navegador
   ```

2. **Abrir Dashboard de Monitoreo**
   ```
   Abre dashboard.html en tu navegador
   ```

3. **Activar Funciones**
   - Activar geolocalización
   - Activar detección de movimiento
   - Simular ubicaciones de prueba

## 📡 Topics MQTT

### Control
- `seguridad/celular/geolocalizacion/set` - Activar/desactivar GPS
- `seguridad/celular/movimiento/set` - Activar/desactivar detección
- `seguridad/celular/ubicacion` - Enviar coordenadas
- `seguridad/celular/panico` - Botón de pánico
- `seguridad/celular/dispositivo/estado` - Estado de conexión

### Estado
- `seguridad/celular/geolocalizacion/state` - Estado del GPS
- `seguridad/celular/movimiento/estado` - Movimiento detectado
- `seguridad/celular/monitoreo/state` - Estado del monitoreo

## 🎯 Casos de Uso

1. **Seguridad Personal**: Monitoreo de ubicación en tiempo real
2. **Rastreo de Dispositivos**: Localización de celulares perdidos
3. **Emergencias**: Activación rápida de alerta con ubicación
4. **Monitoreo Parental**: Seguimiento de ubicación de familiares

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript
- **Mapas**: Leaflet.js + OpenStreetMap
- **Comunicación**: MQTT.js (WebSocket)
- **Broker**: HiveMQ Cloud

## 📚 Documentación

Para instrucciones detalladas, consulta [INSTRUCCIONES.md](INSTRUCCIONES.md)

## 🔒 Seguridad

⚠️ **Importante**: Este sistema transmite ubicaciones en tiempo real. Úsalo solo con el consentimiento apropiado y respetando la privacidad.

## 📄 Licencia

Proyecto educativo y demostrativo.