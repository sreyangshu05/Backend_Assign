function toPretty(n, fixed=6) {
  const x = parseFloat(n);
  if (Number.isInteger(x)) return x.toString();
  const rounded = parseFloat(x.toFixed(fixed));
  // if 2-decimal equals, show 2 decimals
  if (parseFloat(rounded.toFixed(2)) === rounded) return rounded.toFixed(2);
  return rounded;
}

function computeRateFromPA(principal, amount, time) {
  const steps = [];
  steps.push(`Principal (P) = ${principal}`);
  steps.push(`Amount (A) = ${amount}`);
  steps.push(`Time (n) = ${time} years`);
  steps.push('Formula: A = P(1 + r/100)^n');
  steps.push(`Substitution: ${amount} = ${principal}(1 + r/100)^${time}`);

  const ratio = amount / principal;
  const ratioRounded = parseFloat(ratio.toFixed(6));
  steps.push(`Divide: ${amount} ÷ ${principal} = (1 + r/100)^${time}`);
  const prettyRatio = toPretty(ratioRounded);
  steps.push(`Simplify: ${prettyRatio} = (1 + r/100)^${time}`);

  if (time === 2) {
    const sqrt = Math.sqrt(ratio);
    const prettySqrt = toPretty(sqrt);
    steps.push(`Take square root: √${prettyRatio} = (1 + r/100)`);
    steps.push(`Simplify: ${prettySqrt} = (1 + r/100)`);
    const rValue = (sqrt - 1) * 100;
    const prettyR = toPretty(rValue, 2);
    steps.push(`Solve for r: r = ${prettyR}%`);
    return { steps, answer: { rate: `${prettyR}%` } };
  }

  const root = Math.pow(ratio, 1 / time);
  const prettyRoot = toPretty(root);
  steps.push(`Take ${time}th root: ${ratioRounded}^(1/${time}) = (1 + r/100)`);
  steps.push(`Simplify: ${prettyRoot} = (1 + r/100)`);
  const rValue = (root - 1) * 100;
  const prettyR = toPretty(rValue, 2);
  steps.push(`Solve for r: r = ${prettyR}%`);
  return { steps, answer: { rate: `${prettyR}%` } };
}

function computeAmountFromPR(principal, rate, time) {
  const steps = [];
  steps.push(`Principal (P) = ${principal}`);
  steps.push(`Rate (r) = ${rate}%`);
  steps.push(`Time (n) = ${time} years`);
  steps.push('Formula: A = P(1 + r/100)^n');
  steps.push(`Substitution: A = ${principal}(1 + ${rate}/100)^${time}`);

  const base = 1 + rate / 100;
  const baseRounded = toPretty(base);
  steps.push(`Simplify inside bracket: (1 + r/100) = ${baseRounded}`);

  const power = Math.pow(base, time);
  const powerRounded = toPretty(power);
  steps.push(`Raise to power: ${baseRounded}^${time} = ${powerRounded}`);

  const amount = principal * power;
  const amountRounded = toPretty(amount, 2);
  steps.push(`Multiply by P: ${principal} × ${powerRounded} = ${amountRounded}`);
  steps.push(`Final Answer: A = ${amountRounded}`);
  return { steps, answer: { amount: Number(amountRounded) } };
}

module.exports = { computeRateFromPA, computeAmountFromPR };
