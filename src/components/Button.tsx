import { FC } from "react";
import buttonStyles from "../styles/components/button.module.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <div className={buttonStyles.button} onClick={onClick}>
            {text}
        </div>
    );
};

Button.displayName = "Button";

export default Button;
