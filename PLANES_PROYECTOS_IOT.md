# 📋 Planes de Implementación MQTT - 80 Proyectos IoT

Este documento contiene el análisis detallado y planes de implementación con MQTT para cada uno de los 80 proyectos IoT propuestos, organizados en grupos de 10 para facilitar la lectura.

---

## 🏙️ CATEGORÍA: SMART CITY (Proyectos 1-10)

### Proyecto #01: Semáforo Inteligente Adaptativo

**Descripción:** Control de tráfico que cambia según la densidad de autos detectada.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensores de detección de vehículos (ultrasonido/LIDAR) en cada carril
- Controlador de semáforo (ESP32/Arduino) con LEDs RGB
- Cámara opcional para conteo avanzado

**Topics MQTT:**
- `smartcity/semaforo/{id}/sensor/vehiculos` - Publica: Número de vehículos detectados por carril
- `smartcity/semaforo/{id}/sensor/densidad` - Publica: Nivel de densidad (baja/media/alta)
- `smartcity/semaforo/{id}/control/estado` - Publica: Estado actual (verde/amarillo/rojo) y tiempo restante
- `smartcity/semaforo/{id}/control/set` - Subscribe: Comandos para cambiar estado manualmente
- `smartcity/semaforo/{id}/config/tiempo` - Subscribe: Configurar tiempos de luz verde según densidad
- `smartcity/semaforo/{id}/alerta/emergencia` - Publica: Alerta cuando detecta ambulancia/policía

**Comunicación Bidireccional:**
- Dashboard central envía comandos de priorización
- Semáforos coordinan entre sí para ondas verdes
- Sistema de emergencia puede forzar luz verde para vehículos prioritarios

**Flujo de Datos:**
1. Sensores publican densidad cada 5 segundos
2. Controlador calcula tiempo óptimo de luz verde
3. Dashboard recibe estado y permite override manual
4. Coordinación entre semáforos cercanos para optimizar flujo

---

### Proyecto #02: Sistema de Parking Público

**Descripción:** Sensores en plazas de calle que guían a los conductores a lugares libres vía app.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensores de ocupación (ultrasonido/magnético) en cada plaza
- Gateway LoRaWAN/WiFi para agrupar sensores
- Display LED en calle mostrando plazas libres

**Topics MQTT:**
- `smartcity/parking/{zona}/{plaza}/estado` - Publica: libre/ocupado con timestamp
- `smartcity/parking/{zona}/resumen` - Publica: Total libre/ocupado por zona
- `smartcity/parking/{zona}/display/set` - Subscribe: Actualizar display LED
- `smartcity/parking/app/buscar` - Subscribe: Solicitud de búsqueda desde app móvil
- `smartcity/parking/app/respuesta` - Publica: Lista de plazas libres más cercanas
- `smartcity/parking/{plaza}/reserva/set` - Subscribe: Reservar plaza desde app
- `smartcity/parking/{plaza}/reserva/confirm` - Publica: Confirmación de reserva

**Comunicación Bidireccional:**
- App móvil solicita plazas libres y recibe respuesta en tiempo real
- Usuario puede reservar plaza antes de llegar
- Sistema notifica cuando plaza está disponible

**Flujo de Datos:**
1. Sensor detecta cambio de estado (libre→ocupado o viceversa)
2. Gateway agrega datos y publica resumen por zona
3. App móvil subscribe a zona específica y recibe actualizaciones
4. Usuario reserva plaza, sistema bloquea por 15 minutos

---

### Proyecto #03: Alumbrado Público Eficiente

**Descripción:** Farolas que aumentan intensidad solo cuando detectan peatones o vehículos.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Farola inteligente con sensor PIR/movimiento
- Controlador de intensidad LED (PWM)
- Sensor de luminosidad ambiental

**Topics MQTT:**
- `smartcity/alumbrado/{id}/sensor/movimiento` - Publica: Detecta presencia (true/false)
- `smartcity/alumbrado/{id}/sensor/luminosidad` - Publica: Nivel de luz ambiental
- `smartcity/alumbrado/{id}/control/intensidad` - Publica: Intensidad actual (0-100%)
- `smartcity/alumbrado/{id}/control/set` - Subscribe: Comando para ajustar intensidad
- `smartcity/alumbrado/{id}/config/auto` - Subscribe: Activar/desactivar modo automático
- `smartcity/alumbrado/{id}/estado/fallo` - Publica: Alerta de fallo de LED o sensor
- `smartcity/alumbrado/zona/{id}/control/set` - Subscribe: Control grupal de zona

**Comunicación Bidireccional:**
- Dashboard central puede ajustar intensidad manualmente
- Sistema puede activar modo "hora punta" aumentando todas las farolas
- Mantenimiento recibe alertas de fallos

**Flujo de Datos:**
1. Sensor detecta movimiento → publica evento
2. Farola aumenta intensidad a 100% automáticamente
3. Si no hay movimiento por 2 minutos → reduce a 30%
4. Dashboard puede forzar intensidad fija para mantenimiento

---

### Proyecto #04: Gestión de Residuos Urbanos

**Descripción:** Contenedores que avisan a los camiones cuando están llenos para optimizar rutas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de nivel (ultrasonido/láser) en contenedor
- GPS en camión de recogida
- Gateway en contenedor con batería solar

**Topics MQTT:**
- `smartcity/residuos/{contenedor_id}/sensor/nivel` - Publica: Nivel de llenado (0-100%)
- `smartcity/residuos/{contenedor_id}/sensor/temperatura` - Publica: Temperatura (detección de fuego)
- `smartcity/residuos/{contenedor_id}/alerta/lleno` - Publica: Alerta cuando >80% lleno
- `smartcity/residuos/{contenedor_id}/alerta/incendio` - Publica: Alerta de temperatura alta
- `smartcity/residuos/camion/{id}/ubicacion` - Publica: GPS del camión en tiempo real
- `smartcity/residuos/camion/{id}/ruta/set` - Subscribe: Nueva ruta optimizada desde central
- `smartcity/residuos/central/prioridad` - Publica: Lista de contenedores prioritarios
- `smartcity/residuos/{contenedor_id}/recoleccion/confirm` - Subscribe: Confirmar recolección

**Comunicación Bidireccional:**
- Central calcula ruta óptima y la envía al camión
- Camión confirma recolección y actualiza estado
- Sistema prioriza contenedores críticos

**Flujo de Datos:**
1. Contenedor publica nivel cada hora o cuando cambia significativamente
2. Si nivel >80%, publica alerta de prioridad
3. Central agrega datos y calcula ruta óptima
4. Camión recibe ruta y publica su ubicación en tiempo real
5. Al recoger, confirma y contenedor resetea nivel

---

### Proyecto #05: Monitoreo de Calidad del Aire

**Descripción:** Estaciones en paradas de bus que miden CO2 y recomiendan uso de mascarilla.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Estación de calidad del aire (sensores CO2, PM2.5, PM10, NO2)
- Display LED en parada mostrando índice de calidad
- Sensor meteorológico (temperatura, humedad, viento)

**Topics MQTT:**
- `smartcity/aire/{estacion_id}/sensor/co2` - Publica: Nivel de CO2 (ppm)
- `smartcity/aire/{estacion_id}/sensor/pm25` - Publica: Partículas PM2.5
- `smartcity/aire/{estacion_id}/sensor/pm10` - Publica: Partículas PM10
- `smartcity/aire/{estacion_id}/sensor/no2` - Publica: Dióxido de nitrógeno
- `smartcity/aire/{estacion_id}/indice/calidad` - Publica: Índice AQI calculado
- `smartcity/aire/{estacion_id}/recomendacion` - Publica: Recomendación (mascarilla sí/no)
- `smartcity/aire/{estacion_id}/display/set` - Subscribe: Actualizar mensaje en display
- `smartcity/aire/app/consulta` - Subscribe: Consulta desde app móvil
- `smartcity/aire/app/respuesta` - Publica: Datos de estación más cercana

**Comunicación Bidireccional:**
- App móvil consulta calidad del aire en ubicación específica
- Sistema puede configurar umbrales de alerta
- Dashboard central agrega datos de todas las estaciones

**Flujo de Datos:**
1. Estación publica datos cada 5 minutos
2. Calcula índice AQI y recomendación
3. Actualiza display local automáticamente
4. App móvil consulta y recibe datos en tiempo real
5. Si AQI >100, publica alerta a sistema de salud pública

---

### Proyecto #06: Alerta de Inundaciones

**Descripción:** Sensores en alcantarillas y ríos que activan sirenas y barreras automáticas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de nivel de agua (ultrasonido/presión) en alcantarilla
- Sensor de nivel en río
- Actuador de barrera automática
- Sirena de alerta con control remoto

