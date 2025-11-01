const inputs = {
  consumoMensual: document.getElementById("consumoMensual"),
  hsp: document.getElementById("hsp"),
  wattPanel: document.getElementById("wattPanel"),
  costoPorPanel: document.getElementById("costoPorPanel"),
  costoKwh: document.getElementById("costoKwh"),
};

const outputs = {
  consumoDiario: document.getElementById("consumoDiario"),
  paneles: document.getElementById("paneles"),
  potenciaTotal: document.getElementById("potenciaTotal"),
  areaTotal: document.getElementById("areaTotal"),
  costoTotal: document.getElementById("costoTotal"),
  costoDetalle: document.getElementById("costoDetalle"),
};

function calcular() {
  const d = {
    consumoMensual: parseFloat(inputs.consumoMensual.value) || 0,
    hsp: parseFloat(inputs.hsp.value) || 0,
    wattPanel: parseFloat(inputs.wattPanel.value) || 0,
    costoPorPanel: parseFloat(inputs.costoPorPanel.value) || 0,
    costoKwh: parseFloat(inputs.costoKwh.value) || 0,
  };

  const consumoDiario = d.consumoMensual / 30;
  const potenciaRequerida = consumoDiario / d.hsp;

  outputs.consumoDiario.textContent = consumoDiario.toFixed(2) + " kWh/dia";
  
}

Object.values(inputs).forEach((i) => i.addEventListener("input", calcular));

calcular();
