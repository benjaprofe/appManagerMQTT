# 🏠 Sistema de Hogar Inteligente - Instrucciones de Uso

Este sistema consta de **3 aplicaciones independientes** que se comunican mediante MQTT:

## 📦 Aplicaciones

1. **APP A - Panel de Control** (`control.html`)
2. **APP B - Dashboard de Monitoreo** (`dashboard.html`)
3. **APP C - Simulador** (`simulador.js`)

---

## 🚀 Instalación y Configuración

### 1. Instalar dependencias del simulador

```bash
cd hogar
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
✅ Simulador conectado a MQTT
📡 Suscrito a: hogar/+/luz/set
...
🔄 Iniciando simulación automática...
```

---

## 🎮 Uso de las Aplicaciones

### Panel de Control (`control.html`)

1. Abre `control.html` en tu navegador
2. Espera a que se conecte (verás "✅ Conectado")
3. Usa los botones para:
   - Encender/apagar luces
   - Abrir/cerrar puerta
   - Activar/desactivar alarma
   - Ajustar temperatura
   - Disparar eventos simulados

### Dashboard de Monitoreo (`dashboard.html`)

1. Abre `dashboard.html` en tu navegador
2. Espera a que se conecte (verás "✅ Conectado")
3. Observa en tiempo real:
   - Estados de todos los sensores
   - Temperatura actual
   - Estados de luces, puertas, alarmas
   - Logs de eventos en tiempo real

### Simulador (`simulador.js`)

El simulador:
- Escucha comandos del Panel de Control
- Actualiza estados automáticamente
- Simula eventos del hogar (temperatura, movimiento, etc.)
- Responde a eventos simulados

---

## 🔄 Flujo de Comunicación

### Ejemplo: Encender luz del living

1. **Panel de Control** → Publica: `hogar/living/luz/set = "on"`
2. **Simulador** → Recibe el comando y actualiza estado
3. **Simulador** → Publica: `hogar/living/luz/state = "on"`
4. **Dashboard** → Recibe el estado y muestra la luz encendida

---

## 📡 Topics MQTT

### Topics de Control (Panel → Simulador)

- `hogar/living/luz/set` → "on" / "off"
- `hogar/cocina/luz/set` → "on" / "off"
- `hogar/dormitorio/luz/set` → "on" / "off"
- `hogar/puerta/principal/set` → "open" / "close"
- `hogar/alarma/set` → "enabled" / "disabled"
- `hogar/clima/temperatura/set` → número (16-30)
- `hogar/evento/simulacion/set` → "incendio" / "movimiento" / "persona_llegando" / "gas"
- `hogar/living/tv/set` → "on" / "off"

### Topics de Estado (Simulador → Dashboard)

- `hogar/living/luz/state` → "on" / "off"
- `hogar/cocina/luz/state` → "on" / "off"
- `hogar/dormitorio/luz/state` → "on" / "off"
- `hogar/puerta/principal/state` → "open" / "close"
- `hogar/alarma/state` → "enabled" / "disabled" / "activada"
- `hogar/clima/temperatura` → número
- `hogar/sensor/humo` → "normal" / "alto"
- `hogar/sensor/movimiento` → "no" / "si"
- `hogar/sensor/gas` → "normal" / "alto"
- `hogar/living/tv/state` → "on" / "off"
- `hogar/living/ventana/state` → "open" / "close"
- `hogar/cocina/refrigerador/temperatura` → número

---

## 🎯 Eventos Simulados

El Panel de Control puede disparar eventos especiales:

- **🔥 Incendio**: Activa sensor de humo, alarma y luces
- **👤 Movimiento**: Detecta movimiento (se desactiva automáticamente)
- **🚶 Persona Llegando**: Abre puerta, detecta movimiento, enciende luces
- **⛽ Fuga de Gas**: Activa sensor de gas y alarma

---

## 🔧 Simulación Automática

El simulador ejecuta automáticamente:

- **Temperatura**: Cambia cada 30 segundos (±1°C)
- **Movimiento**: Simula movimiento ocasional (10% probabilidad cada minuto)
- **Refrigerador**: Cambia temperatura cada 45 segundos
- **Ciclo día/noche**: Enciende/apaga luces según la hora

---

## 🐛 Solución de Problemas

### El simulador no se conecta

- Verifica que las credenciales MQTT sean correctas
- Asegúrate de tener conexión a internet
- Revisa la consola para ver errores

### El Dashboard no muestra cambios

- Verifica que el simulador esté corriendo
- Abre la consola del navegador (F12) para ver mensajes
- Asegúrate de que el Panel de Control esté enviando comandos

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

---

## 🎉 ¡Listo para usar!

1. Inicia el simulador: `npm start`
2. Abre el Panel de Control: `control.html`
3. Abre el Dashboard: `dashboard.html`
4. ¡Disfruta controlando tu hogar inteligente!