**Topics MQTT:**
- `smartcity/inundacion/{sensor_id}/sensor/nivel` - Publica: Nivel de agua (cm)
- `smartcity/inundacion/{sensor_id}/sensor/velocidad` - Publica: Velocidad de flujo
- `smartcity/inundacion/{sensor_id}/alerta/critica` - Publica: Alerta cuando nivel >umbral
- `smartcity/inundacion/{barrera_id}/control/estado` - Publica: Estado (abierta/cerrada)
- `smartcity/inundacion/{barrera_id}/control/set` - Subscribe: Comando abrir/cerrar
- `smartcity/inundacion/{sirena_id}/control/set` - Subscribe: Activar/desactivar sirena
- `smartcity/inundacion/central/emergencia` - Publica: Alerta general de emergencia
- `smartcity/inundacion/app/alertas` - Publica: Notificaciones push a ciudadanos

**Comunicación Bidireccional:**
- Sistema automático activa barreras cuando detecta nivel crítico
- Operador puede activar manualmente sirena y barreras
- Sistema envía alertas a app de ciudadanos

**Flujo de Datos:**
1. Sensor publica nivel cada minuto (o cada 10 segundos si sube rápido)
2. Si nivel >umbral crítico, publica alerta
3. Sistema automático subscribe a alerta y activa barrera
4. Sirena se activa automáticamente
5. App de ciudadanos recibe notificación push
6. Dashboard muestra mapa de riesgo en tiempo real

---

### Proyecto #07: Parada de Bus Inteligente

**Descripción:** Pantalla que muestra ubicación real del bus y permite solicitar parada para discapacitados.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Display en parada de bus
- Botón de solicitud de parada accesible
- GPS en cada bus
- Sensor de ocupación en bus

**Topics MQTT:**
- `smartcity/bus/{bus_id}/ubicacion` - Publica: GPS del bus en tiempo real
- `smartcity/bus/{bus_id}/ocupacion` - Publica: Número de pasajeros
- `smartcity/bus/{bus_id}/ruta` - Publica: Ruta actual y próxima parada
- `smartcity/bus/{parada_id}/display/buses` - Subscribe: Lista de buses próximos
- `smartcity/bus/{parada_id}/solicitud/parada` - Subscribe: Solicitud de parada accesible
- `smartcity/bus/{bus_id}/solicitud/recibida` - Publica: Confirmación de solicitud
- `smartcity/bus/{parada_id}/sensor/pasajeros` - Publica: Personas esperando en parada
- `smartcity/bus/{bus_id}/control/prioridad` - Subscribe: Priorizar parada (modo accesible)

**Comunicación Bidireccional:**
- Usuario presiona botón en parada → solicitud llega al bus
- Bus confirma recepción y activa modo accesible
- Display muestra tiempo real de llegada

**Flujo de Datos:**
1. Bus publica ubicación cada 10 segundos
2. Sistema calcula tiempo de llegada a cada parada
3. Display subscribe a datos de buses de su ruta
4. Usuario presiona botón → publica solicitud
5. Bus más cercano recibe solicitud y confirma
6. Display muestra "Bus X llegando en 3 min - Modo Accesible"

---

### Proyecto #08: Riego de Parques Públicos

**Descripción:** Sistema que riega solo si la humedad del suelo es baja y no hay previsión de lluvia.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de humedad del suelo (múltiples puntos)
- Válvula de riego controlada por solenoide
- Estación meteorológica local
- Integración con API de pronóstico del tiempo

**Topics MQTT:**
- `smartcity/riego/{zona_id}/sensor/humedad` - Publica: Humedad del suelo (%)
- `smartcity/riego/{zona_id}/sensor/temperatura_suelo` - Publica: Temperatura
- `smartcity/riego/{valvula_id}/control/estado` - Publica: Estado (abierta/cerrada)
- `smartcity/riego/{valvula_id}/control/set` - Subscribe: Comando abrir/cerrar
- `smartcity/riego/{zona_id}/config/umbral` - Subscribe: Configurar umbral de humedad
- `smartcity/riego/pronostico/lluvia` - Publica: Probabilidad de lluvia (desde API externa)
- `smartcity/riego/{zona_id}/programa/set` - Subscribe: Programar riego manual
- `smartcity/riego/{zona_id}/consumo/agua` - Publica: Litros consumidos por sesión

**Comunicación Bidireccional:**
- Sistema automático decide regar basado en humedad y pronóstico
- Operador puede programar riego manual o ajustar umbrales
- Sistema reporta consumo de agua para optimización

**Flujo de Datos:**
1. Sensor publica humedad cada 30 minutos
2. Sistema consulta pronóstico de lluvia (API externa → publica en MQTT)
3. Si humedad <umbral Y probabilidad lluvia <30% → activa riego
4. Válvula se abre y publica estado
5. Después de tiempo programado, se cierra
6. Sistema publica consumo de agua

---

### Proyecto #09: Detección de Disparos/Ruidos

**Descripción:** Triangulación de sonidos fuertes para alertar a policía en zonas peligrosas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Array de micrófonos direccionales en puntos estratégicos
- Procesador de señal de audio (DSP)
- GPS en cada sensor para triangulación

**Topics MQTT:**
- `smartcity/seguridad/{sensor_id}/audio/evento` - Publica: Detección de sonido fuerte con timestamp
- `smartcity/seguridad/{sensor_id}/audio/tipo` - Publica: Tipo detectado (disparo/explosión/ruido)
- `smartcity/seguridad/{sensor_id}/audio/intensidad` - Publica: Nivel de decibeles
- `smartcity/seguridad/triangulacion/origen` - Publica: Coordenadas calculadas del origen
- `smartcity/seguridad/policia/alerta` - Publica: Alerta prioritaria a central de policía
- `smartcity/seguridad/{sensor_id}/config/sensibilidad` - Subscribe: Ajustar sensibilidad
- `smartcity/seguridad/{sensor_id}/config/filtro` - Subscribe: Configurar filtros de ruido
- `smartcity/seguridad/dashboard/mapa` - Publica: Visualización de eventos en mapa

**Comunicación Bidireccional:**
- Sistema triangula automáticamente origen del sonido
- Central de policía recibe alerta con ubicación exacta
- Operador puede ajustar sensibilidad para reducir falsos positivos

**Flujo de Datos:**
1. Múltiples sensores detectan sonido simultáneamente
2. Cada sensor publica timestamp y nivel de intensidad
3. Sistema central calcula triangulación usando diferencias de tiempo
4. Publica coordenadas estimadas del origen
5. Si clasifica como disparo → publica alerta prioritaria
6. Dashboard muestra evento en mapa en tiempo real

---

### Proyecto #10: Kiosco de Información Turística

**Descripción:** Pantalla interactiva que sugiere rutas y envía mapas al móvil del turista.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Pantalla táctil interactiva
- Cámara para detección de presencia
- Impresora de tickets/QR codes
- Beacon Bluetooth para detección de móviles cercanos

**Topics MQTT:**
- `smartcity/kiosco/{id}/sensor/presencia` - Publica: Detecta persona cerca
- `smartcity/kiosco/{id}/interaccion/consulta` - Subscribe: Consulta del usuario (idioma, interés)
- `smartcity/kiosco/{id}/interaccion/ruta` - Publica: Ruta sugerida generada
- `smartcity/kiosco/{id}/qr/generar` - Subscribe: Generar QR con información
- `smartcity/kiosco/{id}/app/enviar` - Subscribe: Enviar mapa a app móvil
- `smartcity/kiosco/{id}/estadisticas/uso` - Publica: Estadísticas de uso (horas pico, idiomas)
- `smartcity/kiosco/{id}/config/contenido` - Subscribe: Actualizar contenido/idiomas disponibles
- `smartcity/kiosco/{id}/estado/mantenimiento` - Publica: Alerta de fallo técnico

**Comunicación Bidireccional:**
- Usuario interactúa con pantalla → sistema genera ruta personalizada
- Usuario escanea QR o conecta vía app → recibe información en su móvil
- Sistema aprende de interacciones para mejorar sugerencias

**Flujo de Datos:**
1. Sensor detecta presencia → activa pantalla
2. Usuario selecciona idioma e intereses
3. Sistema consulta base de datos y genera ruta
4. Usuario elige recibir en móvil → sistema publica QR o envía push
5. App móvil subscribe y recibe datos de ruta
6. Sistema publica estadísticas para análisis

---

## 🏭 CATEGORÍA: INDUSTRIAL (Proyectos 11-20)

### Proyecto #11: Brazo Robótico Clasificador

**Descripción:** Cinta transportadora que separa objetos por color usando sensores RGB.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de color RGB en cinta transportadora
- Brazo robótico con actuadores (servos/motores)
- Cámara opcional para reconocimiento avanzado
- Sensores de posición en cinta

**Topics MQTT:**
- `industrial/clasificador/sensor/color` - Publica: Color detectado (RGB + clasificación)
- `industrial/clasificador/sensor/posicion` - Publica: Posición del objeto en cinta
- `industrial/clasificador/brazo/estado` - Publica: Estado (idle/moviendo/agarrar/soltar)
- `industrial/clasificador/brazo/comando` - Subscribe: Comando de movimiento (x, y, z, acción)
- `industrial/clasificador/config/colores` - Subscribe: Definir colores objetivo y destinos
- `industrial/clasificador/estadisticas/conteo` - Publica: Objetos clasificados por color
- `industrial/clasificador/alerta/error` - Publica: Error de agarre o movimiento
- `industrial/clasificador/control/manual` - Subscribe: Control manual del brazo

