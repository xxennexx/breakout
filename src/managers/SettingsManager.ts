export interface Setting<T> {
    name: string;
    value: T;
    default: T;
}

export default class SettingsManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static Settings: Setting<any>[] = [
        {
            name: "sliderSpeed",
            value: 20,
            default: 20,
        },
        {
            name: "sliderWidth",
            value: 100,
            default: 100,
        },
        {
            name: "ballSize",
            value: 10,
            default: 10,
        },
        {
            name: "ballSpeed",
            value: 4,
            default: 4,
        },
        {
            name: "language",
            value: "en",
            default: "en",
        },
        {
            name: "controlType",
            value: "keyboard",
            default: "keyboard",
        },
    ];

    static get<T>(name: string): T {
        return this.Settings.find((setting) => setting.name === name)
            ?.value as T;
    }

    static set<T>(name: string, value: T) {
        const setting = this.Settings.find(
            (setting) => setting.name === name,
        ) as Setting<T>;

        setting.value = value;

        this.save();
    }

    static reset() {
        this.Settings.forEach((setting) => {
            if (setting.name === "language") return;
            setting.value = setting.default;
        });

        this.save();
    }

    static save() {
        this.Settings.forEach((setting) => {
            localStorage.setItem(setting.name, JSON.stringify(setting.value));
        });
    }

    static load() {
        this.Settings = this.Settings.map((setting) => {
            const value = JSON.parse(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                localStorage.getItem(setting.name)!, // null is an acceptable value for JSON.parse
            );

            return {
                ...setting,
                value: value ? value : setting.value,
            } as typeof setting;
        });
    }
}
