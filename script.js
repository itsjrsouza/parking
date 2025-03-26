const hoverImages = {
    "google": "./assets/google-hover.svg",
    "apple": "./assets/apple-hover.svg",
    "pix": "./assets/pix-hover.svg"
};

document.querySelectorAll(".icons.img").forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = hoverImages[img.id];

    if (hoverSrc) {
        img.addEventListener("mouseenter", () => {
            img.src = hoverSrc;
        });

        img.addEventListener("mouseleave", () => {
            img.src = originalSrc;
        });
    }
});

class Parquimetro {
    constructor() {
      this.taxaPor30Min = 1.0; // R$ 1,00 por 30 minutos
      this.taxaPorHora = 1.75; // R$ 1,75 por 60 minutos
      this.taxaPorDuasHoras = 3.0; // R$ 3,00 por 120 minutos
    }
  
    calcularValor(tempo) {
      let [horas, minutos] = tempo.split(":").map(Number);
      let totalMinutos = horas * 60 + minutos;
  
      // Se o tempo for menor que 30 minutos, mostrar o alerta e recarregar a página
      if (totalMinutos < 30) {
        alert("Valor insuficiente! O tempo mínimo é de 30 minutos.");
        window.location.reload(); // Recarregar a página
        return null;
      }
  
      // Se o tempo for maior que 120 minutos, mostrar o alerta e recarregar a página
      if (totalMinutos > 120) {
        alert("O tempo máximo permitido é de 2 horas.");
        window.location.reload(); // Recarregar a página
        return null;
      }
  
      // Calcular o valor proporcional dependendo do tempo
      let valor;
  
      if (totalMinutos <= 30) {
        valor = this.taxaPor30Min;
      } else if (totalMinutos <= 60) {
        valor = this.taxaPor30Min + ((totalMinutos - 30) / 30) * (this.taxaPorHora - this.taxaPor30Min);
      } else if (totalMinutos <= 120) {
        valor = this.taxaPorHora + ((totalMinutos - 60) / 60) * (this.taxaPorDuasHoras - this.taxaPorHora);
      }
  
      return valor.toFixed(2);
    }
  }
  
  // Instanciando o parquímetro
  const parquimetro = new Parquimetro();
  
  // Pegando os elementos do DOM
  const plateInput = document.querySelector(".plate");
  const timeInput = document.querySelector(".time");
  const valorDisplay = document.querySelector(".valor");
  const pagarButton = document.querySelector("button");
  
  // Função para processar o pagamento
  function processarPagamento() {
    const placa = plateInput.value.trim().toUpperCase(); // Convertendo a placa para maiúsculas
    const tempo = timeInput.value;
  
    // Validar o tempo (garantir que o valor esteja entre 00:01 e 02:00)
    let [horas, minutos] = tempo.split(":").map(Number);
    if (horas < 0 || horas > 2 || (horas === 2 && minutos > 0)) {
      alert("Horário inválido! O tempo permitido é de 00:01 a 02:00.");
      return;
    }
  
    if (!placa || !tempo) {
      alert("Preencha todos os campos!");
      return;
    }
  
    let valor = parquimetro.calcularValor(tempo);
  
    if (valor !== null) {
      if (valor < 1) {
        alert("Valor insuficiente! O mínimo é R$ 1,00.");
        valorDisplay.textContent = "R$ 0,00";
      } else {
        valorDisplay.textContent = `R$ ${valor}`;
      }
    }
  }
  
  // Chamando a função ao clicar no botão
  pagarButton.addEventListener("click", processarPagamento);  