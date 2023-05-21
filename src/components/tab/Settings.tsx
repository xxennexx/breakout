import { FC, useState } from "react";
import layoutStyles from "../../styles/Layout.module.scss";
import settingsStyles from "../../styles/Settings.module.scss";
import Slider from "../input/Slider";
import SettingsManager from "../../managers/SettingsManager";
import Dropdown from "../input/Dropdown";
import { ReactComponent as USFlag } from "../../media/flag_us.svg";
import { ReactComponent as SlFlag } from "../../media/flag_sl.svg";
import { WithTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";

const getFlag = (lang: string) => {
    switch (lang) {
        case "en":
            return <USFlag width={20} height={20} />;
        case "sl":
            return <SlFlag width={20} height={20} />;
        default:
            return <USFlag width={20} height={20} />;
    }
};

const Settings: FC<WithTranslation> = ({ t, i18n }) => {
    const [sliderSpeed, setSliderSpeed] = useState(
        SettingsManager.get<number>("sliderSpeed"),
    );
    const [sliderWidth, setSliderWidth] = useState(
        SettingsManager.get<number>("sliderWidth"),
    );
    const [ballSize, setBallSize] = useState(
        SettingsManager.get<number>("ballSize"),
    );
    const [ballSpeed, setBallSpeed] = useState(
        SettingsManager.get<number>("ballSpeed"),
    );
    const [controlType, setControlType] = useState(
        SettingsManager.get<string>("controlType"),
    );
    const [language, setLanguage] = useState(
        SettingsManager.get<string>("language"),
    );

    return (
        <div className={layoutStyles.tabWrapper}>
            <div className={layoutStyles.title}>{t("SETTINGS")}</div>
            <div className={settingsStyles.controlWrapper}>
                {t("SLIDER_SPEED")} ({sliderSpeed})
                <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={sliderSpeed}
                    onChange={(val) => {
                        setSliderSpeed(val);
                        SettingsManager.set("sliderSpeed", val);
                    }}
                />
            </div>
            <div className={settingsStyles.controlWrapper}>
                {t("SLIDER_WIDTH")} ({sliderWidth})
                <Slider
                    min={1}
                    max={1000}
                    step={1}
                    value={sliderWidth}
                    onChange={(val) => {
                        setSliderWidth(val);
                        SettingsManager.set("sliderWidth", val);
                    }}
                />
            </div>
            <div className={settingsStyles.controlWrapper}>
                {t("BALL_SIZE")} ({ballSize})
                <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={ballSize}
                    onChange={(val) => {
                        setBallSize(val);
                        SettingsManager.set("ballSize", val);
                    }}
                />
            </div>
            <div className={settingsStyles.controlWrapper}>
                {t("BALL_SPEED")} ({ballSpeed})
                <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={ballSpeed}
                    onChange={(val) => {
                        setBallSpeed(val);
                        SettingsManager.set("ballSpeed", val);
                    }}
                />
            </div>
            <div className={settingsStyles.controlWrapper}>
                {t("CONTROL_TYPE")}
                <Dropdown
                    elements={[
                        { label: t("MOUSE"), name: "mouse" },
                        { label: t("KEYBOARD"), name: "keyboard" },
                    ]}
                    value={controlType}
                    onChange={(val) => {
                        setControlType(val);
                        SettingsManager.set("controlType", val);
                    }}
                />
            </div>
            <div className={settingsStyles.controlWrapper}>
                {t("RESET_SETTINGS")}
                <button
                    className={settingsStyles.resetButton}
                    onClick={() => {
                        SettingsManager.reset();
                        setSliderSpeed(SettingsManager.get("sliderSpeed"));
                        setSliderWidth(SettingsManager.get("sliderWidth"));
                        setBallSize(SettingsManager.get("ballSize"));
                        setBallSpeed(SettingsManager.get("ballSpeed"));
                    }}
                >
                    {t("RESET")}
                </button>
            </div>
            <div className={settingsStyles.controlWrapper}>
                <span className={settingsStyles.controlLabel}>
                    {t("LANGUAGE")}
                    {getFlag(language)}
                </span>
                <Dropdown
                    elements={[
                        { label: "English", name: "en" },
                        { label: "Slovenščina", name: "sl" },
                    ]}
                    value={language}
                    onChange={(val) => {
                        setLanguage(val);
                        SettingsManager.set("language", val);
                        i18n.changeLanguage(val);
                    }}
                />
            </div>
        </div>
    );
};

Settings.displayName = "Settings";

export default withTranslation()(Settings);
