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
  },

  // Cliente para el proyecto Arismendi Station (Estación de Metro Santiago)
  client_arismendi: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Cyber (Monitoreo de Ciber)
  client_cyber: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto SmartPost (Buzón Inteligente)
  client_oscar: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Batalla Naval (Valenzuela)
  client_valenzuela: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Duran (Seguridad de Celular)
  client_duran: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Acevedo Casino (Sistema de Monitoreo)
  client_acevedo: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Cristobal (Estación de Mascotas)
  client_cristobal: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Salgado (Tienda Inteligente)
  client_salgado: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Leonel (Monitoreo de Pacientes)
  client_leonel: {
    url: "wss://ea85403b34ed493fb528ace645709065.s1.eu.hivemq.cloud:8884/mqtt",
    username: "hivemq.webclient.1764265045956",
    password: "G6j53rvn$*xA8OS:gL#M",
    options: {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    }
  },

  // Cliente para el proyecto Card (Batalla del Oráculo)
  client_card: {
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
const client_arismendi = createMqttClient('client_arismendi');
const client_cyber = createMqttClient('client_cyber');
const client_oscar = createMqttClient('client_oscar');
const client_valenzuela = createMqttClient('client_valenzuela');
const client_duran = createMqttClient('client_duran');
const client_acevedo = createMqttClient('client_acevedo');
const client_cristobal = createMqttClient('client_cristobal');
const client_salgado = createMqttClient('client_salgado');
const client_leonel = createMqttClient('client_leonel');
const client_card = createMqttClient('client_card');





