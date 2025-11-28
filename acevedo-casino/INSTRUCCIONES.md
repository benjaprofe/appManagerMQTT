# Sistema de Monitoreo Acevedo Casino

## 📋 Descripción General

Sistema completo de monitoreo y control para casino en tiempo real utilizando protocolo MQTT. Permite supervisar todas las operaciones del casino desde un dashboard centralizado y ejecutar acciones mediante un panel de control.

## 🎯 Características Principales

### 1. **Monitoreo de Juegos**
- **Mesas de Juego (30 mesas)**
  - Estado en tiempo real (activa/cerrada)
  - Balance individual por mesa
  - Detección de problemas y robos
  - Sistema de alertas visuales
  
- **Tragamonedas (30 máquinas)**
  - Estado operativo
  - Detección automática de jackpots
  - Monitoreo de funcionamiento

### 2. **Control de Seguridad**
- Control de accesos (entrada/salida)
- Registro de accesos VIP
- Sistema de alertas de seguridad
- Alarma general de emergencia
- Monitoreo de actividad sospechosa

### 3. **Gestión Financiera**
- Balance general del casino
- Balance individual por mesa
- Registro de movimientos de caja
- Cierres de caja automatizados
- Conteo de jugadores activos

### 4. **Monitoreo Ambiental**
- Control de temperatura por zonas
- Medición de humedad
- Control del sistema de aire acondicionado

## 🏗️ Arquitectura del Sistema

### Componentes

1. **Dashboard (dashboard.html)**
   - Visualización en tiempo real
   - Mapa interactivo del casino
   - Panel de alertas
   - Logs de eventos
   - Indicadores ambientales

2. **Panel de Control (control.html)**
   - Gestión de mesas y tragamonedas
   - Control financiero
   - Administración de seguridad
   - Control ambiental

3. **Broker MQTT**
   - HiveMQ Cloud
   - Comunicación en tiempo real
   - QoS 1 para garantizar entrega

## 📡 Topics MQTT

### Mesas
```
casino/acevedo/mesa/{id}/estado       # activa | cerrado | vip
casino/acevedo/mesa/{id}/balance      # Número (balance en $)
casino/acevedo/mesa/{id}/alerta       # robo | problema
casino/acevedo/mesa/{id}/cierre       # iniciado | completado
```

### Tragamonedas
```
casino/acevedo/slot/{id}/estado       # activa | cerrado
casino/acevedo/slot/{id}/jackpot      # Número (monto del jackpot)
casino/acevedo/slot/{id}/reset        # true
```

### Finanzas
```
casino/acevedo/finanzas/balance       # Número (balance total)
casino/acevedo/finanzas/movimiento    # JSON: {tipo, monto}
casino/acevedo/finanzas/caja          # Estado de caja
casino/acevedo/jugadores/count        # Número de jugadores
```

### Seguridad
```
casino/acevedo/seguridad/alerta       # JSON: {tipo, ubicacion} | EMERGENCIA_GENERAL
casino/acevedo/seguridad/acceso       # JSON: {tipo, descripcion}
```

