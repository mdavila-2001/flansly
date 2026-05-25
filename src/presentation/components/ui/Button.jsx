import PropTypes from 'prop-types';

export const Button = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    icon: Icon,
    ...props 
}) => {
    const baseStyles = "min-h-[48px] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
    primary: "bg-[#B45309] text-[#F9F9F9] hover:bg-[#8B4000] shadow-[0_0_15px_rgba(180,83,9,0.2)] hover:shadow-[0_0_25px_rgba(180,83,9,0.4)]",
    secondary: "bg-transparent border border-[#FDE68A] text-[#FDE68A] hover:bg-[#FDE68A]/10"
    };

    return (
        <button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    className: PropTypes.string,
    icon: PropTypes.elementType,
    props: PropTypes.object
};