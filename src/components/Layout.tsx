import { FC } from "react";
import { Outlet } from "react-router-dom";
import appStyles from "../styles/App.module.scss";
import Settings from "./tab/Settings";
import Info from "./tab/Info";

const Layout: FC = () => {
    return (
        <div className={appStyles.layout}>
            <Info />
            <div className={appStyles.canvasWrapper}>
                <Outlet />
            </div>
            <Settings />
        </div>
    );
};

Layout.displayName = "Layout";

export default Layout;
