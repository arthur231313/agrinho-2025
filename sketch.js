let soil; // Solo onde as sementes serão plantadas
let plants = []; // Lista de plantas
let season; // Estação atual
let waterLevel = 5; // Nível de água inicial
let temperature = 20; // Temperatura média inicial (em °C)
let seasonCounter = 0; // Contador de estações

function setup() {
  createCanvas(800, 600);
  soil = new Soil(height - 100); // Instância do solo
  season = "Primavera"; // Estação inicial
  textSize(20);
}

function draw() {
  background(135, 206, 235); // Céu claro (fundo)

  // Mostrar a estação atual
  fill(0);
  text("Estação: " + season, 20, 30);
  text("Nível de água: " + waterLevel, 20, 60);
  text("Temperatura: " + temperature + "°C", 20, 90);

  // Mudar a estação a cada 10 segundos
  if (frameCount % 600 === 0) {
    changeSeason();
  }

  // Desenha o solo e o fundo
  soil.display();

  // Atualiza e desenha as plantas
  for (let i = 0; i < plants.length; i++) {
    plants[i].grow(waterLevel, temperature, season); // A planta cresce com base na água, temperatura e estação
    plants[i].display(); // Exibe a planta
  }

  // Exibição de clima
  drawWeather();
}

// Muda a estação do ano a cada 10 segundos
function changeSeason() {
  seasonCounter++;
  if (seasonCounter % 4 === 0) {
    season = "Primavera";
    temperature = 20; // Temperatura média na primavera
    waterLevel = 5; // Nível de água balanceado
  } else if (seasonCounter % 4 === 1) {
    season = "Verão";
    temperature = 30; // Temperatura mais alta no verão
    waterLevel = 3; // Menos água devido ao calor
  } else if (seasonCounter % 4 === 2) {
    season = "Outono";
    temperature = 15; // Temperatura mais baixa no outono
    waterLevel = 6; // Mais água devido à chuva
  } else {
    season = "Inverno";
    temperature = 5; // Temperatura baixa no inverno
    waterLevel = 2; // Menos água devido ao frio
  }
}

// Função para lidar com o plantio das sementes
function mousePressed() {
  let plant = new Plant(mouseX, soil.y); // Cria uma nova planta no local do mouse
  plants.push(plant); // Adiciona a planta à lista
}

// Função para desenhar o clima e outras condições
function drawWeather() {
  fill(255);
  noStroke();
  if (season === "Primavera") {
    fill(60, 179, 113); // Cor de primavera (verde)
  } else if (season === "Verão") {
    fill(255, 223, 0); // Cor de verão (amarelo quente)
  } else if (season === "Outono") {
    fill(255, 165, 0); // Cor de outono (laranja)
  } else {
    fill(240, 248, 255); // Cor de inverno (azul claro)
  }
  ellipse(width - 100, 100, 80, 80); // Representação do sol
}

// Classe para o Solo
class Soil {
  constructor(y) {
    this.y = y;
    this.width = width;
    this.height = 100;
  }

  display() {
    fill(139, 69, 19); // Cor do solo (marrom)
    rect(0, this.y, this.width, this.height); // Solo na parte inferior
  }
}

// Classe para as Plantas
class Plant {
  constructor(x, y) {
    this.x = x; // Posição horizontal da planta
    this.y = y; // Posição inicial no solo
    this.size = 10; // Tamanho inicial da planta
    this.growthRate = 0.2; // Taxa de crescimento
    this.maxSize = 50; // Tamanho máximo da planta
  }

  grow(water, temp, season) {
    let growth = this.growthRate;

    // Afeta o crescimento com base no nível de água
    if (water < 3) {
      growth *= 0.5; // Cresce mais devagar se a água estiver baixa
    } else if (water > 6) {
      growth *= 1.5; // Cresce mais rápido se houver muita água
    }

    // Afeta o crescimento com base na temperatura
    if (temp > 25 && season === "Verão") {
      growth *= 1.2; // Cresce mais rápido no calor
    } else if (temp < 10 && season === "Inverno") {
      growth *= 0.5; // Cresce devagar no frio
    }

    // Limita o crescimento a um tamanho máximo
    if (this.size < this.maxSize) {
      this.size += growth;
    }
  }

  display() {
    fill(34, 139, 34); // Cor verde para as folhas
    ellipse(this.x, this.y - this.size / 2, this.size, this.size); // Representação da planta

    // Desenha o caule da planta
    fill(139, 69, 19); // Cor marrom para o caule
    rect(this.x - 5, this.y, 10, this.size); // Caule da planta
  }
}