**Comunicación Bidireccional:**
- Sensor detecta objeto → publica color y posición
- Sistema calcula trayectoria y envía comando al brazo
- Operador puede tomar control manual en caso de error

**Flujo de Datos:**
1. Sensor RGB detecta objeto → publica color y posición
2. Sistema clasifica color y determina destino
3. Calcula trayectoria óptima del brazo
4. Publica comando de movimiento al brazo
5. Brazo ejecuta y publica estado de cada paso
6. Al completar, publica estadística de clasificación

---

### Proyecto #12: Monitor de Vibración de Maquinaria

**Descripción:** Detecta patrones anómalos en motores para predecir fallos (Mantenimiento Predictivo).

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Acelerómetro triaxial en máquina
- Sensor de temperatura
- Sensor de corriente eléctrica
- Gateway para procesamiento de señales

**Topics MQTT:**
- `industrial/vibracion/{maquina_id}/sensor/aceleracion` - Publica: Datos de aceleración (x, y, z)
- `industrial/vibracion/{maquina_id}/sensor/frecuencia` - Publica: Análisis FFT (frecuencias dominantes)
- `industrial/vibracion/{maquina_id}/sensor/temperatura` - Publica: Temperatura del motor
- `industrial/vibracion/{maquina_id}/sensor/corriente` - Publica: Consumo eléctrico
- `industrial/vibracion/{maquina_id}/analisis/estado` - Publica: Estado de salud (normal/atención/crítico)
- `industrial/vibracion/{maquina_id}/prediccion/fallo` - Publica: Probabilidad de fallo y tiempo estimado
- `industrial/vibracion/{maquina_id}/alerta/mantenimiento` - Publica: Alerta cuando requiere mantenimiento
- `industrial/vibracion/{maquina_id}/config/umbral` - Subscribe: Configurar umbrales de alerta
- `industrial/vibracion/{maquina_id}/historial/set` - Subscribe: Solicitar historial de datos

**Comunicación Bidireccional:**
- Sistema analiza patrones y predice fallos
- Dashboard puede solicitar historial para análisis
- Mantenimiento recibe alertas proactivas

**Flujo de Datos:**
1. Acelerómetro publica datos cada segundo (o en tiempo real)
2. Gateway procesa señal y calcula FFT
3. Compara con patrones normales almacenados
4. Si detecta anomalía → publica alerta
5. Sistema de ML predice tiempo hasta fallo
6. Mantenimiento recibe notificación con tiempo estimado

---

### Proyecto #13: Control de Tanques Químicos

**Descripción:** Monitoreo de nivel, presión y temperatura con válvulas de alivio automáticas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de nivel (ultrasonido/presión)
- Sensor de presión
- Sensor de temperatura
- Válvula de alivio controlada
- Válvula de entrada/salida

**Topics MQTT:**
- `industrial/tanque/{id}/sensor/nivel` - Publica: Nivel de líquido (%)
- `industrial/tanque/{id}/sensor/presion` - Publica: Presión interna (PSI)
- `industrial/tanque/{id}/sensor/temperatura` - Publica: Temperatura (°C)
- `industrial/tanque/{id}/valvula/alivio/estado` - Publica: Estado válvula alivio (abierta/cerrada)
- `industrial/tanque/{id}/valvula/alivio/set` - Subscribe: Comando abrir/cerrar
- `industrial/tanque/{id}/valvula/entrada/set` - Subscribe: Control de llenado
- `industrial/tanque/{id}/alerta/presion_alta` - Publica: Alerta de sobrepresión
- `industrial/tanque/{id}/alerta/temperatura_alta` - Publica: Alerta de temperatura crítica
- `industrial/tanque/{id}/control/automatico` - Subscribe: Activar/desactivar modo automático
- `industrial/tanque/{id}/historial/datos` - Publica: Log de cambios de estado

**Comunicación Bidireccional:**
- Sistema automático activa válvula de alivio si presión >umbral
- Operador puede controlar válvulas manualmente
- Sistema registra todos los eventos para auditoría

**Flujo de Datos:**
1. Sensores publican datos cada 10 segundos
2. Si presión >umbral crítico → activa válvula alivio automáticamente
3. Publica alerta a operador
4. Operador puede override manual
5. Sistema registra todos los eventos
6. Dashboard muestra estado de todos los tanques

---

### Proyecto #14: Sistema Andon Digital

**Descripción:** Botoneras en líneas de montaje para alertar problemas y detener la producción.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Botonera con botones de colores (verde/amarillo/rojo)
- Display LED en línea de producción
- Sirena/alerón visual
- Sistema de parada de emergencia

**Topics MQTT:**
- `industrial/andon/{linea_id}/boton/presionado` - Publica: Botón presionado (verde/amarillo/rojo) + timestamp
- `industrial/andon/{linea_id}/boton/operador` - Publica: ID del operador que presionó
- `industrial/andon/{linea_id}/estado/linea` - Publica: Estado actual (produciendo/parada/alerta)
- `industrial/andon/{linea_id}/display/set` - Subscribe: Mensaje a mostrar en display
- `industrial/andon/{linea_id}/sirena/set` - Subscribe: Activar/desactivar sirena
- `industrial/andon/{linea_id}/produccion/detener` - Subscribe: Comando de parada de emergencia
- `industrial/andon/{linea_id}/problema/descripcion` - Subscribe: Descripción del problema (texto)
- `industrial/andon/{linea_id}/problema/resuelto` - Subscribe: Marcar problema como resuelto
- `industrial/andon/central/alertas` - Publica: Agregación de todas las alertas activas

**Comunicación Bidireccional:**
- Operador presiona botón → alerta llega a supervisores
- Supervisor puede enviar mensaje al display de la línea
- Sistema puede detener producción automáticamente

**Flujo de Datos:**
1. Operador presiona botón (verde=OK, amarillo=atención, rojo=parada)
2. Sistema publica alerta con ID de operador y timestamp
3. Display muestra estado y mensaje
4. Si rojo → activa sirena y detiene línea
5. Supervisor recibe notificación
6. Al resolver, operador presiona verde → línea reanuda

---

### Proyecto #15: Rastreo de Activos en Almacén

**Descripción:** Localización precisa de montacargas y pallets dentro de una nave industrial.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Tags RFID/UWB en montacargas y pallets
- Antenas receptoras distribuidas en almacén
- Gateway para triangulación
- Display en montacarga mostrando ubicación

**Topics MQTT:**
- `industrial/almacen/{activo_id}/ubicacion` - Publica: Coordenadas (x, y, z) en tiempo real
- `industrial/almacen/{activo_id}/tipo` - Publica: Tipo (montacarga/pallet/producto)
- `industrial/almacen/{activo_id}/estado` - Publica: Estado (en_movimiento/estacionado)
- `industrial/almacen/buscar/{activo_id}` - Subscribe: Solicitud de búsqueda
- `industrial/almacen/buscar/respuesta` - Publica: Ubicación del activo buscado
- `industrial/almacen/zona/{id}/activos` - Publica: Lista de activos en zona específica
- `industrial/almacen/{montacarga_id}/ruta/set` - Subscribe: Enviar ruta optimizada
- `industrial/almacen/estadisticas/ocupacion` - Publica: Mapa de calor de ocupación

**Comunicación Bidireccional:**
- Sistema WMS solicita ubicación de activo
- Sistema calcula ruta óptima y la envía al montacarga
- Dashboard muestra mapa en tiempo real

**Flujo de Datos:**
1. Tags emiten señal periódicamente
2. Antenas reciben señal y calculan distancia
3. Gateway triangula posición precisa
4. Publica ubicación cada 5 segundos
5. Sistema WMS consulta ubicación cuando necesita
6. Si solicita ruta → calcula y envía al montacarga

---

### Proyecto #16: Control de Acceso Biométrico

**Descripción:** Puertas de seguridad que requieren huella/RFID y registran entradas en tiempo real.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Lector biométrico (huella dactilar)
- Lector RFID
- Actuador de cerradura eléctrica
- Cámara opcional para registro visual

**Topics MQTT:**
- `industrial/acceso/{puerta_id}/lector/huella` - Publica: Huella detectada (hash)
- `industrial/acceso/{puerta_id}/lector/rfid` - Publica: ID de tarjeta RFID
- `industrial/acceso/{puerta_id}/validacion/solicitud` - Subscribe: Solicitud de validación
- `industrial/acceso/{puerta_id}/validacion/respuesta` - Publica: Resultado (permitido/denegado)
- `industrial/acceso/{puerta_id}/cerradura/estado` - Publica: Estado (abierta/cerrada)
- `industrial/acceso/{puerta_id}/cerradura/set` - Subscribe: Comando abrir/cerrar
- `industrial/acceso/{puerta_id}/evento/entrada` - Publica: Registro de entrada (usuario, timestamp)
- `industrial/acceso/{puerta_id}/evento/salida` - Publica: Registro de salida
- `industrial/acceso/{puerta_id}/alerta/intento_fraudulento` - Publica: Múltiples intentos fallidos
- `industrial/acceso/central/usuarios` - Subscribe: Actualizar base de usuarios autorizados

