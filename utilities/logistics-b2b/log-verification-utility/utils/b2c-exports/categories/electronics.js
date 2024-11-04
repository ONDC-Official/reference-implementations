const { COLOUR } = require('./fashionEnum')


 const electronicsData = {
  'RET14-106F': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: true,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    storage_size: {
      mandatory: false,
      value: [],
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: true,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-110D': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-1067': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: true,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-1057': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: true,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: true,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: true,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: true,
      value: [],
    },
    os_version: {
      mandatory: true,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-1056': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: true,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: true,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: true,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: true,
      value: [],
    },
    os_version: {
      mandatory: true,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-1059': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: true,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: true,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: true,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: true,
      value: [],
    },
    os_version: {
      mandatory: true,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-102B': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: true,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'RET14-102C': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Mouse: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Power Bank': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Earphone: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Wireless Stereo (TWS)': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: true,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  Adapter: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Cable: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Extension Cord': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Audio Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Home Audio': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  Microphone: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Speaker: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Vehicle Audio': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Camcorder: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: true,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  Camera: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: true,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: true,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: true,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Camera Bag': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Batteries: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: true,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Charger: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Camera Lens': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Photo Printer': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Tripod: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Camera Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  UPS: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Networking Device': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Printer: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: true,
      value: [],
    },
    printer_speed: {
      mandatory: true,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Printer Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'storage Drive': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    storage_size: {
      mandatory: false,
      value: [],
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Pen Drive': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    storage_size: {
      mandatory: false,
      value: [],
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Memory Card': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: true,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    storage_size: {
      mandatory: false,
      value: [],
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Computer Component': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Cooling Pad': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Docking Station': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Keyboard Guard': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Laptop Skin': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Laptop Stand': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Mousepad: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Laptop Bag': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Screen Protector': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Computer Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Computer Software': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: true,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Ebook Reader': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: true,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Tablet Accessories ': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Gaming Controller': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Gaming Chair': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Gaming Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Gaming Console': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: true,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Video Games': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: true,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Mobile Cover': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Mobile Mount': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Mobile Screen Guard': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Selfie Stick': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Mobile Skin Sticker': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Biometrics: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Home Alarm': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Home Automation': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: true,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Smart Switch': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Smart Lighting': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Home Safe': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Intercom: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Sensor: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Smart TV': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: true,
      value: [],
    },
    os_version: {
      mandatory: true,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Standard TV': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'TV Mount': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Remote: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Streaming Device': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'TV Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Virtual Reality Headset': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  '3D Glasses': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  '3D Modulator': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  Projector: {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: true,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Projector Screen': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Projector Mount': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Projector Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'TV Part': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'TV Remote': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Set Top Box': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'TV Stand': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Video Player': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Digital Photo Frame': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: true,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: true,
      value: [],
    },
    breadth: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: true,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Home Theatre Projector': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: true,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: true,
      value: [],
    },
  },
  'Video Player Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: false,
      value: [],
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Smart Band': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Smart Glasses': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Watch Strap Band': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: true,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
  'Wearable Accessories': {
    brand: {
      mandatory: true,
      value: [],
    },
    model: {
      mandatory: false,
      value: [],
    },
    model_year: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    colour: {
      mandatory: true,
      value: COLOUR,
    },
    colour_name: {
      mandatory: false,
      value: [],
    },
    ram: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    ram_unit: {
      mandatory: false,
      value: [],
    },
    rom: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    rom_unit: {
      mandatory: false,
      value: [],
    },
    storage: {
      mandatory: false,
      value: "/^[0-9]{1,4}$/",
    },
    storage_unit: {
      mandatory: false,
      value: [],
    },
    storage_type: {
      mandatory: false,
      value: [],
    },
    screen_size: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    primary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    secondary_camera: {
      mandatory: false,
      value: "/^[0-9]{1,3}$/",
    },
    cpu: {
      mandatory: false,
      value: [],
    },
    gpu: {
      mandatory: false,
      value: [],
    },
    battery_capacity: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    os_type: {
      mandatory: false,
      value: [],
    },
    os_version: {
      mandatory: false,
      value: [],
    },
    connectivity: {
      mandatory: false,
      value: [],
    },
    form_factor: {
      mandatory: false,
      value: [],
    },
    compatible_devices: {
      mandatory: false,
      value: [],
    },
    special_feature: {
      mandatory: false,
      value: [],
    },
    includes: {
      mandatory: false,
      value: [],
    },
    weight: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    length: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    breadth: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    height: {
      mandatory: false,
      value: "/^[0-9]+(\.[0-9]{1,2})?$/",
    },
    refurbished: {
      mandatory: false,
      value: [],
    },
    resolution: {
      mandatory: false,
      value: [],
    },
    series: {
      mandatory: false,
      value: [],
    },
    printer_output: {
      mandatory: false,
      value: [],
    },
    printer_speed: {
      mandatory: false,
      value: "/^[0-9]{1,5}$/",
    },
    warranty: {
      mandatory: false,
      value: [],
    },
  },
}

module.exports={electronicsData}