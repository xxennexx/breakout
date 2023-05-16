import { FC } from "react";
import { Outlet } from "react-router-dom";
import appStyles from "../styles/app.module.scss";

const Layout: FC = () => {
    return (
        <div className={appStyles.layout}>
            Info and credits
            <div className={appStyles.canvasWrapper}>
                <Outlet />
            </div>
            Settings
        </div>
    );
};

Layout.displayName = "Layout";

export default Layout;