**Comunicación Bidireccional:**
- Usuario presenta credencial → sistema valida con base de datos
- Sistema autoriza/deniega y controla cerradura
- Todos los eventos se registran para auditoría

**Flujo de Datos:**
1. Usuario coloca huella o presenta RFID
2. Lector publica datos biométricos
3. Sistema valida contra base de datos
4. Si autorizado → publica comando abrir
5. Cerradura se abre y publica confirmación
6. Sistema registra evento de entrada
7. Si múltiples intentos fallidos → publica alerta

---

### Proyecto #17: Gestión de Cadena de Frío

**Descripción:** Sensores en camiones frigoríficos que alertan si la temperatura sube durante el transporte.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de temperatura con registro de datos
- Sensor de humedad
- GPS en camión
- Gateway con conectividad celular

**Topics MQTT:**
- `industrial/cadenafrio/{camion_id}/sensor/temperatura` - Publica: Temperatura actual (°C)
- `industrial/cadenafrio/{camion_id}/sensor/humedad` - Publica: Humedad relativa (%)
- `industrial/cadenafrio/{camion_id}/sensor/ubicacion` - Publica: GPS del camión
- `industrial/cadenafrio/{camion_id}/config/umbral` - Subscribe: Configurar temperatura objetivo
- `industrial/cadenafrio/{camion_id}/alerta/temperatura_alta` - Publica: Alerta si T >umbral
- `industrial/cadenafrio/{camion_id}/alerta/temperatura_baja` - Publica: Alerta si T <umbral
- `industrial/cadenafrio/{camion_id}/historial/datos` - Publica: Log completo de temperatura
- `industrial/cadenafrio/{camion_id}/estado/certificacion` - Publica: Estado de certificación (OK/fallo)
- `industrial/cadenafrio/central/monitoreo` - Publica: Resumen de todos los camiones

**Comunicación Bidireccional:**
- Sensor publica temperatura continuamente
- Si se sale de rango → alerta inmediata a logística
- Sistema genera certificado de cadena de frío al finalizar

**Flujo de Datos:**
1. Sensor publica temperatura cada minuto
2. Sistema compara con umbral configurado
3. Si fuera de rango → publica alerta crítica
4. Logística recibe notificación inmediata
5. GPS permite rastrear ubicación del problema
6. Al finalizar viaje → genera certificado con historial completo

---

### Proyecto #18: Medidor de Consumo Energético Industrial

**Descripción:** Dashboard que muestra el gasto eléctrico por máquina en tiempo real.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Medidor de energía (smart meter) por máquina
- Sensor de corriente (clamp meter)
- Gateway para agregación de datos
- Display opcional en planta

**Topics MQTT:**
- `industrial/energia/{maquina_id}/sensor/potencia` - Publica: Potencia instantánea (kW)
- `industrial/energia/{maquina_id}/sensor/corriente` - Publica: Corriente (A)
- `industrial/energia/{maquina_id}/sensor/voltaje` - Publica: Voltaje (V)
- `industrial/energia/{maquina_id}/consumo/acumulado` - Publica: Energía total (kWh)
- `industrial/energia/{maquina_id}/costo/estimado` - Publica: Costo estimado en tiempo real
- `industrial/energia/{maquina_id}/alerta/consumo_alto` - Publica: Alerta si consumo >umbral
- `industrial/energia/zona/{id}/total` - Publica: Consumo agregado por zona
- `industrial/energia/planta/total` - Publica: Consumo total de la planta
- `industrial/energia/{maquina_id}/config/umbral` - Subscribe: Configurar umbral de alerta
- `industrial/energia/reportes/diario` - Publica: Reporte diario de consumo

**Comunicación Bidireccional:**
- Medidores publican consumo en tiempo real
- Dashboard agrega datos y calcula costos
- Sistema puede alertar sobre consumos anómalos

**Flujo de Datos:**
1. Medidor publica potencia cada 5 segundos
2. Sistema calcula consumo acumulado
3. Multiplica por tarifa eléctrica → calcula costo
4. Agrega datos por zona y planta total
5. Si consumo >umbral → publica alerta
6. Dashboard muestra gráficos en tiempo real

---

### Proyecto #19: Detector de Fugas de Gas

**Descripción:** Sensores distribuidos que cierran llaves de paso principales ante fugas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de gas (metano/propano) distribuido
- Válvula de cierre automático
- Sirena de alerta
- Ventilador de extracción

**Topics MQTT:**
- `industrial/gas/{sensor_id}/sensor/concentracion` - Publica: Concentración de gas (ppm)
- `industrial/gas/{sensor_id}/sensor/tipo` - Publica: Tipo de gas detectado
- `industrial/gas/{sensor_id}/alerta/fuga` - Publica: Alerta cuando concentración >umbral
- `industrial/gas/{valvula_id}/control/estado` - Publica: Estado (abierta/cerrada)
- `industrial/gas/{valvula_id}/control/cerrar` - Subscribe: Comando de cierre de emergencia
- `industrial/gas/{sirena_id}/control/set` - Subscribe: Activar/desactivar sirena
- `industrial/gas/{ventilador_id}/control/set` - Subscribe: Activar ventilación
- `industrial/gas/{sensor_id}/config/umbral` - Subscribe: Configurar umbral de alerta
- `industrial/gas/central/emergencia` - Publica: Alerta general de emergencia
- `industrial/gas/{sensor_id}/estado/sensor` - Publica: Estado del sensor (OK/fallo)

**Comunicación Bidireccional:**
- Sensor detecta fuga → activa válvula automáticamente
- Sistema activa sirena y ventilación
- Operador puede cerrar válvulas manualmente

**Flujo de Datos:**
1. Sensor publica concentración cada segundo
2. Si concentración >umbral crítico → publica alerta
3. Sistema automático subscribe y cierra válvula principal
4. Activa sirena y ventilación
5. Publica alerta general de emergencia
6. Operador recibe notificación inmediata

---

### Proyecto #20: Silo de Granos Automatizado

**Descripción:** Control de humedad y temperatura interna para evitar fermentación del grano.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de humedad del grano
- Sensor de temperatura (múltiples puntos)
- Ventilador de aireación
- Calefactor/refrigerador según necesidad

**Topics MQTT:**
- `industrial/silo/{id}/sensor/humedad` - Publica: Humedad del grano (%)
- `industrial/silo/{id}/sensor/temperatura` - Publica: Temperatura en diferentes puntos
- `industrial/silo/{id}/sensor/presion` - Publica: Presión interna (para detectar compactación)
- `industrial/silo/{id}/ventilador/estado` - Publica: Estado (encendido/apagado)
- `industrial/silo/{id}/ventilador/set` - Subscribe: Comando encender/apagar
- `industrial/silo/{id}/climatizacion/set` - Subscribe: Control de calefacción/refrigeración
- `industrial/silo/{id}/config/objetivo` - Subscribe: Configurar humedad y temperatura objetivo
- `industrial/silo/{id}/alerta/fermentacion` - Publica: Alerta si condiciones favorecen fermentación
- `industrial/silo/{id}/alerta/compactacion` - Publica: Alerta de presión alta
- `industrial/silo/{id}/historial/datos` - Publica: Historial de condiciones

**Comunicación Bidireccional:**
- Sensores publican condiciones continuamente
- Sistema activa ventilación/climatización automáticamente
- Operador puede ajustar objetivos y controlar manualmente

**Flujo de Datos:**
1. Sensores publican humedad y temperatura cada 10 minutos
2. Sistema compara con objetivos configurados
3. Si humedad alta → activa ventilación
4. Si temperatura alta → activa refrigeración
5. Si detecta riesgo de fermentación → publica alerta
6. Sistema registra historial para análisis

---

## 🏥 CATEGORÍA: HEALTHCARE (Proyectos 21-30)

### Proyecto #21: Dispensador de Pastillas Inteligente

**Descripción:** Libera dosis a horas exactas y notifica a familiares si no se retira.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Dispensador con compartimentos programables
- Sensor de peso para detectar retiro de pastillas
- Display LCD para recordatorios
- Botón de confirmación

**Topics MQTT:**
- `healthcare/dispensador/{id}/programa/dosis` - Subscribe: Programar dosis (hora, medicamento, cantidad)
- `healthcare/dispensador/{id}/alerta/hora` - Publica: Alerta cuando es hora de tomar medicamento
- `healthcare/dispensador/{id}/sensor/retiro` - Publica: Detecta cuando se retira pastilla
- `healthcare/dispensador/{id}/estado/dosis` - Publica: Estado de cada dosis (pendiente/retirada/omitida)
- `healthcare/dispensador/{id}/alerta/omitida` - Publica: Alerta si dosis no se retira en 30 min
- `healthcare/dispensador/{id}/notificacion/familiar` - Publica: Notificación a familiares vía app
- `healthcare/dispensador/{id}/inventario/stock` - Publica: Stock restante por medicamento
- `healthcare/dispensador/{id}/alerta/stock_bajo` - Publica: Alerta cuando stock <umbral
- `healthcare/dispensador/{id}/historial/uso` - Publica: Historial de tomas

