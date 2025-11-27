// Configuración de clientes MQTT
// Estructura para definir múltiples clientes con sus credenciales

const mqttConfig = {
  // Cliente para el proyecto Hogar
  client_hogar: {
    url: "wss://5fa060c50718458c97c7e3bd622628cd.s1.eu.hivemq.cloud:8884/mqtt",
    username: "bemtorres1A",
    password: "bemtorres1A",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },
  
  // Cliente para el proyecto Tren/Metro
  client_tren: {
    url: "wss://5fa060c50718458c97c7e3bd622628cd.s1.eu.hivemq.cloud:8884/mqtt",
    username: "bemtorres1A",
    password: "bemtorres1A",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  }
  
  // Puedes agregar más clientes aquí:
  // client_home: {
  //   url: "wss://tu-servidor-mqtt.com:8884/mqtt",
  //   username: "usuario",
  //   password: "contraseña",
  //   options: {
  //     clean: true,
  //     connectTimeout: 4000,
  //     reconnectPeriod: 1000
  //   }
  // }
};

// Función para crear un cliente MQTT desde la configuración
function createMqttClient(clientName) {
  const config = mqttConfig[clientName];
  
  if (!config) {
    throw new Error(`Cliente MQTT "${clientName}" no encontrado en la configuración`);
  }
  
  return mqtt.connect(config.url, {
    username: config.username,
    password: config.password,
    ...config.options
  });
}

// Crear instancias de clientes (opcional, para compatibilidad)
const client_hogar = createMqttClient('client_hogar');
const client_tren = createMqttClient('client_tren');
