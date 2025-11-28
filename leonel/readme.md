# Sistema de Monitoreo de Pacientes en Casa 🏥

Sistema IoT completo para monitoreo de salud de pacientes en casa con MQTT en tiempo real.

## 🎯 Características

### Monitoreo de Signos Vitales
- **Frecuencia Cardíaca** - Medición en tiempo real (BPM)
- **Oxígeno en Sangre** - Saturación SpO2 (%)
- Alertas automáticas de valores críticos
- Gráficas históricas de 24 horas

### Detector de Caídas
- **Acelerómetro** - Detección automática de caídas
- Alertas inmediatas
- Notificación visual y sonora

### Gestión de Emergencias
- **Contactos de Emergencia** - Médicos y familiares
- **Llamada de Emergencia** - Activación simulada
- **Mensajes de Tranquilidad** - Comunicación con el paciente

### Historial Médico
- Diagnósticos previos
- Medicación actual
- Registro de eventos

## 📁 Archivos del Proyecto

- **`dashboard.html`** - Dashboard de monitoreo en tiempo real
- **`control.html`** - Panel de control para gestión
- **`readme.md`** - Este archivo

## 🚀 Inicio Rápido

1. **Abrir Dashboard** (`dashboard.html`)
   - Visualiza signos vitales en tiempo real
   - Monitorea detector de caídas
   - Ve historial médico y contactos

2. **Abrir Control Panel** (`control.html`)
   - Actualiza signos vitales
   - Simula detección de caídas
   - Envía mensajes al paciente
   - Activa emergencias

3. **Ambos deben estar abiertos simultáneamente**

## 📡 Topics MQTT

### Signos Vitales
```
paciente/leonel/vitales/frecuencia     # BPM (60-100 normal)
paciente/leonel/vitales/oxigeno        # % (95-100 normal)
```

### Detector de Caídas
```
paciente/leonel/caida/detectada        # true | false
```

### Emergencias y Mensajes
```
paciente/leonel/emergencia/llamada     # activada | desactivada
paciente/leonel/mensaje/tranquilidad   # Texto del mensaje
```

## 🎨 Diseño

- **Colores médicos** con azul cielo y azul primario
- **Tipografía Roboto** profesional
- **Alertas visuales** con animaciones
- **Gráficas Chart.js** para historial
- **Responsive** para diferentes dispositivos

## 📊 Funcionalidades

### Dashboard (Monitoreo)
✅ Frecuencia cardíaca con alertas  
✅ Oxígeno en sangre con alertas  
✅ Detector de caídas visual  
✅ Contactos de emergencia  
✅ Historial médico  
✅ Gráficas de signos vitales  
✅ Banner de alertas críticas  
✅ Logs de eventos  

### Control Panel (Gestión)
✅ Actualizar frecuencia cardíaca  
✅ Actualizar oxígeno  
✅ Simular caída detectada  
✅ Enviar mensajes al paciente  
✅ Activar llamada de emergencia  
✅ Valores predefinidos (normales/críticos)  

## 📝 Casos de Uso

### 1. Monitoreo Normal
**Control:** Establecer valores normales (75 BPM, 98% O2)  
**Dashboard:** Muestra tarjetas verdes, sin alertas

### 2. Alerta Crítica
**Control:** Frecuencia 120 BPM, Oxígeno 88%  
**Dashboard:** Tarjetas rojas pulsantes, banner de alerta

### 3. Caída Detectada
**Control:** Simular caída  
**Dashboard:** Alerta roja "¡CAÍDA DETECTADA!"

### 4. Mensaje al Paciente
**Control:** Enviar "Todo está bien"  
**Dashboard:** Registro en logs

---

**Sistema de Salud en Casa v1.0**