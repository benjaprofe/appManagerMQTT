# 🚇 Sistema de Metro/Tren Inteligente - Instrucciones de Uso

Este sistema consta de **3 aplicaciones independientes** que se comunican mediante MQTT:

## 📦 Aplicaciones

1. **APP A - Panel de Control del Metro** (`control.html`)
2. **APP B - Dashboard de Monitoreo** (`dashboard.html`)
3. **APP C - Simulador del Metro** (`simulador.js`)

---

## 🚀 Instalación y Configuración

### 1. Instalar dependencias del simulador

```bash
cd tren
npm install
```

### 2. Iniciar el simulador

```bash
npm start
```

O directamente:

```bash
node simulador.js
```

Deberías ver:
```
✅ Simulador del Metro conectado a MQTT
📡 Suscrito a: metro/tren1/velocidad/set
...
🔄 Iniciando simulación automática...
```

---

## 🎮 Uso de las Aplicaciones

### Panel de Control (`control.html`)

1. Abre `control.html` en tu navegador
2. Espera a que se conecte (verás "✅ Conectado")
3. Usa los controles para:
   - **Control del Tren**: Iniciar/detener recorrido, controlar velocidad, abrir/cerrar puertas, freno de emergencia
   - **Control de Estación**: Encender/apagar luces, anunciar llegada, iniciar evacuación, activar alarmas
   - **Operaciones**: Cambiar modo del sistema (hora punta, baja demanda, normal)

### Dashboard de Monitoreo (`dashboard.html`)

1. Abre `dashboard.html` en tu navegador
2. Espera a que se conecte (verás "✅ Conectado")
3. Observa en tiempo real:
   - **Mapa del Recorrido**: Visualización del tren moviéndose entre estaciones
   - **Estado del Tren**: Velocidad, ubicación, puertas, capacidad, freno de emergencia
   - **Estado de la Estación**: Pasajeros, luces, alarmas, flujos de entrada/salida
   - **Sistema**: Modo actual y alertas
   - **Logs**: Eventos en tiempo real

### Simulador (`simulador.js`)

El simulador:
- Escucha comandos del Panel de Control
- Simula el movimiento del tren entre estaciones
- Actualiza estados automáticamente (velocidad, ubicación, pasajeros)
- Responde a eventos (evacuación, alarmas, congestión)
- Ajusta el comportamiento según el modo del sistema

---

## 🔄 Flujo de Comunicación

### Ejemplo: Iniciar recorrido del tren

1. **Panel de Control** → Publica: `metro/tren1/velocidad/set = 40`
2. **Simulador** → Recibe el comando e inicia el movimiento
3. **Simulador** → Publica: `metro/tren1/velocidad = 40`, `metro/tren1/ubicacion = "entre estacion1 y estacion2"`
4. **Dashboard** → Recibe los estados y muestra el tren moviéndose en el mapa

### Ejemplo: Llegada a estación

1. **Simulador** → Detecta llegada a estación
2. **Simulador** → Publica: `metro/tren1/ubicacion = "estacion2"`, `metro/tren1/puertas = "open"`
3. **Simulador** → Simula flujo de pasajeros
4. **Dashboard** → Muestra el tren en la estación, puertas abiertas, pasajeros entrando/saliendo

---

## 📡 Topics MQTT

### Topics de Control (Panel → Simulador)

- `metro/tren1/velocidad/set` → número (0-80 km/h)
- `metro/tren1/puertas/set` → "open" / "close"
- `metro/tren1/freno_emergencia/set` → "on" / "off"
- `metro/estacion1/luces/set` → "on" / "off"
- `metro/estacion1/evacuacion/set` → "start"
- `metro/estacion1/alarma/set` → "incendio" / "normal"
- `metro/estacion1/congestion/set` → "alta"
- `metro/estacion1/anuncio/set` → "llegada"
- `metro/sistema/modo/set` → "hora_punta" / "baja_demanda" / "normal"

### Topics de Estado (Simulador → Dashboard)

