# Tienda Inteligente - Documentación Completa

## 📋 Descripción General

Sistema IoT completo para gestionar y monitorear una tienda en tiempo real utilizando protocolo MQTT. Permite controlar acceso, ambiente, iluminación, ventilación, cajas registradoras, inventario y sistemas de emergencia.

## 🎯 Características Principales

### 1. **Control de Acceso**
- **Puerta Principal**
  - Apertura/cierre remoto
  - Estado en tiempo real
  - Integración con modo nocturno

- **Modo Nocturno**
  - Seguridad adicional
  - Ahorro energético
  - Activación automática o manual

### 2. **Monitoreo Ambiental**
- **Temperatura**
  - Rango: 15-35°C
  - Actualización en tiempo real
  - Alertas de temperatura anormal

- **Humedad**
  - Rango: 0-100%
  - Monitoreo continuo
  - Control de condiciones óptimas

### 3. **Sistemas de Iluminación y Ventilación**
- Control centralizado de luces
- Gestión de ventilación/climatización
- Ahorro energético inteligente
- Estado visible en dashboard

### 4. **Cajas Registradoras (10 unidades)**
- Activación/desactivación individual
- Registro de ventas en tiempo real
- Monitoreo de cajas activas
- Estadísticas por caja
- Identificación visual de estado

### 5. **Sistema de Inventario**
- Alertas de stock bajo
- Configuración de stock mínimo por producto
- Notificaciones automáticas
- Gestión de múltiples productos
- Historial de alertas

### 6. **Sistemas de Emergencia**
- **Alarma de Pánico**
  - Activación inmediata
  - Sonido de alarma
  - Notificación visual

- **Sistema de Emergencia Completo**
  - Sonido de sirena
  - Luces intermitentes
  - Alerta máxima prioridad

## 🏗️ Arquitectura del Sistema

### Componentes

1. **Dashboard (dashboard.html)**
   - Visualización en tiempo real
   - Monitoreo de todos los sistemas
   - Panel de cajas registradoras
   - Alertas de inventario
   - Logs de eventos

2. **Panel de Control (control.html)**
   - Control de acceso y seguridad
   - Gestión de ambiente
   - Control de iluminación y ventilación
   - Administración de cajas
   - Gestión de inventario
   - Sistemas de emergencia

3. **Broker MQTT**
   - HiveMQ Cloud
   - Comunicación en tiempo real
   - QoS 1 para garantizar entrega

## 📡 Topics MQTT Detallados

### Control de Acceso
```
tienda/salgado/acceso/puerta           # abierta | cerrada
tienda/salgado/acceso/modo             # nocturno | normal
```

### Ambiente
```
tienda/salgado/ambiente/temperatura    # Número (15-35)
tienda/salgado/ambiente/humedad        # Número (0-100)
```

### Iluminación y Ventilación
```
tienda/salgado/iluminacion/estado      # encendidas | apagadas
tienda/salgado/ventilacion/estado      # encendida | apagada
```

### Alarmas
```
tienda/salgado/alarma/panico           # activada | desactivada
tienda/salgado/alarma/emergencia       # activada | desactivada
```

### Cajas Registradoras (1-10)
```
tienda/salgado/caja/1/estado           # activa | inactiva
tienda/salgado/caja/1/venta            # Número (monto de venta)
tienda/salgado/caja/2/estado           # activa | inactiva
tienda/salgado/caja/2/venta            # Número (monto de venta)
...
tienda/salgado/caja/10/estado          # activa | inactiva
tienda/salgado/caja/10/venta           # Número (monto de venta)
```

