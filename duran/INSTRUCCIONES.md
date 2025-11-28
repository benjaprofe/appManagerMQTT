# 📱 Sistema de Seguridad de Celular - Instrucciones de Uso

Este sistema consta de **2 aplicaciones web independientes** que se comunican mediante MQTT para monitorear y controlar la seguridad de un dispositivo móvil en tiempo real.

## 📦 Aplicaciones

1. **APP A - Panel de Control** (`control.html`)
2. **APP B - Dashboard de Monitoreo** (`dashboard.html`)

---

## 🚀 Características Principales

### 📍 Geolocalización en Tiempo Real
- Rastreo continuo de la ubicación del dispositivo
- Visualización en mapa interactivo
- Actualización automática de coordenadas

### 🏃 Detección de Movimiento
- Monitoreo de actividad del dispositivo
- Alertas cuando se detecta movimiento
- Estado en tiempo real

### 🚨 Botón de Pánico
- Activación de alerta de emergencia
- Envío automático de ubicación actual
- Notificaciones visuales y sonoras

### 📊 Monitoreo de Actividad
- Verifica si el dispositivo está en movimiento
- Estado de conexión del dispositivo
- Historial de actividades

### 🗺️ Mapa en Vivo
- Visualización de ubicación actual
- Marcadores de historial
- Zoom y navegación interactiva

### 📜 Historial Simple
- Registro de ubicaciones anteriores
- Timestamps de cada ubicación
- Opción de limpiar historial

### 📱 Estado de Conexión
- Monitoreo del estado del dispositivo (conectado/desconectado)
- Indicadores visuales claros
- Alertas de desconexión

---

## 🎮 Uso de las Aplicaciones

### Panel de Control (`control.html`)

1. **Abrir el Panel**
   - Abre `control.html` en tu navegador
   - Espera a que se conecte (verás "✅ Conectado")

2. **Funciones Disponibles:**

   **🚨 Botón de Pánico**
   - Haz clic en "ACTIVAR PÁNICO" para enviar una alerta de emergencia
   - Se activará automáticamente la geolocalización
   - El dashboard mostrará una alerta visual y sonora

   **📍 Geolocalización**
   - Activar/Desactivar rastreo en tiempo real
   - Cuando está activa, el dispositivo envía su ubicación

   **🏃 Detección de Movimiento**
   - Activar/Desactivar el sensor de movimiento
   - Detecta cuando el dispositivo se está moviendo

   **📊 Monitoreo de Actividad**
   - Activar/Desactivar el monitoreo general
   - Verifica el estado de actividad del dispositivo

   **🗺️ Simular Ubicación**
   - Ingresa latitud y longitud manualmente
   - Útil para pruebas y simulaciones
   - Ejemplo: Santiago, Chile (-33.4489, -70.6693)

   **🎮 Eventos de Prueba**
   - Simular movimiento detectado
   - Cambiar estado del dispositivo (conectado/desconectado)
   - Probar diferentes escenarios

   **📜 Gestión de Historial**
   - Limpiar historial de ubicaciones
   - Solicitar historial completo

### Dashboard de Monitoreo (`dashboard.html`)

1. **Abrir el Dashboard**
   - Abre `dashboard.html` en tu navegador
   - Espera a que se conecte (verás "✅ Conectado")

2. **Elementos del Dashboard:**

   **🗺️ Mapa en Tiempo Real**
   - Muestra la ubicación actual del dispositivo
   - Marcadores azules para ubicaciones históricas
   - Marcador rojo para ubicación actual
   - Zoom y navegación interactiva

   **📱 Estado del Dispositivo**
   - Conectado (verde) / Desconectado (rojo)
   - Actualización en tiempo real

   **📍 Geolocalización**
   - Estado: Activa/Inactiva
   - Coordenadas actuales (latitud/longitud)
   - Última actualización

   **🏃 Detección de Movimiento**
   - Estado del sensor: Activa/Inactiva
   - Estado de movimiento: Detectado/Sin movimiento

   **📊 Monitoreo de Actividad**
   - Estado: Activo/Inactivo

   **🚨 Botón de Pánico**
   - Estado: Normal/Pánico Activado
   - Banner de alerta cuando se activa
   - Sonido de alarma

   **📜 Historial de Ubicaciones**
   - Lista de las últimas 20 ubicaciones
   - Timestamp de cada ubicación
   - Coordenadas exactas

   **📝 Logs en Tiempo Real**
   - Registro de todos los eventos
   - Mensajes MQTT recibidos
   - Errores y advertencias

---

## 🔄 Flujo de Comunicación

### Ejemplo 1: Activar Geolocalización

1. **Panel de Control** → Publica: `seguridad/celular/geolocalizacion/set = "on"`
2. **Dashboard** → Recibe el comando y actualiza el estado
3. **Dispositivo** (simulado) → Publica: `seguridad/celular/geolocalizacion/state = "on"`
4. **Dashboard** → Muestra "ACTIVA" en verde

### Ejemplo 2: Enviar Ubicación

