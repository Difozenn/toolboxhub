"use client";

import { useState, useCallback } from "react";

interface PolicyConfig {
  websiteName: string;
  websiteUrl: string;
  contactEmail: string;
  effectiveDate: string;
  collectsPersonalData: boolean;
  usesCookies: boolean;
  usesAnalytics: boolean;
  hasNewsletter: boolean;
  hasUserAccounts: boolean;
  processesPayments: boolean;
  gdpr: boolean;
  ccpa: boolean;
}

function generatePolicy(c: PolicyConfig): string {
  const name = c.websiteName || "[Website Name]";
  const url = c.websiteUrl || "[Website URL]";
  const email = c.contactEmail || "[Contact Email]";
  const date = c.effectiveDate || "[Effective Date]";

  const sections: string[] = [];

  sections.push(`PRIVACY POLICY\n\nEffective Date: ${date}\n`);

  sections.push(
    `1. INTRODUCTION\n\nWelcome to ${name}. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ${url}. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.\n`
  );

  if (c.collectsPersonalData) {
    sections.push(
      `2. INFORMATION WE COLLECT\n\nWe may collect information about you in a variety of ways. The information we may collect on the site includes:\n\n- Personal Data: Personally identifiable information such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.\n\n- Derivative Data: Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.\n`
    );
  }

  if (c.usesCookies) {
    sections.push(
      `${c.collectsPersonalData ? "3" : "2"}. COOKIES\n\nWe may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. When you access the site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site.\n`
    );
  }

  if (c.usesAnalytics) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    sections.push(
      `${n}. ANALYTICS\n\nWe may use third-party analytics services, including Google Analytics, to evaluate your use of the site, compile reports on activity, collect demographic data, and analyze performance metrics. These third parties use cookies and other technologies to help analyze and provide us the data. By accessing and using the site, you consent to the processing of data about you by these analytics providers in the manner and for the purposes set out in this privacy policy.\n`
    );
  }

  if (c.hasNewsletter) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    if (c.usesAnalytics) n++;
    sections.push(
      `${n}. NEWSLETTER\n\nIf you have opted in to receive our newsletter, we will use your email address to send you periodic updates. You may opt out of receiving these communications at any time by clicking the unsubscribe link in any email we send, or by contacting us at ${email}.\n`
    );
  }

  if (c.hasUserAccounts) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    if (c.usesAnalytics) n++;
    if (c.hasNewsletter) n++;
    sections.push(
      `${n}. USER ACCOUNTS\n\nWhen you create an account on our site, we store the information you provide, including your name, email address, and password (encrypted). You are responsible for maintaining the confidentiality of your account credentials. You may update or delete your account information at any time by logging into your account settings or by contacting us at ${email}.\n`
    );
  }

  if (c.processesPayments) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    if (c.usesAnalytics) n++;
    if (c.hasNewsletter) n++;
    if (c.hasUserAccounts) n++;
    sections.push(
      `${n}. PAYMENT PROCESSING\n\nWe may use third-party payment processors to process payments made to us. We do not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their own privacy policies. We recommend reviewing their privacy policies before providing your payment information.\n`
    );
  }

  if (c.gdpr) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    if (c.usesAnalytics) n++;
    if (c.hasNewsletter) n++;
    if (c.hasUserAccounts) n++;
    if (c.processesPayments) n++;
    sections.push(
      `${n}. GDPR COMPLIANCE (European Users)\n\nIf you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.\n\nYour rights include:\n- The right to access, update, or delete the information we have on you.\n- The right of rectification if your information is inaccurate or incomplete.\n- The right to object to our processing of your personal data.\n- The right of restriction to request that we restrict the processing of your personal data.\n- The right to data portability to receive a copy of your data in a structured, machine-readable format.\n- The right to withdraw consent at any time.\n\nTo exercise any of these rights, please contact us at ${email}.\n`
    );
  }

  if (c.ccpa) {
    let n = 2;
    if (c.collectsPersonalData) n++;
    if (c.usesCookies) n++;
    if (c.usesAnalytics) n++;
    if (c.hasNewsletter) n++;
    if (c.hasUserAccounts) n++;
    if (c.processesPayments) n++;
    if (c.gdpr) n++;
    sections.push(
      `${n}. CCPA COMPLIANCE (California Residents)\n\nUnder the California Consumer Privacy Act (CCPA), California residents have specific rights regarding their personal information:\n\n- The right to know what personal information is collected, used, shared, or sold.\n- The right to delete personal information held by businesses and their service providers.\n- The right to opt out of the sale of personal information.\n- The right to non-discrimination for exercising their CCPA rights.\n\nTo exercise any of these rights, please submit a request by contacting us at ${email}.\n`
    );
  }

  sections.push(
    `CONTACT US\n\nIf you have questions or comments about this Privacy Policy, please contact us at:\n\n${name}\n${url}\n${email}\n`
  );

  return sections.join("\n");
}

export default function PrivacyPolicyGenerator() {
  const [config, setConfig] = useState<PolicyConfig>({
    websiteName: "",
    websiteUrl: "",
    contactEmail: "",
    effectiveDate: new Date().toISOString().slice(0, 10),
    collectsPersonalData: true,
    usesCookies: true,
    usesAnalytics: false,
    hasNewsletter: false,
    hasUserAccounts: false,
    processesPayments: false,
    gdpr: false,
    ccpa: false,
  });
  const [copied, setCopied] = useState(false);

  const output = generatePolicy(config);

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const updateField = (key: keyof PolicyConfig, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const checkboxes: { key: keyof PolicyConfig; label: string }[] = [
    { key: "collectsPersonalData", label: "Collects Personal Data" },
    { key: "usesCookies", label: "Uses Cookies" },
    { key: "usesAnalytics", label: "Uses Analytics (Google Analytics)" },
    { key: "hasNewsletter", label: "Has Newsletter" },
    { key: "hasUserAccounts", label: "Has User Accounts" },
    { key: "processesPayments", label: "Processes Payments" },
  ];

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Website Name
            </label>
            <input
              type="text"
              value={config.websiteName}
              onChange={(e) => updateField("websiteName", e.target.value)}
              placeholder="My Website"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Website URL
            </label>
            <input
              type="text"
              value={config.websiteUrl}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Contact Email
            </label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={(e) => updateField("contactEmail", e.target.value)}
              placeholder="privacy@example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Effective Date
            </label>
            <input
              type="date"
              value={config.effectiveDate}
              onChange={(e) => updateField("effectiveDate", e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Features checkboxes */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Features & Data Collection
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {checkboxes.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config[key] as boolean}
                  onChange={() => updateField(key, !(config[key] as boolean))}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compliance regions */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Compliance Regions
          </p>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.gdpr}
                onChange={() => updateField("gdpr", !config.gdpr)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">GDPR (EU)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.ccpa}
                onChange={() => updateField("ccpa", !config.ccpa)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">CCPA (California)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Generated Privacy Policy
          </h3>
          <button
            onClick={copyOutput}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6">
          <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