**Comunicación Bidireccional:**
- Familiar programa dosis desde app móvil
- Dispensador notifica cuando es hora y si se omite
- Sistema alerta a familiares si paciente no toma medicamento

**Flujo de Datos:**
1. Familiar programa dosis desde app → subscribe a programa
2. Dispensador publica alerta a hora programada
3. Si paciente retira → sensor detecta y publica confirmación
4. Si no retira en 30 min → publica alerta a familiares
5. Sistema registra historial de cumplimiento

---

### Proyecto #22: Cama de Hospital Inteligente

**Descripción:** Detecta si el paciente se levanta o si hay humedad (incontinencia).

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensores de presión distribuidos en colchón
- Sensor de humedad
- Sensor de inclinación de cama
- Actuador para ajuste automático

**Topics MQTT:**
- `healthcare/cama/{id}/sensor/presion` - Publica: Mapa de presión (detecta posición del paciente)
- `healthcare/cama/{id}/sensor/movimiento` - Publica: Detecta si paciente se levanta
- `healthcare/cama/{id}/sensor/humedad` - Publica: Detecta humedad (incontinencia)
- `healthcare/cama/{id}/sensor/inclinacion` - Publica: Ángulo de inclinación de cama
- `healthcare/cama/{id}/alerta/levantarse` - Publica: Alerta cuando paciente se levanta
- `healthcare/cama/{id}/alerta/incontinencia` - Publica: Alerta de humedad detectada
- `healthcare/cama/{id}/control/ajuste` - Subscribe: Comando para ajustar inclinación
- `healthcare/cama/{id}/control/posicion` - Subscribe: Cambiar a posición predefinida
- `healthcare/cama/{id}/notificacion/enfermera` - Publica: Notificación a enfermera
- `healthcare/cama/{id}/estadisticas/descanso` - Publica: Análisis de calidad de descanso

**Comunicación Bidireccional:**
- Sensores detectan eventos → alertan a enfermeras
- Enfermera puede ajustar cama remotamente
- Sistema analiza patrones de movimiento

**Flujo de Datos:**
1. Sensores publican datos cada segundo
2. Si detecta levantarse → publica alerta inmediata
3. Si detecta humedad → publica alerta a enfermera
4. Enfermera puede ajustar cama desde dashboard
5. Sistema analiza patrones de movimiento para prevenir úlceras

---

### Proyecto #23: Monitor de Bebé Avanzado

**Descripción:** Analiza el llanto y monitorea respiración/temperatura, alertando al móvil.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Micrófono para análisis de llanto
- Sensor de respiración (movimiento del pecho)
- Sensor de temperatura corporal
- Cámara opcional con visión nocturna

**Topics MQTT:**
- `healthcare/bebe/{id}/audio/llanto` - Publica: Detecta llanto con análisis de intensidad
- `healthcare/bebe/{id}/audio/tipo` - Publica: Tipo de llanto (hambre/sueño/malestar)
- `healthcare/bebe/{id}/sensor/respiracion` - Publica: Ritmo respiratorio (rpm)
- `healthcare/bebe/{id}/sensor/temperatura` - Publica: Temperatura corporal (°C)
- `healthcare/bebe/{id}/sensor/movimiento` - Publica: Detección de movimiento
- `healthcare/bebe/{id}/alerta/respiracion_anormal` - Publica: Alerta si respiración fuera de rango
- `healthcare/bebe/{id}/alerta/temperatura_alta` - Publica: Alerta de fiebre
- `healthcare/bebe/{id}/alerta/ausencia_movimiento` - Publica: Alerta si no hay movimiento prolongado
- `healthcare/bebe/{id}/notificacion/padres` - Publica: Notificación push a app móvil
- `healthcare/bebe/{id}/config/umbrales` - Subscribe: Configurar umbrales de alerta
- `healthcare/bebe/{id}/historial/datos` - Publica: Historial de monitoreo

**Comunicación Bidireccional:**
- Sensores monitorean continuamente → alertan a padres
- Padres pueden configurar sensibilidad desde app
- Sistema aprende patrones normales del bebé

**Flujo de Datos:**
1. Sensores publican datos cada 5 segundos
2. Sistema analiza llanto y clasifica tipo
3. Si detecta anomalía en respiración → alerta inmediata
4. Si temperatura >umbral → alerta de fiebre
5. Notificación push a app móvil de padres
6. Sistema aprende patrones normales para reducir falsas alarmas

---

### Proyecto #24: Rehabilitación con Sensores

**Descripción:** Guante con giroscopios que gamifica ejercicios de recuperación de mano.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Guante con sensores IMU (giroscopio, acelerómetro)
- Sensores de flexión en dedos
- Gateway Bluetooth/WiFi
- App móvil o tablet para visualización

**Topics MQTT:**
- `healthcare/rehab/{paciente_id}/sensor/movimiento` - Publica: Datos de movimiento de mano
- `healthcare/rehab/{paciente_id}/sensor/flexion` - Publica: Ángulo de flexión por dedo
- `healthcare/rehab/{paciente_id}/ejercicio/activo` - Publica: Ejercicio actual en ejecución
- `healthcare/rehab/{paciente_id}/ejercicio/progreso` - Publica: Progreso del ejercicio (%)
- `healthcare/rehab/{paciente_id}/ejercicio/completado` - Publica: Ejercicio completado exitosamente
- `healthcare/rehab/{paciente_id}/ejercicio/programar` - Subscribe: Programar nuevo ejercicio
- `healthcare/rehab/{paciente_id}/gamificacion/puntos` - Publica: Puntos ganados por ejercicio
- `healthcare/rehab/{paciente_id}/gamificacion/nivel` - Publica: Nivel alcanzado
- `healthcare/rehab/{paciente_id}/terapeuta/reporte` - Publica: Reporte de progreso para terapeuta
- `healthcare/rehab/{paciente_id}/config/rutina` - Subscribe: Configurar rutina de ejercicios

**Comunicación Bidireccional:**
- Terapeuta programa ejercicios desde dashboard
- Guante publica datos de movimiento en tiempo real
- Sistema gamifica y motiva al paciente
- Terapeuta recibe reportes de progreso

**Flujo de Datos:**
1. Terapeuta programa ejercicio → subscribe a programar
2. Paciente inicia ejercicio con guante
3. Sensores publican movimiento en tiempo real
4. Sistema compara con movimiento objetivo
5. Si completa correctamente → publica puntos y progreso
6. Terapeuta recibe reporte de sesión

---

### Proyecto #25: Refrigerador de Vacunas

**Descripción:** Control estricto de temperatura con batería de respaldo y alertas críticas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de temperatura de alta precisión
- Sensor de humedad
- Batería de respaldo con monitor
- Sistema de alarma sonora y visual

**Topics MQTT:**
- `healthcare/vacunas/{refrigerador_id}/sensor/temperatura` - Publica: Temperatura actual (°C)
- `healthcare/vacunas/{refrigerador_id}/sensor/humedad` - Publica: Humedad relativa (%)
- `healthcare/vacunas/{refrigerador_id}/sensor/bateria` - Publica: Nivel de batería (%)
- `healthcare/vacunas/{refrigerador_id}/config/rango` - Subscribe: Configurar rango de temperatura objetivo
- `healthcare/vacunas/{refrigerador_id}/alerta/temperatura_fuera_rango` - Publica: Alerta crítica si T fuera de rango
- `healthcare/vacunas/{refrigerador_id}/alerta/bateria_baja` - Publica: Alerta si batería <20%
- `healthcare/vacunas/{refrigerador_id}/alerta/corte_energia` - Publica: Alerta de corte de energía
- `healthcare/vacunas/{refrigerador_id}/certificacion/estado` - Publica: Estado de certificación (OK/fallo)
- `healthcare/vacunas/{refrigerador_id}/historial/temperatura` - Publica: Historial completo de temperatura
- `healthcare/vacunas/{refrigerador_id}/notificacion/critica` - Publica: Notificación a personal responsable

**Comunicación Bidireccional:**
- Sensor publica temperatura cada minuto
- Si fuera de rango → alerta crítica inmediata
- Sistema genera certificado de cadena de frío
- Personal recibe notificaciones push

**Flujo de Datos:**
1. Sensor publica temperatura cada minuto
2. Si temperatura fuera de rango → publica alerta crítica
3. Si corte de energía → activa batería y publica alerta
4. Sistema registra historial continuo
5. Al finalizar día → genera certificado de cumplimiento
6. Personal recibe notificación inmediata en caso crítico

---

### Proyecto #26: Bastón para Ciegos Conectado

**Descripción:** Detecta obstáculos con ultrasonido y avisa a cuidadores botón de pánico.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor ultrasónico para detección de obstáculos
- Vibrador háptico para feedback
- Botón de pánico
- GPS para ubicación
- Gateway con conectividad celular

