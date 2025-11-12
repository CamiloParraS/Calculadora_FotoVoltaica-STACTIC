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
  ahorroLabel: document.getElementById("ahorroLabel"),
  ahorroValor: document.getElementById("ahorroValor"),
  roiValor: document.getElementById("roiValor"),
};

const btnMensual = document.getElementById("btnMensual");
const btnAnual = document.getElementById("btnAnual");

let showMonthly = false;

const format = (n) => n.toLocaleString("es-CO");
const formatMoney = (n) => "$" + format(n);

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
  outputs.costoTotal.textContent = formatMoney(costoTotalSistema);
  outputs.costoDetalle.textContent = `${paneles} paneles × ${formatMoney(d.costoPorPanel)} c/u`;

  const ahorro = showMonthly ? ahorroMensual : ahorroAnual;
  const roi = showMonthly ? roiMensual : roiAnios;
  const unidad = showMonthly ? "meses" : "años";

  outputs.ahorroLabel.textContent = showMonthly
    ? "Ahorro Mensual Estimado"
    : "Ahorro Anual Estimado";
  outputs.ahorroValor.textContent = formatMoney(ahorro);
  outputs.roiValor.textContent = roi > 0 ? roi.toFixed(1) + " " + unidad : "-";
}

Object.values(inputs).forEach((i) => i.addEventListener("input", calcular));

btnMensual.onclick = () => {
  showMonthly = true;
  btnMensual.className = "px-3 py-1 rounded bg-white text-teal-700";
  btnAnual.className = "ml-2 px-3 py-1 rounded text-white/70";
  calcular();
};
btnAnual.onclick = () => {
  showMonthly = false;
  btnAnual.className = "ml-2 px-3 py-1 rounded bg-white text-teal-700";
  btnMensual.className = "px-3 py-1 rounded text-white/70";
  calcular();
};

calcular();
