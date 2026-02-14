import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...props
}) => {
    const variantClass = `btn--${variant}`;
    const sizeClass = `btn--${size}`;
    const fullWidthClass = fullWidth ? 'btn--full' : '';

    const combinedClassName = [
        'btn',
        variantClass,
        sizeClass,
        fullWidthClass,
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