**Topics MQTT:**
- `healthcare/baston/{id}/sensor/obstaculo` - Publica: Detecta obstáculo con distancia
- `healthcare/baston/{id}/sensor/direccion` - Publica: Dirección del obstáculo (izquierda/derecha/frente)
- `healthcare/baston/{id}/vibrador/activar` - Subscribe: Comando para activar vibración
- `healthcare/baston/{id}/panico/presionado` - Publica: Botón de pánico presionado
- `healthcare/baston/{id}/ubicacion/gps` - Publica: Ubicación GPS en tiempo real
- `healthcare/baston/{id}/alerta/caida` - Publica: Detecta posible caída (acelerómetro)
- `healthcare/baston/{id}/notificacion/cuidador` - Publica: Notificación a cuidador
- `healthcare/baston/{id}/estado/bateria` - Publica: Nivel de batería
- `healthcare/baston/{id}/config/sensibilidad` - Subscribe: Ajustar sensibilidad de detección

**Comunicación Bidireccional:**
- Bastón detecta obstáculo → vibra para alertar usuario
- Si presiona pánico → alerta inmediata a cuidador con ubicación
- Cuidador puede rastrear ubicación en tiempo real

**Flujo de Datos:**
1. Sensor ultrasónico publica distancia a obstáculo cada segundo
2. Si obstáculo <1m → activa vibración
3. Si usuario presiona pánico → publica alerta con GPS
4. Cuidador recibe notificación con ubicación exacta
5. Sistema puede detectar caída por acelerómetro

---

### Proyecto #27: Sistema de Llamada a Enfermería

**Descripción:** Botones en habitaciones que priorizan urgencias en el smartwatch de enfermeras.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Botonera en habitación (normal/urgente/emergencia)
- Display en habitación mostrando estado
- Smartwatch de enfermera
- Sistema de priorización central

**Topics MQTT:**
- `healthcare/llamada/{habitacion_id}/boton/presionado` - Publica: Botón presionado (tipo + timestamp)
- `healthcare/llamada/{habitacion_id}/prioridad` - Publica: Nivel de prioridad (normal/urgente/emergencia)
- `healthcare/llamada/{habitacion_id}/estado` - Publica: Estado (pendiente/atendiendo/resuelta)
- `healthcare/llamada/{habitacion_id}/enfermera/asignada` - Publica: ID de enfermera asignada
- `healthcare/llamada/enfermera/{id}/notificacion` - Subscribe: Notificación a smartwatch de enfermera
- `healthcare/llamada/enfermera/{id}/ubicacion` - Publica: Ubicación de enfermera (para asignación)
- `healthcare/llamada/{habitacion_id}/resolver` - Subscribe: Marcar llamada como resuelta
- `healthcare/llamada/central/cola` - Publica: Cola de llamadas ordenada por prioridad
- `healthcare/llamada/{habitacion_id}/tiempo_espera` - Publica: Tiempo de espera desde llamada

**Comunicación Bidireccional:**
- Paciente presiona botón → sistema prioriza y asigna enfermera
- Enfermera recibe notificación en smartwatch
- Sistema optimiza asignación según ubicación y carga de trabajo

**Flujo de Datos:**
1. Paciente presiona botón → publica llamada con prioridad
2. Sistema agrega a cola priorizada
3. Asigna enfermera más cercana disponible
4. Enfermera recibe notificación en smartwatch
5. Al llegar, marca como atendiendo
6. Al resolver, marca como resuelta

---

### Proyecto #28: Control de Aforo en Salas de Espera

**Descripción:** Conteo de personas para mantener distancia social y ventilación.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Cámara con visión artificial o sensores de presencia
- Contador de personas
- Display mostrando aforo actual
- Sistema de ventilación automática

**Topics MQTT:**
- `healthcare/aforo/{sala_id}/sensor/personas` - Publica: Número de personas detectadas
- `healthcare/aforo/{sala_id}/config/capacidad` - Subscribe: Configurar capacidad máxima
- `healthcare/aforo/{sala_id}/estado/disponibilidad` - Publica: Espacios disponibles
- `healthcare/aforo/{sala_id}/alerta/capacidad_maxima` - Publica: Alerta cuando alcanza capacidad
- `healthcare/aforo/{sala_id}/display/actualizar` - Subscribe: Actualizar display con aforo
- `healthcare/aforo/{sala_id}/ventilacion/activar` - Subscribe: Activar ventilación forzada
- `healthcare/aforo/{sala_id}/ventilacion/estado` - Publica: Estado de ventilación
- `healthcare/aforo/{sala_id}/estadisticas/historial` - Publica: Historial de ocupación por hora

**Comunicación Bidireccional:**
- Sensor cuenta personas continuamente
- Si alcanza capacidad → alerta y activa ventilación
- Display muestra información en tiempo real

**Flujo de Datos:**
1. Sensor publica conteo cada 10 segundos
2. Sistema calcula disponibilidad
3. Actualiza display automáticamente
4. Si alcanza capacidad → publica alerta
5. Activa ventilación forzada automáticamente
6. Registra estadísticas para análisis

---

### Proyecto #29: Chaleco de Seguridad para Obra

**Descripción:** Detecta caídas, golpes de calor y ritmo cardíaco de trabajadores.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Chaleco con sensores integrados
- Acelerómetro para detección de caídas
- Sensor de temperatura corporal
- Monitor de ritmo cardíaco
- Botón de pánico
- GPS para ubicación

**Topics MQTT:**
- `healthcare/chaleco/{trabajador_id}/sensor/caida` - Publica: Detecta caída (acelerómetro)
- `healthcare/chaleco/{trabajador_id}/sensor/temperatura` - Publica: Temperatura corporal (°C)
- `healthcare/chaleco/{trabajador_id}/sensor/ritmo_cardiaco` - Publica: Ritmo cardíaco (bpm)
- `healthcare/chaleco/{trabajador_id}/alerta/golpe_calor` - Publica: Alerta si temperatura >umbral
- `healthcare/chaleco/{trabajador_id}/alerta/ritmo_anormal` - Publica: Alerta si ritmo cardíaco anormal
- `healthcare/chaleco/{trabajador_id}/panico/presionado` - Publica: Botón de pánico
- `healthcare/chaleco/{trabajador_id}/ubicacion/gps` - Publica: Ubicación GPS
- `healthcare/chaleco/{trabajador_id}/notificacion/seguridad` - Publica: Notificación a equipo de seguridad
- `healthcare/chaleco/{trabajador_id}/estado/bateria` - Publica: Nivel de batería
- `healthcare/chaleco/central/monitoreo` - Publica: Resumen de todos los trabajadores

**Comunicación Bidireccional:**
- Sensores monitorean continuamente → alertan en caso de emergencia
- Equipo de seguridad recibe alertas con ubicación exacta
- Sistema puede detectar patrones de fatiga

**Flujo de Datos:**
1. Sensores publican datos cada 30 segundos
2. Si detecta caída → publica alerta inmediata con GPS
3. Si temperatura >umbral → alerta de golpe de calor
4. Si ritmo cardíaco anormal → alerta médica
5. Equipo de seguridad recibe notificación con ubicación
6. Sistema registra historial para análisis de salud

---

### Proyecto #30: Inodoro Inteligente

**Descripción:** Sensores básicos que analizan frecuencia y tiempo de uso para salud digestiva.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de presencia (peso o infrarrojo)
- Sensor de tiempo de uso
- Análisis básico opcional (pH, color - si se implementa)

**Topics MQTT:**
- `healthcare/inodoro/{id}/sensor/presencia` - Publica: Detecta uso (inicio/fin)
- `healthcare/inodoro/{id}/sensor/tiempo_uso` - Publica: Duración de uso
- `healthcare/inodoro/{id}/analisis/frecuencia` - Publica: Frecuencia de uso diaria
- `healthcare/inodoro/{id}/analisis/patron` - Publica: Patrón detectado (normal/anormal)
- `healthcare/inodoro/{id}/alerta/cambio_patron` - Publica: Alerta si detecta cambio significativo
- `healthcare/inodoro/{id}/privacidad/anonymizar` - Subscribe: Activar modo anónimo
- `healthcare/inodoro/{id}/reporte/semanal` - Publica: Reporte semanal de patrones
- `healthcare/inodoro/{id}/config/umbral` - Subscribe: Configurar umbrales de alerta

**Comunicación Bidireccional:**
- Sensor detecta uso y calcula patrones
- Sistema alerta si detecta cambios anormales
- Usuario puede consultar reportes desde app

**Flujo de Datos:**
1. Sensor detecta inicio de uso → publica timestamp
2. Al finalizar → publica duración
3. Sistema calcula frecuencia diaria
4. Compara con patrones históricos
5. Si detecta cambio significativo → publica alerta
6. Genera reporte semanal para usuario

---

## 🌱 CATEGORÍA: AGRICULTURE (Proyectos 31-40)

### Proyecto #31: Invernadero Automatizado

**Descripción:** Control total de ventanas, ventiladores, riego y luces UV según el clima.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensores de temperatura, humedad, luz
- Actuadores para ventanas (motor)
- Ventiladores controlados
- Sistema de riego con válvulas
- Luces UV/LED para crecimiento

