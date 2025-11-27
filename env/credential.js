// Configuración de clientes MQTT
// Estructura para definir múltiples clientes con sus credenciales

const mqttConfig = {
  // Cliente para el proyecto Hogar
  client_hogar: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },
  
  // Cliente para el proyecto Tren/Metro
  client_tren: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },
  
  // Cliente para el proyecto Delivery
  client_delivery: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },
  
  // Cliente para el proyecto IONU (Monitoreo Institucional)
  client_ionu: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
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
const client_delivery = createMqttClient('client_delivery');
const client_ionu = createMqttClient('client_ionu');
