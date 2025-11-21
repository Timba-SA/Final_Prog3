import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as { value?: string };
            return React.cloneElement(child as React.ReactElement<any>, {
              checked: childProps.value === value,
              onClick: () => onValueChange?.(childProps.value || ''),
            });
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  checked?: boolean;
}

const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ className, checked, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex cursor-pointer rounded-lg border-2 p-4 transition-all',
          checked
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-zinc-800 hover:border-zinc-700',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 w-full">
          <div
            className={cn(
              'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
              checked ? 'border-emerald-500' : 'border-zinc-600'
            )}
          >
            {checked && (
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            )}
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