**Topics MQTT:**
- `agriculture/invernadero/{id}/sensor/temperatura` - Publica: Temperatura ambiente
- `agriculture/invernadero/{id}/sensor/humedad` - Publica: Humedad relativa
- `agriculture/invernadero/{id}/sensor/luz` - Publica: Intensidad de luz
- `agriculture/invernadero/{id}/ventana/estado` - Publica: Estado (abierta/cerrada/parcial)
- `agriculture/invernadero/{id}/ventana/set` - Subscribe: Comando abrir/cerrar
- `agriculture/invernadero/{id}/ventilador/set` - Subscribe: Control de ventiladores
- `agriculture/invernadero/{id}/riego/activar` - Subscribe: Activar riego
- `agriculture/invernadero/{id}/luz/set` - Subscribe: Control de luces UV
- `agriculture/invernadero/{id}/config/objetivo` - Subscribe: Configurar objetivos de clima
- `agriculture/invernadero/{id}/control/automatico` - Subscribe: Activar/desactivar modo automático
- `agriculture/invernadero/{id}/alerta/condiciones` - Publica: Alerta si condiciones fuera de rango

**Comunicación Bidireccional:**
- Sensores publican condiciones → sistema ajusta automáticamente
- Agricultor puede controlar manualmente desde app
- Sistema aprende patrones óptimos

**Flujo de Datos:**
1. Sensores publican condiciones cada 5 minutos
2. Sistema compara con objetivos configurados
3. Si temperatura alta → abre ventanas y activa ventiladores
4. Si humedad baja → activa riego
5. Si luz baja → activa luces UV
6. Agricultor puede override manual

---

### Proyecto #32: Comedero de Ganado Automático

**Descripción:** Dispensa alimento según el RFID del animal y registra su consumo.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Lector RFID en comedero
- Dispensador de alimento controlado
- Báscula para pesar alimento dispensado
- Gateway para registro de datos

**Topics MQTT:**
- `agriculture/comedero/{id}/rfid/detectado` - Publica: ID del animal detectado
- `agriculture/comedero/{id}/alimento/dispensar` - Subscribe: Comando dispensar (cantidad)
- `agriculture/comedero/{id}/sensor/peso` - Publica: Peso de alimento dispensado
- `agriculture/comedero/{id}/consumo/registro` - Publica: Registro de consumo (animal, cantidad, timestamp)
- `agriculture/comedero/{id}/config/racion` - Subscribe: Configurar ración por animal
- `agriculture/comedero/{id}/alerta/stock_bajo` - Publica: Alerta si stock de alimento bajo
- `agriculture/comedero/{id}/alerta/animal_no_autorizado` - Publica: Animal no registrado
- `agriculture/comedero/{id}/estadisticas/consumo` - Publica: Estadísticas de consumo por animal
- `agriculture/ganado/{animal_id}/historial/alimentacion` - Publica: Historial de alimentación

**Comunicación Bidireccional:**
- Animal se acerca → RFID detecta → sistema consulta ración
- Sistema dispensa cantidad correcta automáticamente
- Registra consumo para análisis

**Flujo de Datos:**
1. Animal se acerca → RFID detecta y publica ID
2. Sistema consulta ración configurada para ese animal
3. Publica comando dispensar con cantidad
4. Dispensador ejecuta y publica peso real
5. Registra consumo con timestamp
6. Genera estadísticas de consumo diario

---

### Proyecto #33: Drone de Monitoreo de Cultivos

**Descripción:** Estación base que recibe datos de vuelo y estado de plantas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Drone con cámara multiespectral
- GPS en drone
- Estación base con gateway
- Sistema de procesamiento de imágenes

**Topics MQTT:**
- `agriculture/drone/{id}/vuelo/estado` - Publica: Estado (despegando/vuelo/aterrizando)
- `agriculture/drone/{id}/vuelo/ubicacion` - Publica: GPS del drone
- `agriculture/drone/{id}/vuelo/altitud` - Publica: Altitud actual
- `agriculture/drone/{id}/vuelo/bateria` - Publica: Nivel de batería
- `agriculture/drone/{id}/vuelo/comando` - Subscribe: Comandos de vuelo (despegar/aterrizar/ruta)
- `agriculture/drone/{id}/camara/imagen` - Publica: Imágenes capturadas (referencia)
- `agriculture/drone/{id}/analisis/salud_cultivo` - Publica: Análisis de salud (NDVI, estrés hídrico)
- `agriculture/drone/{id}/analisis/plagas` - Publica: Detección de plagas o enfermedades
- `agriculture/drone/{id}/ruta/programar` - Subscribe: Programar ruta de vuelo
- `agriculture/drone/{id}/alerta/emergencia` - Publica: Alerta de emergencia (batería baja, viento fuerte)

**Comunicación Bidireccional:**
- Agricultor programa ruta desde dashboard
- Drone publica datos de vuelo en tiempo real
- Sistema procesa imágenes y detecta problemas
- Agricultor recibe alertas de plagas o estrés

**Flujo de Datos:**
1. Agricultor programa ruta → subscribe a programar
2. Drone despega y publica estado
3. Durante vuelo → publica ubicación y captura imágenes
4. Sistema procesa imágenes y calcula índices de salud
5. Si detecta problema → publica alerta
6. Al finalizar → genera mapa de salud del cultivo

---

### Proyecto #34: Sistema de Acuaponía

**Descripción:** Control del ciclo del agua entre peceras y plantas hidropónicas.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensores de calidad de agua (pH, oxígeno, amoníaco)
- Bomba de agua controlada
- Sensor de nivel en tanques
- Sistema de filtración

**Topics MQTT:**
- `agriculture/acuaponia/{id}/sensor/ph` - Publica: Nivel de pH del agua
- `agriculture/acuaponia/{id}/sensor/oxigeno` - Publica: Nivel de oxígeno disuelto
- `agriculture/acuaponia/{id}/sensor/amoniaco` - Publica: Nivel de amoníaco
- `agriculture/acuaponia/{id}/sensor/nivel` - Publica: Nivel de agua en tanques
- `agriculture/acuaponia/{id}/bomba/estado` - Publica: Estado de bomba (encendida/apagada)
- `agriculture/acuaponia/{id}/bomba/set` - Subscribe: Control de bomba
- `agriculture/acuaponia/{id}/filtro/activar` - Subscribe: Activar sistema de filtración
- `agriculture/acuaponia/{id}/config/objetivo` - Subscribe: Configurar objetivos de calidad
- `agriculture/acuaponia/{id}/alerta/calidad_agua` - Publica: Alerta si calidad fuera de rango
- `agriculture/acuaponia/{id}/ciclo/estado` - Publica: Estado del ciclo (bombeo/filtrado/reposo)

**Comunicación Bidireccional:**
- Sensores publican calidad de agua → sistema ajusta ciclo
- Sistema activa bomba y filtración automáticamente
- Operador puede controlar manualmente

**Flujo de Datos:**
1. Sensores publican calidad de agua cada 10 minutos
2. Si pH fuera de rango → publica alerta
3. Sistema activa bomba para circular agua
4. Activa filtración si amoníaco alto
5. Registra ciclo completo para optimización

---

### Proyecto #35: Espantapájaros Láser Sonoro

**Descripción:** Detecta movimiento de aves y activa disuasivos sin dañar a los animales.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de movimiento (PIR o cámara)
- Láser direccional controlado
- Altavoz para sonidos disuasivos
- Sistema de reconocimiento de aves (opcional)

**Topics MQTT:**
- `agriculture/espantapajaros/{id}/sensor/movimiento` - Publica: Detecta movimiento de aves
- `agriculture/espantapajaros/{id}/sensor/tipo_ave` - Publica: Tipo de ave detectada (si aplica)
- `agriculture/espantapajaros/{id}/laser/activar` - Subscribe: Activar láser direccional
- `agriculture/espantapajaros/{id}/sonido/reproducir` - Subscribe: Reproducir sonido disuasivo
- `agriculture/espantapajaros/{id}/control/automatico` - Subscribe: Activar/desactivar modo automático
- `agriculture/espantapajaros/{id}/config/patron` - Subscribe: Configurar patrón de disuasión
- `agriculture/espantapajaros/{id}/estadisticas/actividad` - Publica: Estadísticas de aves detectadas
- `agriculture/espantapajaros/{id}/alerta/efectividad` - Publica: Efectividad del sistema

**Comunicación Bidireccional:**
- Sensor detecta aves → activa disuasivos automáticamente
- Sistema aprende patrones de aves para mejorar efectividad
- Agricultor puede ajustar sensibilidad

**Flujo de Datos:**
1. Sensor detecta movimiento → publica evento
2. Sistema activa láser y sonido automáticamente
3. Si aves persisten → intensifica disuasivos
4. Registra efectividad para análisis
5. Aprende horarios de mayor actividad

---

### Proyecto #36: Estación Meteorológica Local