### Ambiente
```
casino/acevedo/ambiente/temperatura   # Número (°C)
casino/acevedo/ambiente/humedad       # Número (%)
casino/acevedo/ambiente/ac            # on | off
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge)
- Conexión a Internet (para MQTT y CDN)
- Archivo `credential.js` configurado

### Configuración

1. **Verificar credenciales MQTT**
   - El archivo `../env/credential.js` debe contener la configuración `client_acevedo`
   - Ya está configurado con HiveMQ Cloud

2. **Abrir el Dashboard**
   ```
   Abrir: acevedo-casino/dashboard.html
   ```
   - Visualiza el estado del casino en tiempo real
   - Recibe todas las actualizaciones automáticamente

3. **Abrir el Panel de Control**
   ```
   Abrir: acevedo-casino/control.html
   ```
   - Ejecuta acciones sobre el casino
   - Controla mesas, slots, finanzas, seguridad y ambiente

### Flujo de Trabajo Típico

1. **Apertura del Casino**
   - Abrir dashboard para monitoreo
   - Desde control panel: activar mesas necesarias
   - Activar tragamonedas
   - Verificar temperatura y humedad

2. **Durante Operación**
   - Dashboard muestra estado en tiempo real
   - Alertas automáticas ante problemas
   - Actualización de balances
   - Detección de jackpots

3. **Cierre de Operaciones**
   - Iniciar cierres de caja desde control panel
   - Cerrar mesas una por una
   - Desactivar tragamonedas
   - Revisar balance final

## 🎨 Características de la Interfaz

### Dashboard
- **Diseño Dark Mode Premium** con tonos dorado/negro
- **Glassmorphism** para paneles
- **Mapa Interactivo** con 60 elementos (30 mesas + 30 slots)
- **Alertas Visuales** con animaciones
- **Banner de Jackpot** emergente
- **Logs en Tiempo Real**

### Control Panel
- **Interfaz por Pestañas** organizada por categoría
- **Botones de Acción** claros y diferenciados por color
- **Confirmaciones** para acciones críticas
- **Notificaciones** de éxito/error
- **Sección de Emergencia** destacada

## 📊 Casos de Uso

### 1. Reportar Problema en Mesa
**Control Panel:**
1. Ir a pestaña "Mesas"
2. Seleccionar número de mesa
3. Click en "Reportar Problema"
4. Confirmar

**Dashboard:**
- La mesa se marca con alerta roja pulsante
- Aparece en panel de alertas
- Se registra en logs

### 2. Jackpot en Tragamonedas
**Control Panel:**
1. Ir a pestaña "Tragamonedas"
2. Ingresar número de slot
3. Ingresar monto del jackpot
4. Click en "Activar Jackpot"

**Dashboard:**
- Banner dorado aparece en pantalla
- Se registra en logs
- Actualiza estadísticas

### 3. Emergencia General
**Control Panel:**
1. Ir a pestaña "Seguridad"
2. Click en "ACTIVAR ALARMA GENERAL"
3. Confirmar acción

**Dashboard:**
- Alerta crítica en panel
- Registro en logs con máxima prioridad

### 4. Cierre de Caja
**Control Panel:**
1. Ir a pestaña "Mesas"
2. Seleccionar mesa para cierre
3. Click en "Iniciar Cierre de Caja"

**Dashboard:**
- Mesa cambia a estado "en cierre"
- Se registra el evento

## 🔧 Personalización

### Agregar más Mesas/Slots
Editar en `dashboard.html` líneas 456-467:
```javascript
// Cambiar el límite de 30 a la cantidad deseada
for (let i = 1; i <= 50; i++) { // Ejemplo: 50 mesas
    // ...
}
```

### Modificar Colores
Editar variables CSS en ambos archivos:
```css
:root {
    --primary-gold: #d4af37;  /* Color dorado principal */
    --accent-red: #ff4444;    /* Color de alertas */
    --accent-green: #00c851;  /* Color de éxito */
}
```

### Agregar Nuevos Sensores
1. Crear topic MQTT: `casino/acevedo/nuevo/sensor`
2. Suscribirse en dashboard
3. Agregar lógica de actualización en `updateDashboard()`
4. Crear control en control panel

## 🔒 Seguridad

- **QoS 1**: Garantiza entrega de mensajes críticos
- **Confirmaciones**: Acciones críticas requieren confirmación
- **Logs Completos**: Registro de todas las acciones
- **Conexión Segura**: WSS (WebSocket Secure)

## 📝 Notas Importantes

1. **Ambos archivos deben estar abiertos simultáneamente** para funcionamiento completo
2. **El dashboard es de solo lectura** (monitoreo)
3. **El control panel ejecuta acciones** (escritura)
4. **Los cambios son instantáneos** gracias a MQTT
5. **No requiere servidor backend** - todo funciona en el navegador

## 🐛 Troubleshooting

### No se conecta a MQTT
- Verificar conexión a Internet
- Revisar credenciales en `credential.js`
- Verificar consola del navegador (F12)

### No se actualizan los datos
- Verificar que ambos archivos estén abiertos
- Revisar suscripciones en consola
- Verificar que los topics coincidan

### Alertas no aparecen
- Verificar que el dashboard esté suscrito al topic correcto
- Revisar logs en consola

## 📞 Soporte

Para problemas o mejoras, revisar:
- Consola del navegador (F12 > Console)
- Logs en tiempo real en el dashboard
- Estado de conexión MQTT

---

**Desarrollado para Acevedo Casino**  
Sistema de Monitoreo en Tiempo Real v1.0
