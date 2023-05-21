import Language from "./Language";

declare module "react-i18next" {
    interface CustomTypeOptions {
        resources: { translation: Language };
    }
}
