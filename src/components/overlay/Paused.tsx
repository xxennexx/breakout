import { FC } from "react";
import Overlay from "../Overlay";
import { WithTranslation, withTranslation } from "react-i18next";
import SettingsManager from "../../managers/SettingsManager";

const Paused: FC<WithTranslation> = ({ t }) => {
    return (
        <Overlay title={t("PAUSED")}>
            <p>{t("GAME_PAUSED")}</p>
            <p>
                {SettingsManager.get<"mouse" | "keyboard">("controlType") ===
                "keyboard" ? (
                    <>
                        {t("PRESS")} <strong>{t("SPACE")}</strong>
                    </>
                ) : (
                    <strong>{t("CLICK")}</strong>
                )}{" "}
                {t("TO_RESUME")}.
            </p>
        </Overlay>
    );
};

Paused.displayName = "Paused";

export default withTranslation()(Paused);
