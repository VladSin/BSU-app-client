import classes from "../../styles/button.module.scss";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type: "submit" | "reset" | "button";
}

function Button({
  onClick,
  className,
  children,
  disabled,
  type,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className ? className : classes.primary}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
