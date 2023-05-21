import { FC } from "react";

interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (val: number) => void;
}

const Slider: FC<SliderProps> = ({ min, max, step, value, onChange }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
        />
    );
};

Slider.displayName = "Slider";

export default Slider;
