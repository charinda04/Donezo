import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className={clsx(
            'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 block text-sm text-gray-900"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }