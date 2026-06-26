import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-xl border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder-text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info focus:border-info disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-expense focus:ring-expense focus:border-expense' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-expense-text">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input