### Inventario
```
tienda/salgado/inventario/alerta       # JSON: {producto, stock, minimo}
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge)
- Conexión a Internet (para MQTT y CDN)
- Archivo `credential.js` configurado

### Configuración

1. **Verificar credenciales MQTT**
   - El archivo `../env/credential.js` debe contener la configuración `client_salgado`
   - Ya está configurado con HiveMQ Cloud

2. **Abrir el Dashboard**
   ```
   Abrir: salgado/dashboard.html
   ```
   - Visualiza el estado de la tienda en tiempo real
   - Monitorea todos los sistemas
   - Ve alertas de inventario

3. **Abrir el Panel de Control**
   ```
   Abrir: salgado/control.html
   ```
   - Ejecuta acciones sobre la tienda
   - Controla todos los sistemas
   - Gestiona cajas e inventario

### Flujo de Trabajo Típico

1. **Apertura de Tienda (Mañana)**
   - Abrir dashboard para monitoreo
   - Desde control panel:
     - Abrir puerta
     - Activar modo normal
     - Encender luces
     - Encender ventilación
     - Activar cajas necesarias

2. **Durante Operación**
   - Dashboard muestra todo en tiempo real
   - Registrar ventas en cajas activas
   - Monitorear temperatura y humedad
   - Recibir alertas de inventario
   - Responder a emergencias si es necesario

3. **Cierre de Tienda (Noche)**
   - Desactivar todas las cajas
   - Apagar luces
   - Apagar ventilación
   - Activar modo nocturno
   - Cerrar puerta

## 🎨 Características de la Interfaz

### Dashboard
- **Diseño Profesional** con tonos índigo y violeta
- **Tarjetas Informativas** para cada sistema
- **Grid de Cajas** con 10 cajas visuales
- **Lista de Inventario** con alertas destacadas
- **Logs en Tiempo Real** con códigos de color
- **Indicadores de Estado** animados

### Control Panel
- **Interfaz por Pestañas** (7 pestañas)
- **Botones de Acción** claros y diferenciados
- **Confirmaciones** para acciones críticas
- **Notificaciones** de éxito/error
- **Selector de Cajas** interactivo
- **Sección de Emergencia** destacada en rojo

## 📊 Casos de Uso Detallados

### 1. Apertura de Tienda
**Control Panel:**
1. Pestaña "Acceso" → Abrir Puerta
2. Activar Modo Normal
3. Pestaña "Iluminación" → Encender Luces
4. Pestaña "Ventilación" → Encender Ventilación
5. Pestaña "Cajas" → Activar cajas necesarias (ej: 1, 2, 3)

**Dashboard:**
- Puerta: ABIERTA (verde)
- Modo: Normal
- Luces: ENCENDIDAS (verde)
- Ventilación: ENCENDIDA (verde, animada)
- Cajas 1, 2, 3: Activas (verde)
- Todo registrado en logs

### 2. Registrar Venta en Caja
**Control Panel:**
1. Pestaña "Cajas"
2. Seleccionar caja (ej: Caja 2)
3. Ingresar monto: $125.50
4. Click "Registrar Venta"

**Dashboard:**
- Notificación: "💰 Venta en Caja 2: $125.50"
- Se acumula en estadísticas de Caja 2
- Registro en logs

### 3. Alerta de Stock Bajo
**Control Panel:**
1. Pestaña "Inventario"
2. Nombre: "Arroz 1kg"
3. Stock actual: 8
4. Stock mínimo: 15
5. Click "Enviar Alerta de Stock Bajo"

**Dashboard:**
- Aparece en "Alertas de Inventario"
- Tarjeta roja con badge "Stock Bajo"
- Muestra: Arroz 1kg - Stock: 8 | Mínimo: 15
- Registro en logs con ⚠️

### 4. Activar Alarma de Pánico
**Control Panel:**
1. Pestaña "Emergencia"
2. Click "ACTIVAR ALARMA DE PÁNICO"
3. Confirmar en diálogo

**Dashboard:**
- Alarma de Pánico: PÁNICO ACTIVADO (rojo pulsante)
- Log: "🚨 ALARMA DE PÁNICO ACTIVADA"
- Alerta visual destacada

### 5. Activar Sistema de Emergencia Completo
**Control Panel:**
1. Pestaña "Emergencia"
2. Click "ACTIVAR EMERGENCIA COMPLETA"
3. Confirmar acción crítica

**Dashboard:**
- Sistema de Emergencia: EMERGENCIA ACTIVADA (rojo pulsante)
- Log: "🚨 SISTEMA DE EMERGENCIA ACTIVADO"
- Máxima prioridad visual

### 6. Cierre de Tienda
**Control Panel:**
1. Pestaña "Cajas" → Desactivar todas las cajas
2. Pestaña "Iluminación" → Apagar Luces
3. Pestaña "Ventilación" → Apagar Ventilación
4. Pestaña "Acceso" → Activar Modo Nocturno
5. Cerrar Puerta

**Dashboard:**
- Todo se actualiza en tiempo real
- Modo Nocturno activado
- Puerta cerrada
- Sistemas apagados

## 🔧 Personalización

### Modificar Número de Cajas
Actualmente configurado para 10 cajas. Para cambiar:

**Dashboard (dashboard.html):**
```javascript
// Línea ~390
for (let i = 1; i <= 10; i++) { // Cambiar 10 por número deseado
```

**Control Panel (control.html):**
```javascript
// Línea ~550
for (let i = 1; i <= 10; i++) { // Cambiar 10 por número deseado
```

### Cambiar Rangos de Temperatura
**Control Panel (control.html):**
```html
<!-- Línea ~340 -->
<input type="number" id="temperatura" value="22" min="15" max="35" step="0.5">
<!-- Modificar min y max según necesidad -->
```

### Modificar Colores
Editar variables CSS en ambos archivos:
```css
:root {
    --primary: #6366f1;    /* Índigo */
    --secondary: #8b5cf6;  /* Violeta */
    --success: #10b981;    /* Verde */
    --warning: #f59e0b;    /* Naranja */
    --danger: #ef4444;     /* Rojo */
}
```

### Agregar Nuevos Productos al Inventario
El sistema permite agregar productos dinámicamente desde el control panel. No requiere modificación de código.

## 🔒 Seguridad

- **QoS 1**: Garantiza entrega de mensajes críticos
- **Confirmaciones**: Acciones críticas (emergencia, alarmas) requieren confirmación
- **Modo Nocturno**: Seguridad adicional fuera de horario
- **Logs Completos**: Registro de todas las acciones
- **Conexión Segura**: WSS (WebSocket Secure)

## 📝 Notas Importantes

1. **Ambos archivos deben estar abiertos simultáneamente** para funcionamiento completo
2. **El dashboard es de solo lectura** (monitoreo)
3. **El control panel ejecuta acciones** (escritura)
4. **Los cambios son instantáneos** gracias a MQTT
5. **No requiere servidor backend** - todo funciona en el navegador
6. **Las cajas se gestionan individualmente** - cada una tiene su propio estado
7. **Las alertas de inventario se acumulan** - máximo 10 visibles

## 🐛 Troubleshooting

### No se conecta a MQTT
- Verificar conexión a Internet
- Revisar credenciales en `credential.js`
- Verificar consola del navegador (F12)

### No se actualizan las cajas
- Verificar que ambos archivos estén abiertos
- Revisar suscripciones en consola
- Verificar que los topics coincidan (caja/1, caja/2, etc.)

### Alarmas no se activan
- Verificar confirmación de diálogo
- Revisar logs en consola
- Verificar estado de conexión MQTT

### Alertas de inventario no aparecen
- Verificar que stock < mínimo
- Revisar formato JSON en consola
- Verificar suscripción al topic

## 📞 Soporte

Para problemas o mejoras, revisar:
- Consola del navegador (F12 > Console)
- Logs en tiempo real en el dashboard
- Estado de conexión MQTT

## 🔄 Actualizaciones Futuras

Posibles mejoras:
- [ ] Integración con hardware real (sensores, actuadores)
- [ ] Reportes de ventas por caja
- [ ] Gráficas de temperatura/humedad
- [ ] Historial de inventario
- [ ] Múltiples tiendas
- [ ] Autenticación de usuarios
- [ ] Cámaras de seguridad
- [ ] Análisis de datos de ventas

---

**Desarrollado para gestión inteligente de tiendas**  
Sistema de Monitoreo en Tiempo Real v1.0
