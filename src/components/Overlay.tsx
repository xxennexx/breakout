import { FC } from "react";
import overlayStyles from "../styles/Overlay.module.scss";

interface OverlayProps {
    title: string;
    children: React.ReactNode;
}

const Overlay: FC<OverlayProps> = ({ title, children }) => {
    return (
        <div className={overlayStyles.overlay}>
            <div className={overlayStyles.overlayHeader}>{title}</div>
            <div className={overlayStyles.overlayBody}>{children}</div>
        </div>
    );
};

Overlay.displayName = "Overlay";

export default Overlay;