1. **Panel de Control** → Ingresa lat/lng y envía
2. **Panel de Control** → Publica: `seguridad/celular/ubicacion = {"lat": -33.4489, "lng": -70.6693}`
3. **Dashboard** → Recibe la ubicación
4. **Dashboard** → Actualiza el mapa y el historial

### Ejemplo 3: Activar Pánico

1. **Panel de Control** → Clic en "ACTIVAR PÁNICO"
2. **Panel de Control** → Publica: `seguridad/celular/panico = "activado"`
3. **Panel de Control** → Publica: `seguridad/celular/geolocalizacion/set = "on"`
4. **Dashboard** → Muestra banner de alerta rojo
5. **Dashboard** → Reproduce sonido de alarma
6. **Dashboard** → Registra evento en logs

---

## 📡 Topics MQTT

### Topics de Control (Panel → Sistema)

- `seguridad/celular/geolocalizacion/set` → "on" / "off"
- `seguridad/celular/movimiento/set` → "on" / "off"
- `seguridad/celular/monitoreo/set` → "on" / "off"
- `seguridad/celular/ubicacion` → JSON: `{"lat": number, "lng": number}`
- `seguridad/celular/panico` → "activado" / "desactivado"
- `seguridad/celular/dispositivo/estado` → "conectado" / "desconectado"
- `seguridad/celular/historial/clear` → "true"
- `seguridad/celular/historial/request` → "true"

### Topics de Estado (Sistema → Dashboard)

- `seguridad/celular/geolocalizacion/state` → "on" / "off"
- `seguridad/celular/movimiento/state` → "on" / "off"
- `seguridad/celular/movimiento/estado` → "detectado" / "no_detectado"
- `seguridad/celular/monitoreo/state` → "on" / "off"
- `seguridad/celular/ubicacion` → JSON con coordenadas
- `seguridad/celular/panico` → "activado" / "desactivado"
- `seguridad/celular/dispositivo/estado` → "conectado" / "desconectado"

---

## 🎯 Casos de Uso

### Caso 1: Monitoreo Normal
1. Activar geolocalización desde el panel
2. Activar detección de movimiento
3. Activar monitoreo de actividad
4. Observar en el dashboard la ubicación en tiempo real

### Caso 2: Emergencia
1. Presionar botón de pánico
2. El dashboard muestra alerta inmediata
3. Se activa automáticamente la geolocalización
4. Se registra la ubicación en el historial

### Caso 3: Rastreo de Ruta
1. Activar geolocalización
2. Simular diferentes ubicaciones desde el panel
3. Ver el recorrido en el mapa del dashboard
4. Revisar el historial de ubicaciones

### Caso 4: Detección de Movimiento
1. Activar detección de movimiento
2. Simular movimiento desde el panel
3. Dashboard muestra "MOVIMIENTO DETECTADO"
4. Se registra el evento en los logs

---

## 🔧 Configuración

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a Internet (para MQTT y mapas)
- Acceso al broker MQTT configurado

### Configuración MQTT
Las credenciales MQTT están configuradas en `../env/credential.js`:
- Cliente: `client_duran`
- Broker: HiveMQ Cloud
- Protocolo: WebSocket Secure (WSS)

---

## 🐛 Solución de Problemas

### El panel no se conecta
- Verifica la conexión a Internet
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que las credenciales MQTT sean correctas

### El mapa no se muestra
- Verifica que tienes conexión a Internet
- Asegúrate de que Leaflet.js se cargó correctamente
- Revisa la consola para errores de JavaScript

### No se reciben ubicaciones
- Verifica que la geolocalización esté activada
- Asegúrate de enviar ubicaciones desde el panel
- Revisa los logs del dashboard para ver mensajes MQTT

### El sonido de alarma no funciona
- Asegúrate de que el archivo de audio existe en `../fx/alarm-26718.mp3`
- Verifica que el navegador permite reproducción de audio
- Algunos navegadores requieren interacción del usuario primero

---

## 📝 Notas Importantes

1. **Privacidad**: Este sistema transmite ubicaciones en tiempo real. Úsalo solo con consentimiento.

2. **Seguridad**: Las credenciales MQTT están en texto plano. En producción, usa autenticación más segura.

3. **Precisión**: La precisión de la geolocalización depende del dispositivo y la señal GPS.

4. **Historial**: El historial se almacena solo en el navegador. Se pierde al recargar la página.

5. **Mapa**: Requiere conexión a Internet para cargar los tiles de OpenStreetMap.

---

## 🎉 ¡Listo para usar!

1. Abre el Panel de Control: `control.html`
2. Abre el Dashboard: `dashboard.html`
3. Activa la geolocalización
4. Envía ubicaciones de prueba
5. ¡Observa el monitoreo en tiempo real!

---

## 📚 Recursos Adicionales

- [Documentación MQTT.js](https://github.com/mqttjs/MQTT.js)
- [Leaflet.js - Mapas interactivos](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)

---

## 👨‍💻 Desarrollo

Sistema desarrollado para monitoreo y seguridad de dispositivos móviles mediante MQTT e IoT.

**Características técnicas:**
- MQTT para comunicación en tiempo real
- Leaflet.js para mapas interactivos
- HTML5/CSS3/JavaScript vanilla
- Responsive design
- WebSocket Secure (WSS)

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.
