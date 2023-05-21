type TranslationKey =
    | "GAME_OVER"
    | "PRESS"
    | "SPACE"
    | "TO_PLAY_AGAIN"
    | "TO_RESUME"
    | "PAUSED"
    | "GAME_PAUSED"
    | "INFO_DESCRIPTION"
    | "INFO_CONTROLS"
    | "GAME_OPENSOURCE"
    | "GAME_DEVELOPED_BY"
    | "LOGO_DESIGN_BY"
    | "INFO_AND_CREDITS"
    | "SETTINGS"
    | "SLIDER_SPEED"
    | "SLIDER_WIDTH"
    | "BALL_SIZE"
    | "BALL_SPEED"
    | "RESET_SETTINGS"
    | "RESET"
    | "LANGUAGE"
    | "SELECT_LEVEL"
    | "GAME_WIN"
    | "CONTROL_TYPE"
    | "MOUSE"
    | "KEYBOARD"
    | "CLICK";

type Language = Record<TranslationKey, string>;

export type { TranslationKey };
export default Language;
