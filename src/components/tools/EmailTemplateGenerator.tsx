"use client";

import { useState } from "react";

type TemplateType = "follow-up" | "introduction" | "thank-you" | "meeting-request" | "complaint" | "feedback-request";

function generateEmail(type: TemplateType, recipient: string, sender: string, subject: string): string {
  const r = recipient || "there";
  const s = sender || "Your Name";
  const sub = subject || "our recent conversation";
  const templates: Record<TemplateType, string> = {
    "follow-up": `Subject: Following Up — ${sub}\n\nHi ${r},\n\nI hope this message finds you well. I wanted to follow up on ${sub} and see if you had a chance to review the information we discussed.\n\nPlease let me know if you have any questions or need additional details. I'm happy to help in any way I can.\n\nLooking forward to hearing from you.\n\nBest regards,\n${s}`,
    "introduction": `Subject: Introduction — ${s}\n\nHi ${r},\n\nMy name is ${s}, and I wanted to reach out to introduce myself. I came across your work in relation to ${sub} and felt this could be a great opportunity to connect.\n\nI'd love to learn more about what you're working on and explore whether there might be ways we can collaborate or support each other.\n\nWould you be open to a brief call or exchange of messages?\n\nBest,\n${s}`,
    "thank-you": `Subject: Thank You — ${sub}\n\nHi ${r},\n\nI just wanted to take a moment to express my sincere gratitude regarding ${sub}.\n\nYour support and effort made a real difference, and I truly appreciate the time and energy you invested. It means a great deal to me.\n\nThank you again — I look forward to staying in touch.\n\nWarm regards,\n${s}`,
    "meeting-request": `Subject: Meeting Request — ${sub}\n\nHi ${r},\n\nI hope you're doing well. I'd love to schedule a meeting to discuss ${sub} at your earliest convenience.\n\nPlease let me know your availability and I'll do my best to accommodate. I'm flexible and happy to work around your schedule.\n\nLooking forward to connecting.\n\nBest,\n${s}`,
    "complaint": `Subject: Concern Regarding ${sub}\n\nDear ${r},\n\nI am writing to bring to your attention a concern I have regarding ${sub}.\n\nI have encountered an issue that I believe requires prompt attention, and I hope we can work together to reach a satisfactory resolution. I would appreciate acknowledgment of this concern and guidance on next steps.\n\nThank you for your time and attention to this matter.\n\nSincerely,\n${s}`,
    "feedback-request": `Subject: Quick Feedback Request — ${sub}\n\nHi ${r},\n\nI hope all is well. I'm reaching out to ask if you'd be willing to share some feedback regarding ${sub}.\n\nYour perspective is valuable to me, and even a few thoughts would be incredibly helpful. It should only take a few minutes of your time.\n\nThank you in advance for your input!\n\nBest,\n${s}`,
  };
  return templates[type];
}

export default function EmailTemplateGenerator() {
  const [type, setType] = useState<TemplateType>("follow-up");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [copied, setCopied] = useState(false);

  const email = generateEmail(type, recipient, sender, subject);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Template Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as TemplateType)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="follow-up">Follow-Up</option>
            <option value="introduction">Introduction</option>
            <option value="thank-you">Thank You</option>
            <option value="meeting-request">Meeting Request</option>
            <option value="complaint">Complaint</option>
            <option value="feedback-request">Feedback Request</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Recipient Name</label>
            <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Sarah" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
            <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Alex" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Subject / Context</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="our last project meeting" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Generated Email</p>
          <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="rounded-xl border border-border bg-muted p-4 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">{email}</pre>
      </div>
    </div>
  );
}
