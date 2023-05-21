import { FC } from "react";
import { useNavigate } from "react-router-dom";
import layoutStyles from "../styles/Layout.module.scss";
import appStyles from "../styles/App.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Levels from "../managers/LevelsManager";
import Button from "../components/Button";

const IndexRoute: FC<WithTranslation> = ({ t }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={layoutStyles.title}>Breakout</div>
            <div className={appStyles.levelSelect}>{t("SELECT_LEVEL")}: </div>
            <div className={appStyles.levelList}>
                {Levels.map((level) => (
                    <Button
                        key={level.name}
                        color={"#" + level.color.toString(16).padStart(6, "0")}
                        onClick={() => navigate("/play/" + level.name)}
                        text={level.name}
                    />
                ))}
            </div>
        </>
    );
};

IndexRoute.displayName = "IndexRoute";

export default withTranslation()(IndexRoute);
