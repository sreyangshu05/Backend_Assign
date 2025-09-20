# Compound Interest Service (Template 2 integration)

This small project provides:

- A static frontend (`interestcompounded.html`) using Template 2 for compound interest layout.
- A Node.js + Express backend with an endpoint `/compound-interest` that returns step-by-step calculations for compound interest problems.

Features
- Compute rate r when Principal (P), Amount (A) and Time (n) are provided.
- Compute Amount A when Principal (P), Rate (r) and Time (n) are provided.
- Returns human-readable step-by-step strings (useful for rendering into the Template 2 boxes).

Quick start

1. Install dependencies

```powershell
cd d:/Documents/Assign_LawTech
npm install
```

2. Start the server

```powershell
node index.js
```

3. Open the frontend

Point your browser to: http://localhost:3000/

Usage — API

POST /compound-interest

Payload options:

- To find rate r: { "principal": number, "amount": number, "time": number }
- To find amount A: { "principal": number, "rate": number, "time": number }

Example (find r)

Request

```json
{
  "principal": 5000,
  "amount": 6050,
  "time": 2
}
```

Response

```json
{
  "steps": [
    "Principal (P) = 5000",
    "Amount (A) = 6050",
    "Time (n) = 2 years",
    "Formula: A = P(1 + r/100)^n",
    "Substitution: 6050 = 5000(1 + r/100)^2",
    "Divide: 6050 ÷ 5000 = (1 + r/100)^2",
    "Simplify: 1.21 = (1 + r/100)^2",
    "Take square root: √1.21 = (1 + r/100)",
    "Simplify: 1.10 = (1 + r/100)",
    "Solve for r: r = 10.00%"
  ],
  "answer": { "rate": "10.00%" }
}
```

Example (find A)

Request

```json
{
  "principal": 5000,
  "rate": 10,
  "time": 3
}
```

Response

```json
{
  "steps": [
    "Principal (P) = 5000",
    "Rate (r) = 10%",
    "Time (n) = 3 years",
    "Formula: A = P(1 + r/100)^n",
    "Substitution: A = 5000(1 + 10/100)^3",
    "Simplify inside bracket: (1 + r/100) = 1.10",
    "Raise to power: 1.10^3 = 1.331",
    "Multiply by P: 5000 × 1.331 = 6655.00",
    "Final Answer: A = 6655.00"
  ],
  "answer": { "amount": 6655 }
}
```

Notes and next steps
- The frontend includes a simple form to POST inputs to `/compound-interest` and displays the returned step list. If you want the frontend boxes to be auto-filled (instead of an ordered list), I can wire the step output to specific DOM elements in the template.
- Add unit tests and input validation for production readiness.


# Compound Interest Service

Small Express service that computes compound interest steps and returns step-by-step JSON useful for rendering in the frontend.

Endpoints:

- POST /compound-interest

Payload options:

- To find rate r: { principal, amount, time }
- To find amount A: { principal, rate, time }

Example:

POST /compound-interest
{
  "principal": 5000,
  "amount": 6050,
  "time": 2
}

Response contains a `steps` array and an `answer` object.