- `metro/tren1/velocidad` → número (km/h)
- `metro/tren1/ubicacion` → "estacion1" / "estacion2" / "entre estacion1 y estacion2"
- `metro/tren1/puertas` → "open" / "close"
- `metro/tren1/capacidad` → número (0-100%)
- `metro/tren1/freno_emergencia` → "on" / "off"
- `metro/estacion1/pasajeros` → número
- `metro/estacion1/luces` → "on" / "off"
- `metro/estacion1/alarma` → "normal" / "incendio" / "evacuacion" / "freno_emergencia"
- `metro/estacion1/flujos` → "entrada: X, salida: Y"
- `metro/sistema/modo` → "normal" / "hora_punta" / "baja_demanda"

---

## 🎯 Características del Simulador

### Movimiento del Tren

- El tren se mueve automáticamente entre 5 estaciones
- La velocidad varía según los comandos recibidos
- Al llegar a una estación, las puertas se abren automáticamente
- Las puertas se cierran después de 10 segundos

### Simulación de Pasajeros

- Pasajeros llegan al andén automáticamente cada 30 segundos
- Cuando las puertas se abren, se simula entrada/salida de pasajeros
- La capacidad del tren se actualiza según el flujo de pasajeros
- El número de pasajeros varía según el modo del sistema

### Modos del Sistema

- **Hora Punta**: Aumenta capacidad del tren (70-90%) y pasajeros en estación
- **Baja Demanda**: Reduce capacidad (20-40%) y pasajeros
- **Normal**: Capacidad media (40-70%)

### Eventos Especiales

- **Freno de Emergencia**: Detiene el tren inmediatamente y activa alarma
- **Evacuación**: Vacía la estación de pasajeros
- **Alarma de Incendio**: Activa alerta en el dashboard
- **Alta Congestión**: Aumenta significativamente el número de pasajeros

---

## 🗺️ Estaciones del Sistema

El sistema simula un recorrido con 5 estaciones:

1. **Estación 1** (Inicio)
2. **Estación 2**
3. **Estación 3**
4. **Estación 4**
5. **Estación 5** (Final)

El tren puede moverse en ambas direcciones (al llegar a la última estación, vuelve al inicio).

---

## 🐛 Solución de Problemas

### El simulador no se conecta

- Verifica que las credenciales MQTT sean correctas
- Asegúrate de tener conexión a internet
- Revisa la consola para ver errores

### El Dashboard no muestra el tren moviéndose

- Verifica que el simulador esté corriendo
- Abre la consola del navegador (F12) para ver mensajes
- Asegúrate de que el Panel de Control haya iniciado el recorrido

### El tren no se mueve

- Presiona "Iniciar Recorrido" en el Panel de Control
- O ajusta la velocidad usando el slider y presiona "Establecer Velocidad"
- Verifica que el freno de emergencia no esté activado

### Los archivos HTML no se conectan

- Verifica que estés usando un servidor web (no solo abrir el archivo)
- Puedes usar: `python -m http.server 8000` o `npx serve`
- O abre directamente en el navegador (funciona con MQTT WebSocket)

---

## 📝 Notas

- Todas las aplicaciones usan la misma conexión MQTT
- El simulador debe estar corriendo para que el sistema funcione
- Puedes tener múltiples instancias del Dashboard abiertas
- Los logs del Dashboard muestran todos los eventos en tiempo real
- El tren simula movimiento realista con aceleración y frenado

---

## 🎉 ¡Listo para usar!

1. Inicia el simulador: `npm start`
2. Abre el Panel de Control: `control.html`
3. Abre el Dashboard: `dashboard.html`
4. ¡Disfruta controlando tu metro inteligente!

### Prueba estos escenarios:

1. **Recorrido Normal**: Inicia el recorrido y observa el tren moverse
2. **Freno de Emergencia**: Activa el freno mientras el tren está en movimiento
3. **Evacuación**: Inicia una evacuación cuando el tren está en una estación
4. **Hora Punta**: Cambia a modo hora punta y observa el aumento de pasajeros
5. **Alta Congestión**: Activa alta congestión y observa el aumento de pasajeros en el andén

