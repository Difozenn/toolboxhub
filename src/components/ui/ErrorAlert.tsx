interface ErrorAlertProps {
  message: string;
  className?: string;
}

export default function ErrorAlert({ message, className = "" }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className={`rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 ${className}`}>
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        {message}
      </div>
    </div>
  );
}
