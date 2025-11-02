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
  roiValor: document.getElementById("roiValor"),
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
  const paneles = Math.ceil((potenciaRequerida * 1000) / d.wattPanel);
  const potenciaTotal = (paneles * d.wattPanel) / 1000;
  const areaTotal = paneles * 2.1;
  const costoTotalSistema = paneles * d.costoPorPanel;
  const ahorroMensual = d.consumoMensual * d.costoKwh;
  const ahorroAnual = ahorroMensual * 12;
  const roiMensual = ahorroMensual > 0 ? costoTotalSistema / ahorroMensual : 0;
  const roiAnios = ahorroAnual > 0 ? costoTotalSistema / ahorroAnual : 0;

  outputs.consumoDiario.textContent = consumoDiario.toFixed(2) + " kWh/dia";
  outputs.paneles.innerHTML = `${paneles} <span class='text-sm font-normal'>unidades</span>`;
  outputs.potenciaTotal.textContent = `${d.wattPanel} W c/u -> ${potenciaTotal.toFixed(2)} kWp total`;
  outputs.costoDetalle.textContent = `${paneles} paneles x ${d.costoPorPanel} c/u`;
  outputs.areaTotal.textContent = areaTotal.toFixed(1) + " m^2";
  outputs.costoTotal.textContent = costoTotalSistema;
  outputs.roiValor.textContent = roiAnios.toFixed(1);
}

Object.values(inputs).forEach((i) => i.addEventListener("input", calcular));

calcular();
