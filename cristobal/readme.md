# Estación de Mascotas - Sistema IoT 🐾

Sistema completo de monitoreo y control para estación de mascotas con MQTT en tiempo real.

## 🎯 Características

### Monitoreo en Tiempo Real
- **Nivel de Comida** - Peso simulado en gramos (0-500g)
- **Nivel de Agua** - Volumen en mililitros (0-1000ml)
- **Actividad del Animal** - Detección de movimiento (Baja/Media/Alta)
- **Gráficas Históricas** - Consumo de comida y agua en las últimas 24h

### Control Remoto
- **Dispensador de Comida** - Activación remota con cantidad configurable
- **Actualización de Niveles** - Ajuste manual de comida y agua
- **Reseteo de Tazones** - Rellenar al máximo con un click
- **Horarios de Alimentación** - Configuración de horarios automáticos

## 📁 Archivos del Proyecto

- **`dashboard.html`** - Dashboard de monitoreo en tiempo real
- **`control.html`** - Panel de control para ejecutar acciones
- **`INSTRUCCIONES.md`** - Documentación completa del sistema
- **`readme.md`** - Este archivo

## 🚀 Inicio Rápido

1. **Abrir Dashboard** (`dashboard.html`)
   - Visualiza niveles de comida y agua en tiempo real
   - Monitorea la actividad de tu mascota
   - Ve gráficas de consumo histórico

2. **Abrir Control Panel** (`control.html`)
   - Activa el dispensador de comida
   - Actualiza niveles manualmente
   - Configura horarios de alimentación

3. **Ambos archivos deben estar abiertos simultáneamente** para funcionamiento completo

## 📡 Topics MQTT

### Monitoreo
```
mascotas/cristobal/comida/nivel        # Nivel de comida (0-500g)
mascotas/cristobal/agua/nivel          # Nivel de agua (0-1000ml)
mascotas/cristobal/actividad/estado    # baja | media | alta
```

### Control
```
mascotas/cristobal/dispensador/activar    # Cantidad en gramos
mascotas/cristobal/dispensador/estado     # activado | desactivado
mascotas/cristobal/horario/configurar     # JSON: {horario1, horario2}
mascotas/cristobal/horario/estado         # configurado
```

## 🎨 Diseño

- **Colores vibrantes** con tonos coral, turquesa y amarillo
- **Interfaz amigable** con iconos de Font Awesome
- **Animaciones suaves** y transiciones
- **Responsive** para diferentes pantallas
- **Gráficas en tiempo real** con Chart.js

## 📊 Funcionalidades Principales

### Dashboard (Monitoreo)
✅ Nivel de comida con barra de progreso  
✅ Nivel de agua con barra de progreso  
✅ Indicador de actividad del animal  
✅ Gráfica histórica de consumo  
✅ Logs de eventos en tiempo real  
✅ Alertas cuando los niveles están bajos  

### Control Panel (Acciones)
✅ Dispensar comida con cantidad configurable  
✅ Actualizar niveles de comida y agua  
✅ Resetear tazones al máximo  
✅ Configurar horarios de alimentación  
✅ Simular niveles de actividad  
✅ Acciones rápidas (rellenar todo)  

## 🔧 Tecnologías

- **MQTT** (HiveMQ Cloud) - Comunicación en tiempo real
- **Chart.js** - Gráficas interactivas
- **HTML5/CSS3/JavaScript** - Interfaz web
- **Font Awesome** - Iconografía
- **Google Fonts (Poppins)** - Tipografía

## 📝 Casos de Uso

### 1. Dispensar Comida
**Control Panel:**
1. Seleccionar cantidad (10-200g)
2. Click en "Dispensar Comida Ahora"
3. Confirmar acción

**Dashboard:**
- El nivel de comida se actualiza
- Se registra en logs
- La gráfica se actualiza

### 2. Monitorear Niveles
**Dashboard:**
- Ve en tiempo real la comida y agua restante
- Recibe alertas cuando están bajos
- Consulta el historial de consumo

### 3. Configurar Horarios
**Control Panel:**
1. Establecer horarios (ej: 08:00 y 18:00)
2. Click en "Guardar Horario"

**Dashboard:**
- Se registra la configuración
- El sistema dispensará automáticamente

## ⚙️ Configuración

El sistema usa el cliente MQTT `client_cristobal` configurado en `../env/credential.js`.

### Niveles Máximos
- **Comida**: 500 gramos
- **Agua**: 1000 mililitros

### Alertas
- **Comida baja**: < 100g
- **Agua baja**: < 200ml

---

**Sistema desarrollado para el cuidado inteligente de mascotas**  
Monitoreo en Tiempo Real v1.0