# 🚇 **MEGA ESCENARIO: Metro/Tren Inteligente**

Tendrás **3 aplicaciones**, cada una con responsabilidades claras.

---

# 1️⃣ APP A — **Panel de Control del Metro (Control Center)**

**Esta es la app con botones donde tú fuerzas situaciones.**

### Controles posibles:

### 📌 **Tren**

* Iniciar recorrido
* Detener tren
* Aumentar velocidad
* Abrir/Cerrar puertas
* Activar freno de emergencia

### 📌 **Estación**

* Encender luces del andén
* Anunciar llegada del tren
* Forzar evento de evacuación
* Activar alarma de incendio
* Forzar alta congestión

### 📌 **Operaciones**

* Cambiar horario automático
* Activar modo “hora punta”
* Activar modo “baja demanda”

### Publicaciones MQTT:

```
metro/tren1/velocidad/set        → 60
metro/tren1/puertas/set          → "open"
metro/tren1/freno_emergencia/set → "on"
metro/estacion1/luces/set        → "off"
metro/estacion1/evacuacion/set   → "start"
metro/sistema/modo/set           → "hora_punta"
```

---

# 2️⃣ APP B — **Dashboard de Monitoreo (Panel Operacional)**

Este dashboard muestra todo lo que ocurre en el metro:

### 📍 Estado del tren:

* Velocidad actual
* Ubicación (coordenadas o “entre estaciones”)
* Puertas abiertas/cerradas
* Capacidad ocupada (simulada)
* Estado del freno de emergencia

### 📍 Estado de la estación:

* Pasajeros en andén
* Luces
* Alarmas
* Flujos (entradas/salidas)

### 📍 Alertas:

* Congestión alta
* Incendio
* Emergencia médica
* Retrasos

### Suscripciones MQTT:

```
metro/tren1/velocidad
metro/tren1/ubicacion
metro/tren1/puertas
metro/tren1/capacidad
metro/estacion1/pasajeros
metro/estacion1/luces
metro/estacion1/alarma
metro/estacion1/flujos
```

### Visualización sugerida:

* Un mapa 2D/3D del recorrido
* El tren moviéndose según la ubicación
* Gráficos de carga de pasajeros
* Indicadores estilo SCADA

---

# 3️⃣ APP C — **Simulador del Metro (Simulation Engine)**

Este servicio es clave.
Simula *la realidad del metro* en tiempo real.

### 🟦 ¿Qué simula el “tren”?

* Movimiento continuo
* Velocidad realista (acelera/frena)
* Puertas que solo se abren en estaciones
* Ocupación del tren según hora del día
* Frenos de emergencia
* Retrasos por congestión

Ejemplo MQTT generado:

```
metro/tren1/ubicacion → "estacion2"
metro/tren1/velocidad → 45
metro/tren1/capacidad → 73
```

### 🟩 ¿Qué simula la “estación”?

* Cantidad de personas esperando
* Personas entrando/saliendo del tren
* Alarmas por humo o exceso de personas
* Luces encendidas/apagadas
* Eventos de evacuación

Ejemplo MQTT generado:

```
metro/estacion1/pasajeros → 120
metro/estacion1/alarma → "incendio"
metro/estacion1/flujos → "entrada: 12, salida: 4"
```

### 🟥 ¿Cómo reacciona a comandos?

Si el simulador recibe:

```
metro/tren1/puertas/set → "open"
```

Envía:

```
metro/tren1/puertas → "open"
metro/estacion1/pasajeros → 130   (se acumulan)
```

Si recibe:

```
metro/tren1/freno_emergencia/set → "on"
```

Simula:

* Tren se detiene
* Se genera un evento de alerta
* Panel muestra detención inesperada

---

# 🔄 **Flujo completo del metro (ejemplo)**

### ➤ 1. Operador presiona “Iniciar ruta”

Panel → MQTT:

```
metro/tren1/velocidad/set = 40
```

### ➤ 2. El simulador mueve el tren

Simulador → MQTT:

```
metro/tren1/ubicacion = "entre estacion 1 y 2"
metro/tren1/velocidad = 39
```

### ➤ 3. Dashboard muestra el tren moviéndose

### ➤ 4. Tren llega a la estación

Simulador → MQTT:

```
metro/tren1/ubicacion = "estacion 2"
metro/tren1/puertas = "open"
metro/estacion2/pasajeros = 85
```

### ➤ 5. Operador activa “Evacuación”

Panel:

```
metro/estacion2/evacuacion/set = "start"
```

Simulador:

```
metro/estacion2/alarma = "evacuacion"
metro/estacion2/pasajeros = 0
```

Dashboard:
🟥 Se activa iluminación roja
🟥 Sonido de alarma
🟥 Animación de evacuación

---

# 🔧 Elementos simulables del Metro

Aquí tienes TODOS los elementos posibles:

## 🚆 Tren

* Velocidad
* Ubicación
* Puertas
* Freno de emergencia
* Estado del motor
* Consumo de energía
* Cargas (pasajeros)
* Vibración
* Fallas simuladas

## 🚉 Estación

* Pasajeros en andén
* Flujo de entrada/salida
* Luces
* Panel informativo
* Ascensores/escaleras
* Alarmas
* Sensores de humo
* Cámaras (eventos simulados)

## ⚠ Eventos automáticos

* Retrasos por congestión
* Tren detenido entre estaciones
* Simulación de “hora punta”
* Fallas del sistema
* Incendios
* Evacuaciones

---

# 🎮 ¿Quieres que te genere el código?

Puedo generarte:

### ✔ App A – Control del Metro (HTML + MQTT.js)

### ✔ App B – Dashboard (con tren animado moviéndose)

### ✔ App C – Simulador de tren en Node.js (movimiento real)

Solo dime:

## ¿Quieres dashboard 2D simple, 3D (Three.js) o estilo SCADA?

Y te lo armo de inmediato.
