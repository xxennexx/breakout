import { FC } from "react";
import layoutStyles from "../../styles/Layout.module.scss";
import infoStyles from "../../styles/Info.module.scss";
import { ReactComponent as Logo } from "../../media/logo.svg";
import { WithTranslation, withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Info: FC<WithTranslation> = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className={layoutStyles.tabWrapper}>
            <div className={layoutStyles.title}>{t("INFO_AND_CREDITS")}</div>
            <Logo
                onClick={() => navigate("/")}
                className={infoStyles.logo}
                width={100}
                height={100}
            />
            <br />
            {t("INFO_DESCRIPTION")}
            <br />
            <br />
            {t("INFO_CONTROLS")}
            <br />
            <br />
            <span>
                {t("GAME_OPENSOURCE")}
                <a
                    href="https://github.com/xxennexx/breakout"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                .
            </span>
            <span>
                {t("GAME_DEVELOPED_BY")}
                <a
                    href="https://github.com/xxennexx"
                    target="_blank"
                    rel="noreferrer"
                >
                    Miha Božič
                </a>{" "}
                (2R2).
            </span>
            <span>
                {t("LOGO_DESIGN_BY")}
                <a
                    href="https://www.instagram.com/sara_cipot/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Sara Cipot
                </a>{" "}
                (2OB).
            </span>
        </div>
    );
};

Info.displayName = "Info";

export default withTranslation()(Info);
