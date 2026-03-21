import type { Tool } from "../types";

export const financeTools: Tool[] = [
  { slug: "mortgage-calculator", name: "Mortgage Calculator", description: "Calculate monthly mortgage payments, total interest, and amortization schedule.", category: "finance", icon: "🏠", keywords: ["mortgage calculator", "home loan", "mortgage payment", "amortization"], subcategory: "loans", template: "simple-calculator",
    longDescription: "Plan your home purchase with this comprehensive Mortgage Calculator. Enter the loan amount, interest rate, and term to see your monthly payment, total interest paid, and complete amortization schedule. Compare different scenarios by adjusting the down payment and interest rate. Essential for first-time homebuyers and anyone refinancing their mortgage.",
    faqs: [
      { question: "What is included in a mortgage payment?", answer: "A basic mortgage payment includes principal and interest. Your actual payment may also include property taxes, homeowners insurance, and PMI." },
      { question: "How does the loan term affect payments?", answer: "A longer term (30 years) means lower monthly payments but more total interest. A shorter term (15 years) means higher payments but less total interest." },
      { question: "What is an amortization schedule?", answer: "An amortization schedule shows the breakdown of each payment into principal and interest over the life of the loan." }
    ],
    howToSteps: [
      { name: "Enter loan details", text: "Input the home price, down payment, interest rate, and loan term." },
      { name: "View payment breakdown", text: "See your monthly payment, total interest, and total cost." },
      { name: "Review amortization", text: "Check the amortization schedule to see how your balance decreases over time." }
    ],
    useCases: ["Planning a home purchase", "Comparing mortgage options", "Deciding between 15-year and 30-year terms", "Calculating the impact of extra payments"],
    relatedSlugs: ["loan-calculator", "auto-loan-calculator", "debt-payoff-calculator", "compound-interest"]
  },
  { slug: "salary-to-hourly", name: "Salary to Hourly Calculator", description: "Convert annual salary to hourly rate and vice versa.", category: "finance", icon: "💵", keywords: ["salary to hourly", "hourly to salary", "wage calculator", "pay converter"], subcategory: "business", template: "simple-calculator",
    longDescription: "Quickly convert between annual salary and hourly wage with this calculator. Accounts for work hours per week (default 40) and weeks per year. Useful for comparing job offers, freelance rates, and understanding your true hourly value.",
    faqs: [
      { question: "How is hourly rate calculated from salary?", answer: "Divide annual salary by 52 weeks, then by hours per week. For a $50,000 salary at 40 hours/week: $50,000 / 52 / 40 = $24.04/hour." },
      { question: "Does it account for taxes?", answer: "This calculator shows gross (pre-tax) conversions. Use the Tax Estimator for after-tax calculations." }
    ],
    relatedSlugs: ["tax-estimator", "payroll-calculator", "mortgage-calculator", "tip-calculator"]
  },
  { slug: "tax-estimator", name: "Tax Estimator", description: "Estimate your federal income tax based on income and filing status.", category: "finance", icon: "🏛️", keywords: ["tax calculator", "income tax", "tax estimator", "federal tax"], subcategory: "tax", template: "simple-calculator",
    relatedSlugs: ["salary-to-hourly", "payroll-calculator", "roi-calculator"]
  },
  { slug: "retirement-calculator", name: "Retirement Calculator", description: "Estimate how much you need to save for retirement.", category: "finance", icon: "🏖️", keywords: ["retirement calculator", "401k calculator", "retirement savings", "retirement planning"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["compound-interest", "savings-goal-calculator", "inflation-calculator"]
  },
  { slug: "roi-calculator", name: "ROI Calculator", description: "Calculate Return on Investment for any business decision or investment.", category: "finance", icon: "📈", keywords: ["roi calculator", "return on investment", "investment return", "profit calculator"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["compound-interest", "stock-profit-calculator", "cagr-calculator"]
  },
  { slug: "inflation-calculator", name: "Inflation Calculator", description: "Calculate how inflation affects purchasing power over time.", category: "finance", icon: "📉", keywords: ["inflation calculator", "purchasing power", "cpi calculator", "inflation rate"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["compound-interest", "retirement-calculator", "savings-goal-calculator"]
  },
  { slug: "savings-goal-calculator", name: "Savings Goal Calculator", description: "Calculate how long it takes to reach a savings goal with regular deposits.", category: "finance", icon: "🎯", keywords: ["savings calculator", "savings goal", "monthly savings", "saving plan"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["compound-interest", "retirement-calculator", "inflation-calculator"]
  },
  { slug: "margin-calculator", name: "Margin Calculator", description: "Calculate profit margin, markup, and cost from any two values.", category: "finance", icon: "💹", keywords: ["margin calculator", "profit margin", "markup calculator", "gross margin"], subcategory: "business", template: "simple-calculator",
    relatedSlugs: ["roi-calculator", "break-even-calculator", "discount-calculator"]
  },
  { slug: "vat-calculator", name: "VAT Calculator", description: "Calculate VAT amounts, add VAT to a price, or remove VAT from a total.", category: "finance", icon: "🧾", keywords: ["vat calculator", "sales tax", "tax calculator", "vat inclusive"], subcategory: "tax", template: "simple-calculator",
    relatedSlugs: ["tax-estimator", "tip-calculator", "margin-calculator"]
  },
  { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator", description: "Plan your debt payoff strategy and see how extra payments help.", category: "finance", icon: "💳", keywords: ["debt payoff", "debt calculator", "credit card payoff", "debt snowball"], subcategory: "loans", template: "simple-calculator",
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "compound-interest"]
  },
  { slug: "auto-loan-calculator", name: "Auto Loan Calculator", description: "Calculate monthly car loan payments with trade-in and down payment.", category: "finance", icon: "🚗", keywords: ["auto loan", "car loan calculator", "car payment", "vehicle loan"], subcategory: "loans", template: "simple-calculator",
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "debt-payoff-calculator"]
  },
  { slug: "break-even-calculator", name: "Break-Even Calculator", description: "Calculate the break-even point for your business or product.", category: "finance", icon: "⚖️", keywords: ["break even", "break even point", "business calculator", "cost analysis"], subcategory: "business", template: "simple-calculator",
    relatedSlugs: ["margin-calculator", "roi-calculator", "stock-profit-calculator"]
  },
  { slug: "stock-profit-calculator", name: "Stock Profit Calculator", description: "Calculate profit or loss from stock trades including fees and taxes.", category: "finance", icon: "📊", keywords: ["stock profit", "stock calculator", "trading calculator", "investment profit"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["roi-calculator", "cagr-calculator", "compound-interest"]
  },
  { slug: "cagr-calculator", name: "CAGR Calculator", description: "Calculate Compound Annual Growth Rate for investments.", category: "finance", icon: "📈", keywords: ["cagr", "compound annual growth rate", "growth rate calculator", "investment growth"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["roi-calculator", "compound-interest", "stock-profit-calculator"]
  },
  { slug: "emi-calculator", name: "EMI Calculator", description: "Calculate Equated Monthly Installments for loans.", category: "finance", icon: "🏦", keywords: ["emi calculator", "loan emi", "monthly installment", "emi formula"], subcategory: "loans", template: "simple-calculator",
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "auto-loan-calculator"]
  },
  { slug: "rental-yield-calculator", name: "Rental Yield Calculator", description: "Calculate gross and net rental yield on investment properties.", category: "finance", icon: "🏘️", keywords: ["rental yield", "property yield", "rental return", "investment property"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["mortgage-calculator", "roi-calculator", "break-even-calculator"]
  },
  { slug: "credit-card-payoff", name: "Credit Card Payoff Calculator", description: "See how long it takes to pay off credit card debt with minimum payments.", category: "finance", icon: "💳", keywords: ["credit card payoff", "credit card calculator", "minimum payment", "debt free date"], subcategory: "loans", template: "simple-calculator",
    relatedSlugs: ["debt-payoff-calculator", "compound-interest", "loan-calculator"]
  },
  { slug: "net-worth-calculator", name: "Net Worth Calculator", description: "Calculate your total net worth from assets and liabilities.", category: "finance", icon: "💰", keywords: ["net worth", "net worth calculator", "assets liabilities", "financial health"], subcategory: "investment", template: "simple-calculator",
    relatedSlugs: ["retirement-calculator", "savings-goal-calculator", "compound-interest"]
  },
  { slug: "payroll-calculator", name: "Payroll Calculator", description: "Calculate gross pay, tax deductions, and net pay for employees.", category: "finance", icon: "💵", keywords: ["payroll calculator", "salary calculator", "net pay", "take home pay"], subcategory: "business", template: "simple-calculator",
    relatedSlugs: ["salary-to-hourly", "tax-estimator", "vat-calculator"]
  },
  { slug: "currency-exchange-calculator", name: "Currency Exchange Calculator", description: "Calculate currency exchange amounts with real-time rates and fees.", category: "finance", icon: "💱", keywords: ["currency exchange", "forex calculator", "money exchange", "exchange rate"], subcategory: "crypto", template: "simple-calculator",
    relatedSlugs: ["currency-converter", "inflation-calculator", "vat-calculator"]
  },
];
