# Tienda Inteligente - Sistema IoT 🏪

Sistema completo de monitoreo y control para tiendas con MQTT en tiempo real.

## 🎯 Características

### Control de Acceso
- **Puerta Principal** - Apertura/cierre remoto
- **Modo Nocturno** - Seguridad adicional y ahorro energético
- Monitoreo de estado en tiempo real

### Monitoreo Ambiental
- **Temperatura** - Control y monitoreo (15-35°C)
- **Humedad** - Medición en tiempo real (0-100%)
- Alertas de condiciones anormales

### Sistemas de Iluminación y Ventilación
- **Iluminación** - Encendido/apagado centralizado
- **Ventilación** - Control del sistema de climatización
- Gestión eficiente de energía

### Cajas Registradoras (10)
- Activación/desactivación individual
- Registro de ventas en tiempo real
- Monitoreo de cajas activas
- Estadísticas por caja

### Sistema de Inventario
- Alertas de stock bajo
- Configuración de stock mínimo
- Notificaciones automáticas
- Gestión de productos

### Sistemas de Emergencia
- **Alarma de Pánico** - Activación de sonido de alarma
- **Sistema de Emergencia** - Sonido y luces intermitentes
- Respuesta rápida ante situaciones críticas

## 📁 Archivos del Proyecto

- **`dashboard.html`** - Dashboard de monitoreo en tiempo real
- **`control.html`** - Panel de control para ejecutar acciones
- **`INSTRUCCIONES.md`** - Documentación completa del sistema
- **`readme.md`** - Este archivo

## 🚀 Inicio Rápido

1. **Abrir Dashboard** (`dashboard.html`)
   - Visualiza el estado de todos los sistemas
   - Monitorea cajas registradoras
   - Ve alertas de inventario

2. **Abrir Control Panel** (`control.html`)
   - Controla acceso y seguridad
   - Gestiona ambiente e iluminación
   - Administra cajas e inventario

3. **Ambos archivos deben estar abiertos simultáneamente** para funcionamiento completo

## 📡 Topics MQTT

### Control de Acceso
```
tienda/salgado/acceso/puerta           # abierta | cerrada
tienda/salgado/acceso/modo             # nocturno | normal
```

### Ambiente
```
tienda/salgado/ambiente/temperatura    # Número (°C)
tienda/salgado/ambiente/humedad        # Número (%)
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

### Cajas Registradoras
```
tienda/salgado/caja/{1-10}/estado      # activa | inactiva
tienda/salgado/caja/{1-10}/venta       # Número (monto)
```

### Inventario
```
tienda/salgado/inventario/alerta       # JSON: {producto, stock, minimo}
```

## 🎨 Diseño

- **Colores profesionales** con tonos índigo y violeta
- **Interfaz limpia** con tipografía Inter
- **Diseño modular** con pestañas organizadas
- **Responsive** para diferentes pantallas
- **Iconos Font Awesome** para mejor UX

## 📊 Funcionalidades Principales

### Dashboard (Monitoreo)
✅ Estado de puerta y modo nocturno  
✅ Temperatura y humedad en tiempo real  
✅ Estado de iluminación y ventilación  
✅ Monitoreo de alarmas  
✅ 10 cajas registradoras con estado  
✅ Alertas de inventario bajo  
✅ Logs de eventos completos  

### Control Panel (Acciones)
✅ Abrir/cerrar puerta remotamente  
✅ Activar modo nocturno  
✅ Actualizar temperatura y humedad  
✅ Controlar luces y ventilación  
✅ Gestionar cajas individuales  
✅ Registrar ventas por caja  
✅ Enviar alertas de inventario  
✅ Activar sistemas de emergencia  

## 🔧 Tecnologías

- **MQTT** (HiveMQ Cloud) - Comunicación en tiempo real
- **HTML5/CSS3/JavaScript** - Interfaz web
- **Font Awesome** - Iconografía
- **Google Fonts (Inter)** - Tipografía

## 📝 Casos de Uso

### 1. Apertura de Tienda
**Control Panel:**
1. Ir a pestaña "Acceso"
2. Click en "Abrir Puerta"
3. Activar "Modo Normal"
4. Ir a "Iluminación" → Encender Luces
5. Ir a "Ventilación" → Encender

**Dashboard:**
- Todos los cambios se reflejan instantáneamente
- Se registran en logs

### 2. Activar Caja Registradora
**Control Panel:**
1. Ir a pestaña "Cajas"
2. Seleccionar caja (ej: Caja 3)
3. Click en "Activar Caja"

**Dashboard:**
- La caja se marca como activa (verde)
- Se registra en logs

### 3. Registrar Venta
**Control Panel:**
1. Seleccionar caja activa
2. Ingresar monto (ej: $45.50)
3. Click en "Registrar Venta"

**Dashboard:**
- Aparece notificación de venta
- Se acumula en estadísticas de la caja

### 4. Alerta de Inventario
**Control Panel:**
1. Ir a pestaña "Inventario"
2. Ingresar producto (ej: "Leche 1L")
3. Stock actual: 5
4. Stock mínimo: 10
5. Click en "Enviar Alerta"

**Dashboard:**
- Aparece en "Alertas de Inventario"
- Se marca como stock bajo
- Se registra en logs

### 5. Emergencia
**Control Panel:**
1. Ir a pestaña "Emergencia"
2. Click en "ACTIVAR ALARMA DE PÁNICO"
3. Confirmar acción

**Dashboard:**
- Alarma se marca como activada (rojo pulsante)
- Alerta crítica en logs

## ⚙️ Configuración

El sistema usa el cliente MQTT `client_salgado` configurado en `../env/credential.js`.

### Límites del Sistema
- **Cajas Registradoras**: 10
- **Temperatura**: 15-35°C
- **Humedad**: 0-100%

---

**Sistema desarrollado para gestión inteligente de tiendas**  
Monitoreo en Tiempo Real v1.0
