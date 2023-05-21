import { FC } from "react";
import Overlay from "../Overlay";
import { WithTranslation, withTranslation } from "react-i18next";
import SettingsManager from "../../managers/SettingsManager";

const GameOverOverlay: FC<WithTranslation> = ({ t }) => {
    return (
        <Overlay title={t("GAME_OVER")}>
            <p>
                {SettingsManager.get<"mouse" | "keyboard">("controlType") ===
                "keyboard" ? (
                    <>
                        {t("PRESS")} <strong>{t("SPACE")}</strong>
                    </>
                ) : (
                    <strong>{t("CLICK")}</strong>
                )}{" "}
                {t("TO_PLAY_AGAIN")}.
            </p>
        </Overlay>
    );
};

GameOverOverlay.displayName = "GameOverOverlay";

export default withTranslation()(GameOverOverlay);
