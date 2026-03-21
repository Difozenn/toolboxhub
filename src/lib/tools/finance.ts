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
    howToSteps: [
      { name: "Enter your salary or hourly rate", text: "Type your annual salary or hourly wage into the corresponding field." },
      { name: "Adjust work hours", text: "Set your hours per week (default 40) and weeks per year if they differ from standard." },
      { name: "View the conversion", text: "See the equivalent hourly rate or annual salary calculated instantly." }
    ],
    useCases: ["Comparing job offers listed as salary vs. hourly pay", "Calculating freelance or contract rates from a target annual income", "Understanding the true hourly value of a salaried position", "Budgeting based on hourly earnings for part-time workers"],
    relatedSlugs: ["tax-estimator", "payroll-calculator", "mortgage-calculator", "tip-calculator"]
  },
  { slug: "tax-estimator", name: "Tax Estimator", description: "Estimate your federal income tax based on income and filing status.", category: "finance", icon: "🏛️", keywords: ["tax calculator", "income tax", "tax estimator", "federal tax"], subcategory: "tax", template: "simple-calculator",
    longDescription: "Estimate your federal income tax liability quickly and accurately with this Tax Estimator. Enter your gross income and filing status to see which tax brackets apply and how much you owe. A great starting point for tax planning, adjusting withholding, or deciding whether to file jointly or separately.",
    faqs: [
      { question: "How accurate is this tax estimator?", answer: "This tool provides a close approximation based on current federal tax brackets. Your actual tax may differ due to deductions, credits, state taxes, and other factors." },
      { question: "What filing statuses are supported?", answer: "The estimator covers Single, Married Filing Jointly, Married Filing Separately, and Head of Household — the four main IRS filing statuses." },
      { question: "Does it include state income tax?", answer: "This estimator focuses on federal income tax. State tax rates vary widely; check your state's tax authority for accurate state figures." }
    ],
    howToSteps: [
      { name: "Enter your income", text: "Input your total annual gross income from all sources." },
      { name: "Select your filing status", text: "Choose Single, Married Filing Jointly, Head of Household, or another applicable status." },
      { name: "Review your estimate", text: "See your estimated federal tax, effective tax rate, and marginal bracket." }
    ],
    useCases: ["Estimating quarterly estimated tax payments", "Comparing tax outcomes for different filing statuses", "Planning salary negotiations with after-tax figures in mind", "Checking whether you need to adjust W-4 withholding"],
    relatedSlugs: ["salary-to-hourly", "payroll-calculator", "roi-calculator"]
  },
  { slug: "retirement-calculator", name: "Retirement Calculator", description: "Estimate how much you need to save for retirement.", category: "finance", icon: "🏖️", keywords: ["retirement calculator", "401k calculator", "retirement savings", "retirement planning"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Find out if you're on track for retirement with this Retirement Calculator. Enter your current savings, monthly contributions, expected rate of return, and target retirement age to project your nest egg. It helps you understand how much you need to save today to retire comfortably tomorrow.",
    faqs: [
      { question: "How much do I need to retire?", answer: "A common rule of thumb is to save 25 times your annual expenses (the 4% rule). This calculator helps you model different scenarios to reach your specific target." },
      { question: "What rate of return should I use?", answer: "Historically, a diversified stock portfolio has returned about 7% annually after inflation. Use a conservative 5–6% for a more cautious projection." },
      { question: "Does this account for Social Security?", answer: "This calculator focuses on personal savings. You should add your estimated Social Security benefit (found at ssa.gov) to your projected savings for a complete picture." }
    ],
    howToSteps: [
      { name: "Enter your current savings", text: "Input how much you have already saved for retirement across all accounts." },
      { name: "Set your goals and contributions", text: "Enter your monthly contribution, expected return rate, and target retirement age." },
      { name: "Review your projection", text: "See your projected retirement balance and whether it meets your income needs." }
    ],
    useCases: ["Checking whether current 401(k) contributions are enough", "Modeling the impact of starting retirement savings earlier", "Comparing different retirement ages", "Planning catch-up contributions after age 50"],
    relatedSlugs: ["compound-interest", "savings-goal-calculator", "inflation-calculator"]
  },
  { slug: "roi-calculator", name: "ROI Calculator", description: "Calculate Return on Investment for any business decision or investment.", category: "finance", icon: "📈", keywords: ["roi calculator", "return on investment", "investment return", "profit calculator"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Measure the profitability of any investment or business decision with this ROI Calculator. Simply enter the initial cost and the gain from the investment to get the return on investment percentage instantly. Whether you're evaluating marketing spend, equipment purchases, or stock picks, ROI gives you a clear apples-to-apples comparison.",
    faqs: [
      { question: "What is a good ROI?", answer: "A 'good' ROI depends on the asset class and risk. Stock market investments typically target 7–10% annually. Business projects often aim for 20%+. Always compare ROI to the cost of capital." },
      { question: "What is the ROI formula?", answer: "ROI = ((Gain from Investment - Cost of Investment) / Cost of Investment) × 100. For example, investing $1,000 and receiving $1,200 back is a 20% ROI." },
      { question: "Does ROI account for time?", answer: "Basic ROI does not factor in how long the investment was held. Use the CAGR Calculator to compare investments held over different time periods." }
    ],
    howToSteps: [
      { name: "Enter investment cost", text: "Input the total amount you invested or spent." },
      { name: "Enter the return", text: "Input the total value received or gained from the investment." },
      { name: "Interpret your ROI", text: "Review the ROI percentage and use it to compare against other investment options." }
    ],
    useCases: ["Evaluating the return on a marketing campaign", "Comparing stock or real estate investment performance", "Assessing whether a business equipment purchase was worthwhile", "Deciding between competing project proposals"],
    relatedSlugs: ["compound-interest", "stock-profit-calculator", "cagr-calculator"]
  },
  { slug: "inflation-calculator", name: "Inflation Calculator", description: "Calculate how inflation affects purchasing power over time.", category: "finance", icon: "📉", keywords: ["inflation calculator", "purchasing power", "cpi calculator", "inflation rate"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Understand how inflation erodes the value of money over time with this Inflation Calculator. Enter a dollar amount, starting year, and ending year to see what that money is worth in today's dollars — or what today's money will be worth in the future. Indispensable for retirement planning, salary negotiations, and long-term financial projections.",
    faqs: [
      { question: "How is inflation measured?", answer: "Inflation is typically measured using the Consumer Price Index (CPI), which tracks the average change in prices paid by consumers for a basket of goods and services over time." },
      { question: "What is a normal inflation rate?", answer: "The U.S. Federal Reserve targets 2% annual inflation as a benchmark for a healthy economy. Rates above 4–5% are considered high and erode purchasing power noticeably." },
      { question: "How does inflation affect retirement savings?", answer: "Inflation means your savings must grow faster than the inflation rate just to maintain purchasing power. A $1 million nest egg today may only have the buying power of $500,000 after 25 years at 3% inflation." }
    ],
    howToSteps: [
      { name: "Enter the dollar amount", text: "Input the amount of money you want to evaluate." },
      { name: "Set the time period", text: "Choose the start year and end year for the inflation adjustment." },
      { name: "Review purchasing power", text: "See the equivalent value in the target year accounting for inflation." }
    ],
    useCases: ["Comparing salaries across different decades", "Planning retirement income needs in today's dollars", "Understanding the real cost of historical prices", "Evaluating whether investment returns beat inflation"],
    relatedSlugs: ["compound-interest", "retirement-calculator", "savings-goal-calculator"]
  },
  { slug: "savings-goal-calculator", name: "Savings Goal Calculator", description: "Calculate how long it takes to reach a savings goal with regular deposits.", category: "finance", icon: "🎯", keywords: ["savings calculator", "savings goal", "monthly savings", "saving plan"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Set a savings target and find out exactly how long it will take to reach it with this Savings Goal Calculator. Enter your goal amount, current savings, monthly deposit, and interest rate to get a clear timeline. It's the perfect tool for saving toward a down payment, vacation, emergency fund, or any financial milestone.",
    faqs: [
      { question: "How much should I save each month?", answer: "This calculator works in reverse too — enter your goal and deadline, and it will tell you how much you need to save monthly to reach it on time." },
      { question: "Does compound interest really make a big difference?", answer: "Yes, significantly. Even a modest 4% annual return on a savings account means your money grows faster the longer you leave it. The calculator shows you the exact impact of interest on your timeline." },
      { question: "What is a good savings rate?", answer: "Financial advisors commonly recommend saving 20% of your income (the 50/30/20 rule). However, even saving 5–10% consistently compounds into a meaningful sum over time." }
    ],
    howToSteps: [
      { name: "Set your savings goal", text: "Enter the total amount you want to save." },
      { name: "Enter your starting point", text: "Input any existing savings and the monthly amount you can contribute." },
      { name: "See your timeline", text: "Review how long it will take to reach your goal and how much interest you'll earn." }
    ],
    useCases: ["Saving for a house down payment", "Building a 3–6 month emergency fund", "Planning for a vacation or large purchase", "Tracking progress toward a college fund"],
    relatedSlugs: ["compound-interest", "retirement-calculator", "inflation-calculator"]
  },
  { slug: "margin-calculator", name: "Margin Calculator", description: "Calculate profit margin, markup, and cost from any two values.", category: "finance", icon: "💹", keywords: ["margin calculator", "profit margin", "markup calculator", "gross margin"], subcategory: "business", template: "simple-calculator",
    longDescription: "Quickly calculate gross profit margin, markup percentage, or selling price with this Margin Calculator. Enter any two of cost, revenue, and margin to instantly compute the third. Essential for pricing products, evaluating business profitability, and setting wholesale or retail prices.",
    faqs: [
      { question: "What is the difference between margin and markup?", answer: "Margin is profit as a percentage of revenue (profit / revenue × 100). Markup is profit as a percentage of cost (profit / cost × 100). A 50% markup results in a 33% margin." },
      { question: "What is a good profit margin?", answer: "It varies by industry. Grocery retail may operate on 2–5% margins, while software companies can achieve 70–80% gross margins. Compare your margin to industry benchmarks." },
      { question: "How do I calculate selling price from margin?", answer: "Selling Price = Cost / (1 - Desired Margin). For example, to achieve a 40% margin on a $60 item: $60 / (1 - 0.40) = $100 selling price." }
    ],
    howToSteps: [
      { name: "Enter cost and revenue", text: "Input the cost of goods sold and the selling price (or revenue)." },
      { name: "Select the calculation mode", text: "Choose whether you want to find margin, markup, cost, or selling price." },
      { name: "Apply to your pricing", text: "Use the results to set prices that meet your profitability targets." }
    ],
    useCases: ["Setting retail prices with a target margin", "Evaluating product line profitability", "Comparing margins across different products or services", "Negotiating supplier costs to hit margin goals"],
    relatedSlugs: ["roi-calculator", "break-even-calculator", "discount-calculator"]
  },
  { slug: "vat-calculator", name: "VAT Calculator", description: "Calculate VAT amounts, add VAT to a price, or remove VAT from a total.", category: "finance", icon: "🧾", keywords: ["vat calculator", "sales tax", "tax calculator", "vat inclusive"], subcategory: "tax", template: "simple-calculator",
    longDescription: "Add or remove VAT (Value Added Tax) from any price with this straightforward VAT Calculator. Enter the net or gross price along with the VAT rate to instantly see the tax amount and final price. Useful for businesses invoicing clients, freelancers calculating their fees, and consumers understanding the true cost of purchases.",
    faqs: [
      { question: "What is VAT?", answer: "VAT (Value Added Tax) is a consumption tax applied to goods and services at each stage of production. In the UK the standard rate is 20%. EU rates vary by country, typically between 17–27%." },
      { question: "How do I remove VAT from a price?", answer: "To remove VAT from a VAT-inclusive price, divide by (1 + VAT rate). For a £120 price at 20% VAT: £120 / 1.20 = £100 net price, with £20 VAT." },
      { question: "Is VAT the same as sales tax?", answer: "They are similar but collected differently. VAT is collected at every stage of production; sales tax is typically collected only at the final point of sale to the consumer." }
    ],
    howToSteps: [
      { name: "Enter the price", text: "Input either the net price (excluding VAT) or the gross price (including VAT)." },
      { name: "Set the VAT rate", text: "Enter the applicable VAT percentage for your country or product category." },
      { name: "Get the result", text: "See the VAT amount and the net or gross price depending on your input." }
    ],
    useCases: ["Creating invoices with correct VAT amounts", "Checking how much VAT is included in a receipt", "Calculating VAT for different EU country rates", "Comparing prices net of tax across vendors"],
    relatedSlugs: ["tax-estimator", "tip-calculator", "margin-calculator"]
  },
  { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator", description: "Plan your debt payoff strategy and see how extra payments help.", category: "finance", icon: "💳", keywords: ["debt payoff", "debt calculator", "credit card payoff", "debt snowball"], subcategory: "loans", template: "simple-calculator",
    longDescription: "Take control of your debt with this Debt Payoff Calculator. Enter your loan balance, interest rate, and monthly payment to see exactly when you'll be debt-free and how much interest you'll pay in total. See how adding even small extra payments dramatically reduces both your payoff time and total interest paid.",
    faqs: [
      { question: "What is the debt snowball method?", answer: "The debt snowball method involves paying off your smallest debt first, then rolling that payment into the next smallest. It builds momentum and motivation, though the debt avalanche (highest interest first) saves more in interest." },
      { question: "How much can extra payments save?", answer: "Even an extra $50–100 per month on a debt can save hundreds or thousands in interest and shave years off your payoff date. Use this calculator to see the exact impact." },
      { question: "What is the debt avalanche method?", answer: "The debt avalanche targets the highest-interest debt first, minimizing total interest paid over time. It is mathematically optimal but can feel slower than the snowball method." }
    ],
    howToSteps: [
      { name: "Enter your debt details", text: "Input the current balance, annual interest rate, and current monthly payment." },
      { name: "Add extra payment amount", text: "Enter any additional monthly amount you can put toward the debt." },
      { name: "Compare payoff scenarios", text: "See how different payment amounts change your debt-free date and total interest paid." }
    ],
    useCases: ["Planning to pay off a personal loan early", "Deciding how much extra to pay on high-interest debt", "Comparing debt snowball vs. avalanche strategies", "Projecting a debt-free date for motivation"],
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "compound-interest"]
  },
  { slug: "auto-loan-calculator", name: "Auto Loan Calculator", description: "Calculate monthly car loan payments with trade-in and down payment.", category: "finance", icon: "🚗", keywords: ["auto loan", "car loan calculator", "car payment", "vehicle loan"], subcategory: "loans", template: "simple-calculator",
    longDescription: "Calculate your monthly car payment before stepping foot in a dealership with this Auto Loan Calculator. Enter the vehicle price, down payment, trade-in value, interest rate, and loan term to see an accurate monthly payment and total cost of the loan. Knowing your numbers in advance puts you in a stronger negotiating position.",
    faqs: [
      { question: "What is a good interest rate for a car loan?", answer: "As of recent years, rates for borrowers with excellent credit (720+) typically range from 4–7% for new cars. Used car loans tend to carry higher rates. Always shop multiple lenders." },
      { question: "Should I put more money down on a car?", answer: "A larger down payment reduces your monthly payment, lowers the interest you pay, and reduces the risk of being 'underwater' on the loan. Aim for at least 10–20% down." },
      { question: "How does loan term affect total cost?", answer: "A longer term (72 or 84 months) lowers your monthly payment but increases total interest paid. A shorter term costs more per month but less overall — and you build equity faster." }
    ],
    howToSteps: [
      { name: "Enter the vehicle details", text: "Input the purchase price, down payment, trade-in value, and any applicable taxes or fees." },
      { name: "Set loan terms", text: "Enter the loan interest rate and term length in months." },
      { name: "Review payment and total cost", text: "See your monthly payment, total interest, and total amount paid over the loan." }
    ],
    useCases: ["Budgeting for a new or used car purchase", "Comparing loan offers from different lenders", "Deciding between a shorter or longer loan term", "Evaluating the financial impact of a trade-in"],
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "debt-payoff-calculator"]
  },
  { slug: "break-even-calculator", name: "Break-Even Calculator", description: "Calculate the break-even point for your business or product.", category: "finance", icon: "⚖️", keywords: ["break even", "break even point", "business calculator", "cost analysis"], subcategory: "business", template: "simple-calculator",
    longDescription: "Determine exactly how many units you need to sell — or how much revenue you need to generate — to cover all costs with this Break-Even Calculator. Enter your fixed costs, variable cost per unit, and selling price to find your break-even point in both units and dollars. A fundamental analysis for launching any product or business.",
    faqs: [
      { question: "What is break-even analysis?", answer: "Break-even analysis identifies the point where total revenue equals total costs, meaning no profit or loss. Selling above this point generates profit; below it generates a loss." },
      { question: "What is the break-even formula?", answer: "Break-Even Units = Fixed Costs / (Selling Price per Unit - Variable Cost per Unit). The denominator is called the contribution margin per unit." },
      { question: "How do fixed and variable costs differ?", answer: "Fixed costs stay constant regardless of output (rent, salaries, insurance). Variable costs change with production volume (materials, direct labor, shipping)." }
    ],
    howToSteps: [
      { name: "Enter your fixed costs", text: "Input all costs that don't change with production volume, such as rent and salaries." },
      { name: "Enter variable cost and price", text: "Input the variable cost per unit and the selling price per unit." },
      { name: "See the break-even point", text: "Review how many units you must sell and the revenue needed to break even." }
    ],
    useCases: ["Evaluating whether a new product launch is financially viable", "Setting minimum pricing to cover all costs", "Planning sales targets for a new business", "Analyzing the impact of a price change on profitability"],
    relatedSlugs: ["margin-calculator", "roi-calculator", "stock-profit-calculator"]
  },
  { slug: "stock-profit-calculator", name: "Stock Profit Calculator", description: "Calculate profit or loss from stock trades including fees and taxes.", category: "finance", icon: "📊", keywords: ["stock profit", "stock calculator", "trading calculator", "investment profit"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Calculate your exact profit or loss on a stock trade — including brokerage fees and capital gains taxes — with this Stock Profit Calculator. Enter the number of shares, buy price, sell price, and any commissions to see your net gain, return percentage, and estimated tax impact. Know your real profit before and after tax.",
    faqs: [
      { question: "How are stock profits taxed?", answer: "In the U.S., stocks held less than a year are taxed as short-term capital gains (ordinary income rates). Stocks held over a year qualify for long-term capital gains rates of 0%, 15%, or 20% depending on your income." },
      { question: "Should I include brokerage fees in profit calculations?", answer: "Yes, always include fees. While many brokers now offer commission-free trades, some still charge per trade. Even small fees add up and reduce your effective return, especially on smaller trades." },
      { question: "What is the difference between realized and unrealized gains?", answer: "A realized gain occurs when you actually sell the stock and lock in the profit. An unrealized gain (paper profit) is the increase in value of shares you still hold and have not sold." }
    ],
    howToSteps: [
      { name: "Enter trade details", text: "Input the number of shares, buy price per share, and sell price per share." },
      { name: "Add fees and tax rate", text: "Enter any brokerage commissions and your applicable capital gains tax rate." },
      { name: "Review net profit", text: "See your gross profit, fees, estimated tax, and final net profit or loss." }
    ],
    useCases: ["Calculating profit on a completed stock sale", "Estimating tax liability before selling shares", "Comparing the net return of different trade scenarios", "Tracking overall trading performance across multiple positions"],
    relatedSlugs: ["roi-calculator", "cagr-calculator", "compound-interest"]
  },
  { slug: "cagr-calculator", name: "CAGR Calculator", description: "Calculate Compound Annual Growth Rate for investments.", category: "finance", icon: "📈", keywords: ["cagr", "compound annual growth rate", "growth rate calculator", "investment growth"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Measure the steady annual growth rate of an investment over any time period with this CAGR Calculator. Enter the beginning value, ending value, and number of years to get the Compound Annual Growth Rate — the single rate that represents consistent growth from start to finish. CAGR is the gold standard for comparing investments held over different time periods.",
    faqs: [
      { question: "What is CAGR and why is it useful?", answer: "CAGR (Compound Annual Growth Rate) smooths out year-to-year volatility to show the equivalent steady annual rate of growth. It's ideal for comparing investments, business metrics, or any value that grows over multiple years." },
      { question: "What is the CAGR formula?", answer: "CAGR = (Ending Value / Beginning Value) ^ (1 / Number of Years) - 1. For example, an investment that grows from $10,000 to $16,105 over 5 years has a CAGR of 10%." },
      { question: "What is a good CAGR for an investment?", answer: "The S&P 500 has historically delivered a CAGR of around 10% before inflation. A CAGR above 15% is considered strong for a diversified portfolio; individual stocks or funds may exceed this." }
    ],
    howToSteps: [
      { name: "Enter start and end values", text: "Input the initial investment value and the final value at the end of the period." },
      { name: "Set the time period", text: "Enter the number of years over which the growth occurred." },
      { name: "Use your CAGR", text: "Compare the resulting CAGR against benchmarks or other investments to evaluate performance." }
    ],
    useCases: ["Comparing the performance of two investments held over different periods", "Calculating the growth rate of a company's revenue or earnings", "Evaluating mutual fund or ETF performance", "Projecting future investment value at a target growth rate"],
    relatedSlugs: ["roi-calculator", "compound-interest", "stock-profit-calculator"]
  },
  { slug: "emi-calculator", name: "EMI Calculator", description: "Calculate Equated Monthly Installments for loans.", category: "finance", icon: "🏦", keywords: ["emi calculator", "loan emi", "monthly installment", "emi formula"], subcategory: "loans", template: "simple-calculator",
    longDescription: "Calculate your Equated Monthly Installment (EMI) for any loan with this EMI Calculator. Enter the principal amount, annual interest rate, and loan tenure to instantly see your fixed monthly payment and the total interest payable over the loan term. Widely used for home loans, car loans, and personal loans in India and globally.",
    faqs: [
      { question: "What is an EMI?", answer: "An Equated Monthly Installment (EMI) is a fixed payment made by a borrower to a lender on a specified date each month. It includes both the principal repayment and the interest component." },
      { question: "What is the EMI formula?", answer: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate, and n is the number of monthly installments." },
      { question: "Can I reduce my EMI?", answer: "Yes. You can reduce your EMI by making a larger down payment (reducing principal), choosing a longer tenure, or negotiating a lower interest rate with your lender." }
    ],
    howToSteps: [
      { name: "Enter loan amount", text: "Input the total principal amount you wish to borrow." },
      { name: "Set interest rate and tenure", text: "Enter the annual interest rate and the loan repayment period in months or years." },
      { name: "Review your EMI", text: "See your fixed monthly installment, total interest payable, and total repayment amount." }
    ],
    useCases: ["Planning a home loan in India or other markets", "Calculating monthly payments on a personal loan", "Comparing EMIs across different loan tenures", "Budgeting monthly expenses around a fixed loan commitment"],
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "auto-loan-calculator"]
  },
  { slug: "rental-yield-calculator", name: "Rental Yield Calculator", description: "Calculate gross and net rental yield on investment properties.", category: "finance", icon: "🏘️", keywords: ["rental yield", "property yield", "rental return", "investment property"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Evaluate the profitability of a rental property investment with this Rental Yield Calculator. Enter the property value, annual rental income, and ongoing costs to calculate both gross and net rental yield percentages. A critical metric for property investors comparing opportunities across different markets and property types.",
    faqs: [
      { question: "What is rental yield?", answer: "Rental yield is the annual rental income expressed as a percentage of the property's purchase price. Gross yield uses income only; net yield deducts expenses like maintenance, insurance, and management fees." },
      { question: "What is a good rental yield?", answer: "A gross rental yield of 5–8% is generally considered good in most markets. Net yields of 3–5% after expenses are common. High-yield areas may offer 8–12% but often come with higher risk or lower capital growth." },
      { question: "What is the difference between rental yield and capital growth?", answer: "Rental yield measures income return (rent as % of property value). Capital growth measures how much the property's value increases over time. Total return combines both." }
    ],
    howToSteps: [
      { name: "Enter property details", text: "Input the purchase price of the property and the annual rental income." },
      { name: "Add annual expenses", text: "Enter ongoing costs such as maintenance, insurance, property management, and vacancy allowance." },
      { name: "Compare yield figures", text: "Review gross and net yield percentages to evaluate the investment's income return." }
    ],
    useCases: ["Comparing rental returns across different investment properties", "Deciding whether a property price is justified by its rent", "Calculating net yield after deducting management fees and costs", "Benchmarking property performance against other investment options"],
    relatedSlugs: ["mortgage-calculator", "roi-calculator", "break-even-calculator"]
  },
  { slug: "credit-card-payoff", name: "Credit Card Payoff Calculator", description: "See how long it takes to pay off credit card debt with minimum payments.", category: "finance", icon: "💳", keywords: ["credit card payoff", "credit card calculator", "minimum payment", "debt free date"], subcategory: "loans", template: "simple-calculator",
    longDescription: "Discover the true cost of credit card debt with this Credit Card Payoff Calculator. Enter your balance, interest rate, and monthly payment to see exactly how long payoff will take and how much interest you will pay in total. See how increasing your payment — even slightly — can save you thousands of dollars and years of debt.",
    faqs: [
      { question: "Why does it take so long to pay off a credit card with minimum payments?", answer: "Minimum payments are typically 1–2% of the balance plus interest. This means most of the payment goes to interest, barely reducing the principal. On a $5,000 balance at 20% APR, minimum-only payments can take over 20 years." },
      { question: "What is a typical credit card interest rate?", answer: "Average credit card APRs in the U.S. range from 20–29% as of recent years. Rewards cards and store cards often carry rates at the higher end of this range." },
      { question: "What is the best strategy for paying off multiple credit cards?", answer: "The avalanche method (pay highest APR first) saves the most in interest. The snowball method (pay smallest balance first) builds momentum. Use the Debt Payoff Calculator to model both strategies." }
    ],
    howToSteps: [
      { name: "Enter your credit card balance", text: "Input your current outstanding credit card balance." },
      { name: "Set interest rate and payment", text: "Enter your card's APR and the monthly payment amount you plan to make." },
      { name: "See your payoff timeline", text: "Review the months to payoff, total interest paid, and the savings from paying more." }
    ],
    useCases: ["Understanding the real cost of carrying a credit card balance", "Motivating faster repayment by seeing total interest charges", "Deciding how much to pay each month to be debt-free by a target date", "Comparing the impact of a balance transfer to a lower-rate card"],
    relatedSlugs: ["debt-payoff-calculator", "compound-interest", "loan-calculator"]
  },
  { slug: "net-worth-calculator", name: "Net Worth Calculator", description: "Calculate your total net worth from assets and liabilities.", category: "finance", icon: "💰", keywords: ["net worth", "net worth calculator", "assets liabilities", "financial health"], subcategory: "investment", template: "simple-calculator",
    longDescription: "Get a clear snapshot of your financial health with this Net Worth Calculator. List all your assets (savings, investments, property, vehicles) and liabilities (mortgages, loans, credit card debt) to instantly calculate your net worth. Tracking net worth over time is one of the most powerful ways to measure financial progress.",
    faqs: [
      { question: "What is net worth?", answer: "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). A positive net worth means your assets exceed your debts; a negative net worth means you owe more than you own." },
      { question: "What is the average net worth by age?", answer: "According to the U.S. Federal Reserve, median net worth by age varies widely: under 35: ~$39,000; 35–44: ~$135,000; 45–54: ~$248,000; 55–64: ~$365,000. These are medians — averages are much higher due to wealth concentration at the top." },
      { question: "How often should I calculate my net worth?", answer: "Most financial advisors recommend calculating your net worth quarterly or at least annually. Tracking it over time shows whether you are building wealth or falling behind your goals." }
    ],
    howToSteps: [
      { name: "List all your assets", text: "Enter the current value of all assets: cash, investments, retirement accounts, home equity, vehicles, and other valuables." },
      { name: "List all your liabilities", text: "Enter all outstanding debts: mortgage balance, car loans, student loans, credit card balances, and personal loans." },
      { name: "Review your net worth", text: "See your total net worth and the breakdown of assets vs. liabilities to understand your overall financial position." }
    ],
    useCases: ["Taking an annual financial health check", "Setting a net worth growth target for the coming year", "Tracking progress toward financial independence", "Preparing financial documents for a loan application or financial advisor"],
    relatedSlugs: ["retirement-calculator", "savings-goal-calculator", "compound-interest"]
  },
  { slug: "payroll-calculator", name: "Payroll Calculator", description: "Calculate gross pay, tax deductions, and net pay for employees.", category: "finance", icon: "💵", keywords: ["payroll calculator", "salary calculator", "net pay", "take home pay"], subcategory: "business", template: "simple-calculator",
    longDescription: "Calculate employee take-home pay after federal taxes, Social Security, and Medicare deductions with this Payroll Calculator. Enter gross wages, pay frequency, and filing status to see a detailed breakdown of all deductions and the final net pay amount. Useful for both employers running payroll and employees verifying their paychecks.",
    faqs: [
      { question: "What deductions are taken from a paycheck?", answer: "Standard paycheck deductions include federal income tax (based on W-4), Social Security (6.2%), and Medicare (1.45%). Additional deductions may include state income tax, health insurance premiums, and 401(k) contributions." },
      { question: "What is the difference between gross pay and net pay?", answer: "Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you actually receive after all taxes and deductions are subtracted." },
      { question: "How do I reduce payroll tax withholding?", answer: "You can adjust your federal withholding by updating your W-4 form with your employer. Claiming more allowances or a larger personal deduction reduces the amount withheld each paycheck." }
    ],
    howToSteps: [
      { name: "Enter gross wages", text: "Input the employee's gross pay for the pay period (hourly rate × hours or fixed salary amount)." },
      { name: "Set filing status and pay frequency", text: "Select the employee's filing status and whether pay is weekly, biweekly, semimonthly, or monthly." },
      { name: "Review the net pay breakdown", text: "See a line-by-line breakdown of all deductions and the final net (take-home) pay amount." }
    ],
    useCases: ["Verifying that a paycheck reflects the correct deductions", "Estimating take-home pay for a new job offer", "Running payroll calculations for a small business with hourly employees", "Understanding how a raise affects net pay after taxes"],
    relatedSlugs: ["salary-to-hourly", "tax-estimator", "vat-calculator"]
  },
  { slug: "currency-exchange-calculator", name: "Currency Exchange Calculator", description: "Calculate currency exchange amounts with real-time rates and fees.", category: "finance", icon: "💱", keywords: ["currency exchange", "forex calculator", "money exchange", "exchange rate"], subcategory: "crypto", template: "simple-calculator",
    longDescription: "Convert any amount between world currencies and account for exchange fees with this Currency Exchange Calculator. Enter the amount, source currency, target currency, and any service fee percentage to see exactly how much you'll receive after conversion costs. Essential for international travel, cross-border business, and wire transfers.",
    faqs: [
      { question: "Why do I get less than the published exchange rate?", answer: "Banks and exchange services add a spread (markup) on top of the mid-market rate, plus may charge flat fees. This calculator lets you input the actual rate and fee so you can see the true cost of the conversion." },
      { question: "What is the mid-market rate?", answer: "The mid-market rate (also called the interbank rate) is the midpoint between buy and sell prices of a currency. It is the 'real' exchange rate and the one you see on Google or Reuters. Retail customers almost never get this rate." },
      { question: "Is it better to exchange currency before or after traveling?", answer: "It depends. Airport kiosks and hotel desks typically offer the worst rates. Using a no-foreign-transaction-fee credit card or withdrawing from a local ATM abroad often gives you the best effective rate." }
    ],
    howToSteps: [
      { name: "Enter the amount to convert", text: "Input how much money you want to exchange in the source currency." },
      { name: "Select currencies and rate", text: "Choose the source and target currencies and enter the current exchange rate." },
      { name: "Add fees and review result", text: "Enter any applicable service fees to see the exact amount you will receive after all costs." }
    ],
    useCases: ["Calculating how much foreign currency to bring on a trip", "Comparing exchange rates from different providers", "Estimating the cost of an international wire transfer", "Converting international invoices or pricing to local currency"],
    relatedSlugs: ["currency-converter", "inflation-calculator", "vat-calculator"]
  },
  // ── New (10) ──────────────────────────────────────────
  { slug: "tip-splitter", name: "Tip & Bill Splitter", description: "Split a restaurant bill and calculate tip amounts per person.", category: "finance", icon: "🍽️", keywords: ["tip calculator", "bill splitter", "split bill", "restaurant tip", "tip per person"], subcategory: "personal",
    longDescription: "Calculate tip amounts and split any bill evenly among a group of people. Enter the subtotal, choose a tip percentage, and specify the number of people to instantly see the tip per person, total per person, and grand total. Also supports uneven splits where individuals have different sub-totals.",
    faqs: [
      { question: "Can I split the bill unevenly?", answer: "Yes — in detailed mode, enter each person's individual subtotal and the tool calculates a proportional tip and total for each person based on their share of the bill." },
      { question: "What tip percentages are standard?", answer: "In the United States, 15% is the minimum customary tip, 18% is common, and 20% is standard for good service. The tool includes quick-select buttons for common percentages." }
    ],
    howToSteps: [
      { name: "Enter the bill amount", text: "Type the total before tip and taxes." },
      { name: "Choose tip and party size", text: "Select a tip percentage and enter how many people are splitting the bill." },
      { name: "View per-person amounts", text: "See tip per person, total per person, and the grand total instantly." }
    ],
    useCases: ["Splitting restaurant bills at group dinners", "Calculating fair tip amounts for large parties", "Settling bar tabs or food delivery orders among friends", "Teaching tip calculation as a real-world maths application"],
    relatedSlugs: ["percentage-calculator", "vat-calculator", "hourly-rate-calculator"]
  },
  { slug: "hourly-rate-calculator", name: "Freelance Hourly Rate Calculator", description: "Calculate the minimum hourly rate needed to meet your income goals.", category: "finance", icon: "💼", keywords: ["hourly rate", "freelance rate", "contractor rate", "billable rate", "day rate"], subcategory: "business",
    longDescription: "Calculate the hourly billing rate you need to charge as a freelancer or contractor to meet your target annual income. Input your desired net income, estimated tax rate, number of billable hours per week, and weeks worked per year to get the minimum hourly rate that covers your take-home pay, taxes, and business expenses.",
    faqs: [
      { question: "Why should my freelance rate be higher than a salaried equivalent?", answer: "As a freelancer you pay self-employment tax (in the US, ~15.3%), cover your own benefits (health, retirement), pay for software and equipment, and have unpaid hours for admin, marketing, and gaps between projects. These factors significantly increase the required rate." },
      { question: "What is a billable utilisation rate?", answer: "Utilisation rate is the percentage of your working hours that are actually billed to clients. A typical freelancer bills 60-75% of their time — the rest is admin, business development, and training. Enter your realistic utilisation to get an accurate rate." }
    ],
    howToSteps: [
      { name: "Enter your income target", text: "Input your desired annual take-home income." },
      { name: "Add costs and tax", text: "Enter your estimated tax rate, annual business expenses, and billable hours per week." },
      { name: "See your minimum rate", text: "The calculator shows the hourly rate you must charge to meet your target income." }
    ],
    useCases: ["Setting a freelance day rate for client proposals", "Comparing freelance income potential vs salaried employment", "Calculating the minimum viable rate before taking on a project", "Planning income and pricing as a new independent contractor"],
    relatedSlugs: ["tip-splitter", "roi-calculator", "markup-to-margin"]
  },
  { slug: "cost-per-unit", name: "Cost Per Unit Calculator", description: "Calculate cost per unit to compare product value and buying efficiency.", category: "finance", icon: "🏷️", keywords: ["cost per unit", "unit price", "price per item", "cost comparison", "value calculator"], subcategory: "personal",
    longDescription: "Compare the true cost per unit between different product sizes, package quantities, or supplier prices. Enter the total price and quantity for each option to instantly calculate and compare the cost per unit, helping you identify the best-value purchase every time.",
    faqs: [
      { question: "What counts as a 'unit'?", answer: "A unit can be any measurable quantity — items, ounces, grams, litres, metres, etc. The tool compares price-per-unit across all options using whatever unit you specify." },
      { question: "Can I compare more than two options?", answer: "Yes — add up to six product options to compare simultaneously. The best value is highlighted automatically." }
    ],
    howToSteps: [
      { name: "Enter the first product", text: "Input the price and quantity (number of units or weight) for the first product." },
      { name: "Add more options", text: "Add additional product variants or competitor prices with their respective quantities." },
      { name: "Compare", text: "The cost per unit for each option is calculated and the best value is highlighted." }
    ],
    useCases: ["Comparing supermarket product sizes to find the best value", "Evaluating bulk purchase savings against single-unit prices", "Comparing supplier quotes on a per-unit basis", "Teaching price comparison and consumer maths skills"],
    relatedSlugs: ["markup-to-margin", "percentage-calculator", "tip-splitter"]
  },
  { slug: "markup-to-margin", name: "Markup to Margin Converter", description: "Convert between markup percentage and profit margin percentage.", category: "finance", icon: "📊", keywords: ["markup to margin", "profit margin", "markup calculator", "margin markup", "gross margin"], subcategory: "business",
    longDescription: "Convert between markup (percentage above cost) and gross profit margin (percentage of selling price) instantly. Markup and margin are often confused — this tool clarifies the relationship, converts between the two, and calculates the selling price and profit amount from any combination of cost, markup, or margin inputs.",
    faqs: [
      { question: "What is the difference between markup and margin?", answer: "Markup is profit as a percentage of cost: Markup% = (Profit / Cost) × 100. Margin is profit as a percentage of selling price: Margin% = (Profit / Selling Price) × 100. A 50% markup equals a 33.3% margin — they are not the same." },
      { question: "Which should I use in business?", answer: "Retailers typically think in margin terms (it's directly tied to revenue percentage). Manufacturers and product companies often use markup (it's directly tied to cost). Knowing both helps prevent pricing errors." }
    ],
    howToSteps: [
      { name: "Enter cost and markup or margin", text: "Input your cost price and either the markup percentage or the margin percentage." },
      { name: "Convert", text: "The tool instantly shows the equivalent markup, margin, selling price, and profit amount." },
      { name: "Use the pricing data", text: "Apply the results to price your products correctly for your target margin." }
    ],
    useCases: ["Pricing products to achieve a target profit margin", "Converting between markup and margin for financial reporting", "Checking that supplier pricing meets margin requirements", "Teaching the markup vs margin distinction in business education"],
    relatedSlugs: ["cost-per-unit", "roi-calculator", "hourly-rate-calculator"]
  },
  { slug: "simple-interest-calculator", name: "Simple Interest Calculator", description: "Calculate simple interest on a loan or investment.", category: "finance", icon: "📈", keywords: ["simple interest", "interest calculator", "principal interest", "loan interest"], subcategory: "investing",
    longDescription: "Calculate simple interest earned or owed on a principal amount at a fixed annual rate over any time period. Shows total interest, final amount, and a year-by-year breakdown. Useful for short-term loans, bonds, and basic investment return estimates.",
    faqs: [
      { question: "What is the simple interest formula?", answer: "Simple Interest = Principal × Rate × Time, where Rate is the annual interest rate as a decimal and Time is the number of years. The total amount is Principal + Simple Interest." },
      { question: "How does simple interest differ from compound interest?", answer: "In simple interest, interest is calculated only on the original principal. In compound interest, interest is calculated on the principal plus previously earned interest. Simple interest produces a lower return/cost over time for the same rate." }
    ],
    howToSteps: [
      { name: "Enter the principal", text: "Input the starting loan or investment amount." },
      { name: "Set rate and time", text: "Enter the annual interest rate (%) and the loan or investment duration in years." },
      { name: "View the results", text: "See the interest amount, total value, and annual breakdown table." }
    ],
    useCases: ["Estimating interest on a short-term personal loan", "Calculating returns on Treasury bills or short-term bonds", "Teaching interest concepts in financial literacy courses", "Comparing simple vs compound interest scenarios"],
    relatedSlugs: ["future-value-calculator", "compound-interest-calculator", "present-value-calculator"]
  },
  { slug: "future-value-calculator", name: "Future Value Calculator", description: "Calculate the future value of an investment with regular contributions.", category: "finance", icon: "📈", keywords: ["future value", "investment growth", "fv calculator", "savings calculator"], subcategory: "investing",
    longDescription: "Calculate the future value of a lump-sum investment or regular savings contributions over time with compound interest. Enter the present value, annual contribution, interest rate, and number of years to project investment growth and see a year-by-year accumulation table.",
    faqs: [
      { question: "What is future value?", answer: "Future Value (FV) is the projected value of a current asset or investment at a specific date in the future, based on an assumed growth rate. FV = PV × (1 + r)^n for lump sums, plus the future value of any regular contributions." },
      { question: "Does it account for regular contributions?", answer: "Yes — you can enter a recurring contribution amount (monthly or annual) alongside the initial lump sum to model a savings or investment plan with regular deposits." }
    ],
    howToSteps: [
      { name: "Enter present value and rate", text: "Input the initial investment amount and expected annual interest or growth rate." },
      { name: "Add contributions and timeframe", text: "Optionally add regular contribution amount and select the investment period in years." },
      { name: "View growth projection", text: "See the future value and a year-by-year growth chart." }
    ],
    useCases: ["Projecting retirement savings growth over time", "Estimating investment portfolio value at a target date", "Planning education fund contributions and growth", "Comparing scenarios with different contribution amounts or rates"],
    relatedSlugs: ["present-value-calculator", "compound-interest-calculator", "simple-interest-calculator"]
  },
  { slug: "present-value-calculator", name: "Present Value Calculator", description: "Calculate the present value of a future sum or cash flow stream.", category: "finance", icon: "📉", keywords: ["present value", "discounted value", "pv calculator", "discount rate", "npv"], subcategory: "investing",
    longDescription: "Calculate the present value (PV) of a future lump sum or a series of future cash flows using a discount rate. Useful for investment valuation, bond pricing, lease analysis, and determining whether a future payment is worth a given amount today.",
    faqs: [
      { question: "What is present value?", answer: "Present Value is today's worth of a future amount, discounted at a given rate. PV = FV / (1 + r)^n. It reflects the principle that money today is worth more than the same amount in the future due to its earning potential." },
      { question: "What discount rate should I use?", answer: "The discount rate represents your required rate of return or opportunity cost. Common choices are the inflation rate, the risk-free rate (Treasury bond yield), or your personal investment hurdle rate." }
    ],
    howToSteps: [
      { name: "Enter the future value", text: "Input the amount you expect to receive in the future." },
      { name: "Set discount rate and time", text: "Enter the annual discount rate and the number of years until the payment." },
      { name: "Calculate present value", text: "Click Calculate to see what the future amount is worth in today's money." }
    ],
    useCases: ["Valuing a future lump-sum payment in today's terms", "Calculating the present value of a bond's future cash flows", "Comparing lease vs buy decisions for equipment", "Evaluating whether a future investment payout justifies the current cost"],
    relatedSlugs: ["future-value-calculator", "compound-interest-calculator", "roi-calculator"]
  },
  { slug: "dividend-calculator", name: "Dividend Yield Calculator", description: "Calculate dividend yield, annual income, and dividend growth projections.", category: "finance", icon: "💰", keywords: ["dividend yield", "dividend calculator", "dividend income", "stock dividend"], subcategory: "investing",
    longDescription: "Calculate dividend yield from stock price and annual dividend, estimate annual dividend income from your total investment, and project dividend growth over multiple years using the dividend growth model. Includes DRIP (dividend reinvestment) projection to show compounded growth.",
    faqs: [
      { question: "How is dividend yield calculated?", answer: "Dividend Yield = (Annual Dividend Per Share / Stock Price) × 100. For example, a stock paying $2 per year trading at $40 has a 5% dividend yield." },
      { question: "What is DRIP?", answer: "DRIP stands for Dividend Reinvestment Plan. Instead of receiving cash dividends, they are automatically used to buy more shares. The compounding effect of DRIP can significantly increase total returns over time." }
    ],
    howToSteps: [
      { name: "Enter stock details", text: "Input the current stock price, annual dividend per share, and your total investment amount." },
      { name: "Set growth assumptions", text: "Enter an expected annual dividend growth rate and investment period for projections." },
      { name: "View income projections", text: "See annual dividend income, yield, and projected growth with and without DRIP." }
    ],
    useCases: ["Evaluating dividend-paying stocks for income investing", "Projecting passive income from a dividend portfolio", "Comparing dividend yield across different stocks", "Planning retirement income from dividend investments"],
    relatedSlugs: ["future-value-calculator", "roi-calculator", "compound-interest-calculator"]
  },
  { slug: "rent-vs-buy", name: "Rent vs Buy Calculator", description: "Compare the true cost of renting vs buying a home over time.", category: "finance", icon: "🏠", keywords: ["rent vs buy", "renting vs buying", "home buying calculator", "mortgage vs rent"], subcategory: "personal",
    longDescription: "Compare the long-term financial impact of renting versus buying a home. Input purchase price, down payment, mortgage rate, rent amount, and investment assumptions to see the net cost of each option over your chosen time horizon, including home appreciation, equity build-up, opportunity cost, and transaction costs.",
    faqs: [
      { question: "Is it always better to buy than rent?", answer: "Not necessarily — it depends on your market, how long you stay, your down payment, and what you could earn by investing that down payment instead. This calculator shows the break-even point where buying becomes more cost-effective." },
      { question: "What factors does the calculator account for?", answer: "For buying: mortgage payments, property tax, insurance, maintenance (1-2% of value/year), HOA, closing costs, and home appreciation. For renting: monthly rent, annual rent increases, and the investment return on the down payment." }
    ],
    howToSteps: [
      { name: "Enter home purchase details", text: "Input the purchase price, down payment, mortgage rate, and loan term." },
      { name: "Enter rental and investment details", text: "Input the monthly rent, expected rent increase, and assumed investment return rate." },
      { name: "Compare over time", text: "View the net cost comparison and break-even timeline chart for both options." }
    ],
    useCases: ["Deciding whether to buy or continue renting in your housing market", "Calculating how long you need to stay in a home for buying to make sense", "Comparing home ownership costs vs renting and investing the difference", "Presenting a financial analysis before making a home purchase decision"],
    relatedSlugs: ["mortgage-calculator", "present-value-calculator", "compound-interest-calculator"]
  },
  { slug: "cost-of-living-calculator", name: "Cost of Living Calculator", description: "Estimate the salary needed to maintain your lifestyle in a new city.", category: "finance", icon: "🌆", keywords: ["cost of living", "salary comparison", "city cost comparison", "relocation calculator"], subcategory: "personal",
    longDescription: "Estimate how much salary you need in a new city to maintain the same standard of living as your current location. Enter your current city, target city, and current salary to get a cost-adjusted salary recommendation based on relative costs of housing, food, transport, healthcare, and utilities.",
    faqs: [
      { question: "How is the cost of living index calculated?", answer: "The calculator uses relative cost indices for major expense categories — housing (the largest factor), groceries, transport, healthcare, and utilities. These are weighted by their typical share of household spending to produce an overall adjustment factor." },
      { question: "Is the comparison accurate for all cities?", answer: "The tool provides estimates based on average cost indices and is most useful for ballpark comparisons and salary negotiation starting points. Actual costs vary significantly by neighbourhood, lifestyle, and individual circumstances." }
    ],
    howToSteps: [
      { name: "Enter your current situation", text: "Select your current city and input your current annual salary." },
      { name: "Choose your target city", text: "Select the city you are considering moving to." },
      { name: "View the adjusted salary", text: "See the equivalent salary needed in the target city, with a category-by-category cost breakdown." }
    ],
    useCases: ["Negotiating salary for a job offer in a new city", "Evaluating a remote work relocation decision financially", "Comparing the real value of job offers in different locations", "Planning an international or interstate move budget"],
    relatedSlugs: ["rent-vs-buy", "hourly-rate-calculator", "inflation-calculator"]
  },
];
