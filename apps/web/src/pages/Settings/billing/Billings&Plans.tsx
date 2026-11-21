import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Download,
  ArrowRight,
  Zap,
  Building2,
  Rocket,
  ShieldCheck,
  Check,
} from "lucide-react";

// Mock Data
const currentPlan = {
  name: "Pro",
  price: "$49/mo",
  usageUsed: 750000,
  usageLimit: 1000000,
};

const availablePlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic limits",
    features: ["10k API Requests/mo", "1 Project", "Community Support"],
    icon: Zap,
    cta: "Choose Plan",
    isCurrent: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "Higher limits",
    features: ["1M API Requests/mo", "10 Projects", "Priority Support"],
    icon: Rocket,
    cta: "Current Plan",
    isCurrent: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom limits",
    features: ["Unlimited API Requests", "Unlimited Projects", "Dedicated Account Manager"],
    icon: Building2,
    cta: "Contact Sales",
    isCurrent: false,
  },
];

const billingHistory = [
  {
    id: "INV-2023-010",
    date: "Oct 01, 2023",
    description: "Pro Plan - Monthly",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2023-009",
    date: "Sep 01, 2023",
    description: "Pro Plan - Monthly",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2023-008",
    date: "Aug 01, 2023",
    description: "Pro Plan - Monthly",
    amount: "$49.00",
    status: "Paid",
  },
];

export default function BillingAndPlans(): React.ReactElement {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Calculate usage percentage
  const usagePercentage = Math.min(
    (currentPlan.usageUsed / currentPlan.usageLimit) * 100,
    100
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <CreditCard size={24} className="text-blue-500" />
          BILLING & PLANS
        </h1>
      </div>

      {/* CURRENT PLAN SECTION */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Current Plan
        </h2>
        
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 shadow-sm dark:border-blue-900/50 dark:bg-blue-500/5">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            
            {/* Plan Info & Usage */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentPlan.name} Plan
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {currentPlan.price}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>Monthly Usage</span>
                  <span>
                    {(currentPlan.usageUsed / 1000).toFixed(0)}k / {(currentPlan.usageLimit / 1000000).toFixed(1)}M API Requests
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800">
                [Manage Subscription]
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                [Upgrade Plan]
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABLE PLANS SECTION */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Available Plans
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {availablePlans.map((plan) => {
            const Icon = plan.icon;
            const isCurrent = plan.isCurrent;

            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative flex flex-col rounded-xl border p-6 shadow-sm transition-all duration-200 ${
                  isCurrent
                    ? "border-blue-500 bg-white dark:border-blue-500 dark:bg-[#111827]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-[#111827] dark:hover:border-slate-700"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Current Plan
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${isCurrent ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-slate-500 dark:text-slate-400">/mo</span>
                  )}
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrent}
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isCurrent
                      ? "bg-slate-100 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400"
                      : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  }`}
                >
                  [{plan.cta}]
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* BILLING HISTORY SECTION */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Billing History
        </h2>
        
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["Date", "Description", "Amount", "Status", "Invoice"].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {billingHistory.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {invoice.date}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {invoice.description}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-slate-900 dark:text-white">
                      {invoice.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          invoice.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                      >
                        {invoice.status === "Paid" && <Check size={12} />}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                        <Download size={14} />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}