**Descripción:** Mide viento, lluvia y UV para automatizar toldos y riegos de la zona.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Anemómetro (velocidad y dirección del viento)
- Pluviómetro (cantidad de lluvia)
- Sensor UV
- Sensor de temperatura y humedad
- Gateway para agregación

**Topics MQTT:**
- `agriculture/meteo/{id}/sensor/viento_velocidad` - Publica: Velocidad del viento (km/h)
- `agriculture/meteo/{id}/sensor/viento_direccion` - Publica: Dirección del viento
- `agriculture/meteo/{id}/sensor/lluvia` - Publica: Cantidad de lluvia (mm)
- `agriculture/meteo/{id}/sensor/uv` - Publica: Índice UV
- `agriculture/meteo/{id}/sensor/temperatura` - Publica: Temperatura
- `agriculture/meteo/{id}/sensor/humedad` - Publica: Humedad relativa
- `agriculture/meteo/{id}/pronostico/local` - Publica: Pronóstico basado en datos locales
- `agriculture/meteo/{id}/toldo/activar` - Subscribe: Comando para toldos (basado en UV)
- `agriculture/meteo/{id}/riego/cancelar` - Subscribe: Cancelar riego si llueve
- `agriculture/meteo/{id}/alerta/temporal` - Publica: Alerta de condiciones extremas

**Comunicación Bidireccional:**
- Estación publica datos meteorológicos
- Sistemas de riego y toldos subscribe y se ajustan automáticamente
- Agricultor recibe alertas de condiciones extremas

**Flujo de Datos:**
1. Sensores publican datos cada 5 minutos
2. Si detecta lluvia → publica comando cancelar riego
3. Si UV alto → publica comando activar toldos
4. Si viento fuerte → publica alerta de temporal
5. Genera pronóstico local basado en tendencias

---

### Proyecto #37: Monitor de Colmenas

**Descripción:** Mide peso (producción de miel) y zumbido (salud de la reina) en apiarios.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Báscula bajo colmena
- Micrófono para análisis de zumbido
- Sensor de temperatura interna
- Sensor de humedad

**Topics MQTT:**
- `agriculture/colmena/{id}/sensor/peso` - Publica: Peso de la colmena (kg)
- `agriculture/colmena/{id}/sensor/produccion` - Publica: Producción estimada de miel
- `agriculture/colmena/{id}/sensor/zumbido` - Publica: Análisis de frecuencia de zumbido
- `agriculture/colmena/{id}/sensor/temperatura` - Publica: Temperatura interna
- `agriculture/colmena/{id}/sensor/humedad` - Publica: Humedad interna
- `agriculture/colmena/{id}/analisis/salud_reina` - Publica: Estado de salud de la reina (basado en zumbido)
- `agriculture/colmena/{id}/alerta/enjambre` - Publica: Alerta de posible enjambrazón
- `agriculture/colmena/{id}/alerta/produccion_baja` - Publica: Alerta si producción baja
- `agriculture/colmena/{id}/historial/tendencias` - Publica: Tendencias de producción y salud

**Comunicación Bidireccional:**
- Sensores publican datos continuamente
- Sistema analiza patrones de zumbido para detectar problemas
- Apicultor recibe alertas de salud de colmena

**Flujo de Datos:**
1. Báscula publica peso cada hora
2. Calcula producción de miel (diferencia de peso)
3. Micrófono analiza zumbido → detecta frecuencia característica de reina
4. Si zumbido anormal → alerta de problema con reina
5. Si peso baja rápidamente → alerta de posible enjambrazón
6. Genera reporte de salud semanal

---

### Proyecto #38: Control de Heladas

**Descripción:** Activa aspersores o calefactores en frutales cuando la temperatura baja de 0°C.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de temperatura en árboles
- Sensor de humedad del suelo
- Aspersores controlados
- Calefactores/estufas controladas

**Topics MQTT:**
- `agriculture/heladas/{zona_id}/sensor/temperatura` - Publica: Temperatura actual
- `agriculture/heladas/{zona_id}/sensor/humedad_suelo` - Publica: Humedad del suelo
- `agriculture/heladas/{zona_id}/alerta/helada_inminente` - Publica: Alerta si T <2°C y bajando
- `agriculture/heladas/{zona_id}/aspersor/activar` - Subscribe: Activar aspersores
- `agriculture/heladas/{zona_id}/calefactor/activar` - Subscribe: Activar calefactores
- `agriculture/heladas/{zona_id}/control/automatico` - Subscribe: Activar modo automático
- `agriculture/heladas/{zona_id}/config/umbral` - Subscribe: Configurar temperatura de activación
- `agriculture/heladas/{zona_id}/estado/proteccion` - Publica: Estado de sistemas de protección
- `agriculture/heladas/{zona_id}/consumo/agua` - Publica: Consumo de agua por sesión

**Comunicación Bidireccional:**
- Sensor detecta temperatura baja → activa protección automáticamente
- Sistema puede usar aspersores (agua se congela y protege) o calefactores
- Agricultor recibe alertas y puede controlar manualmente

**Flujo de Datos:**
1. Sensor publica temperatura cada minuto
2. Si temperatura <2°C y bajando → publica alerta
3. Sistema activa aspersores o calefactores automáticamente
4. Monitorea temperatura durante protección
5. Cuando temperatura sube → desactiva sistemas
6. Registra consumo y efectividad

---

### Proyecto #39: Rastreo de Ganado GPS

**Descripción:** Collares que definen un "cerco virtual" y alertan si un animal sale de la zona.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Collar GPS con batería de larga duración
- Gateway LoRaWAN para comunicación
- Sistema de geocercas (cercas virtuales)

**Topics MQTT:**
- `agriculture/ganado/{animal_id}/ubicacion/gps` - Publica: Coordenadas GPS del animal
- `agriculture/ganado/{animal_id}/sensor/bateria` - Publica: Nivel de batería del collar
- `agriculture/ganado/{animal_id}/sensor/actividad` - Publica: Nivel de actividad (acelerómetro)
- `agriculture/ganado/{animal_id}/geocerca/configurar` - Subscribe: Definir zona permitida
- `agriculture/ganado/{animal_id}/alerta/fuera_zona` - Publica: Alerta si animal sale de geocerca
- `agriculture/ganado/{animal_id}/alerta/inactividad` - Publica: Alerta si animal muy quieto (posible problema)
- `agriculture/ganado/grupo/{id}/ubicaciones` - Publica: Ubicaciones de todo el rebaño
- `agriculture/ganado/{animal_id}/historial/ruta` - Publica: Historial de movimientos

**Comunicación Bidireccional:**
- Collar publica ubicación periódicamente
- Sistema verifica si está dentro de geocerca
- Si sale → alerta inmediata a ganadero
- Ganadero puede definir nuevas geocercas

**Flujo de Datos:**
1. Collar publica GPS cada 15 minutos (o más frecuente si se mueve rápido)
2. Sistema verifica si está dentro de geocerca configurada
3. Si sale → publica alerta inmediata con ubicación
4. Ganadero recibe notificación en app
5. Sistema puede detectar inactividad anormal (posible enfermedad)

---

### Proyecto #40: Gestión de Silvicultura

**Descripción:** Sensores de humo en bosques remotos para detección temprana de incendios.

**Plan de Implementación MQTT:**

**Dispositivos IoT:**
- Sensor de humo en árboles
- Sensor de temperatura
- Sensor de humedad del suelo
- Gateway con conectividad satelital/celular
- Panel solar para energía

**Topics MQTT:**
- `agriculture/silvicultura/{sensor_id}/sensor/humo` - Publica: Concentración de humo detectada
- `agriculture/silvicultura/{sensor_id}/sensor/temperatura` - Publica: Temperatura ambiente
- `agriculture/silvicultura/{sensor_id}/sensor/humedad_suelo` - Publica: Humedad del suelo
- `agriculture/silvicultura/{sensor_id}/alerta/incendio` - Publica: Alerta crítica de posible incendio
- `agriculture/silvicultura/{sensor_id}/ubicacion/gps` - Publica: Ubicación del sensor
- `agriculture/silvicultura/{sensor_id}/sensor/bateria` - Publica: Nivel de batería
- `agriculture/silvicultura/central/mapa_riesgo` - Publica: Mapa de riesgo de incendio
- `agriculture/silvicultura/{sensor_id}/config/sensibilidad` - Subscribe: Ajustar sensibilidad
- `agriculture/silvicultura/bomberos/alerta` - Publica: Alerta directa a bomberos con ubicación

**Comunicación Bidireccional:**
- Sensor detecta humo → alerta inmediata con ubicación
- Sistema agrega datos de múltiples sensores para triangulación
- Bomberos reciben alerta con coordenadas exactas

**Flujo de Datos:**
1. Sensor publica datos cada 5 minutos
2. Si detecta humo → publica alerta inmediata
3. Sistema triangula con sensores cercanos para ubicar origen
4. Publica alerta a bomberos con coordenadas GPS
5. Si temperatura alta + humedad baja → publica alerta de riesgo
6. Genera mapa de riesgo en tiempo real

---

*Continuará con las siguientes 10 propuestas (Retail 41-50)...*

