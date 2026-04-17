const OPS_CALCULATOR_DEFAULTS = {
  basePrice: 120,
  includedHours: 3,
  extraHourRate: 45,
  urgencyMultiplier: 1.25,
};

export function calculateEstimate(input, defaults = OPS_CALCULATOR_DEFAULTS) {
  const hours = Math.max(Number(input.hours || defaults.includedHours), 1);
  const urgent = Boolean(input.urgent);
  const extraHours = Math.max(hours - defaults.includedHours, 0);
  const subtotal = defaults.basePrice + extraHours * defaults.extraHourRate;
  const total = urgent ? subtotal * defaults.urgencyMultiplier : subtotal;

  return {
    hours,
    urgent,
    subtotal: roundCurrency(subtotal),
    total: roundCurrency(total),
  };
}

export function roundCurrency(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderCalculator(root) {
  root.innerHTML = `
    <form class="ops-calculator" aria-label="Project estimate calculator">
      <label>
        Expected hours
        <input name="hours" type="number" min="1" value="3" />
      </label>
      <label class="ops-calculator__check">
        <input name="urgent" type="checkbox" />
        24h turnaround
      </label>
      <output class="ops-calculator__result" aria-live="polite"></output>
    </form>
  `;

  const form = root.querySelector("form");
  const output = root.querySelector("output");

  function update() {
    const estimate = calculateEstimate({
      hours: form.elements.hours.value,
      urgent: form.elements.urgent.checked,
    });
    output.textContent = `Estimated pass: ${formatCurrency(estimate.total)}`;
  }

  form.addEventListener("input", update);
  update();
}

if (typeof document !== "undefined") {
  document.querySelectorAll("[data-ops-calculator]").forEach(renderCalculator);
}
