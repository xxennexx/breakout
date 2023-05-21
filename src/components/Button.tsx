import { FC } from "react";
import buttonStyles from "../styles/Button.module.scss";

interface ButtonProps {
    text: string;
    color?: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, color, onClick }) => {
    return (
        <div
            className={buttonStyles.button}
            onClick={onClick}
            style={{ backgroundColor: color }}
        >
            {text}
        </div>
    );
};

Button.displayName = "Button";

export default Button;
