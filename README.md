# SIDD Pricing Calculator

A responsive pricing calculator built with Angular. It helps businesses estimate their monthly transaction processing costs based on their selected pricing plan, transaction amount, and monthly transaction count.

## Features

- Three pricing plans: Starter, Growth, and Enterprise.
- Live calculation of transaction fees and monthly costs.
- Per-transaction fee caps.
- Automatic VAT calculation.
- Side-by-side comparison of two pricing plans.
- Light and dark themes.
- Input validation for transaction amounts and counts.
- Currency formatting in Nigerian Naira (NGN).

## Tech Stack

- Angular
- TypeScript
- Tailwind CSS
- Vitest
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

\`\`\`bash
git clone https://github.com/EstherOluyemi/sidd-pricing-calculator.git
\`\`\`

Navigate into the project:

\`\`\`bash
cd sidd-pricing-calculator
\`\`\`

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Start the development server:

\`\`\`bash
ng serve
\`\`\`

Open `http://localhost:4200/` in your browser.

## Testing

Run the test suite:

\`\`\`bash
ng test --watch=false
\`\`\`

## Production Build

Build the application:

\`\`\`bash
ng build
\`\`\`

The production build is generated in the `dist/` directory.

## Pricing Assumptions

The pricing rates, transaction fee caps, and VAT rate currently used in this project are illustrative values for the calculator assignment. They should not be interpreted as verified official SIDD pricing information or tax guidance.

## Author

Esther Oluyemi

GitHub: [EstherOluyemi](https://github.com/EstherOluyemi)