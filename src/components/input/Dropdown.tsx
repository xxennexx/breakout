import { FC } from "react";

interface DropdownProps {
    elements: { name: string; label: string }[];
    value: string;
    onChange: (val: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ elements, value, onChange }) => {
    return (
        <select value={value} onChange={(evt) => onChange(evt.target.value)}>
            {elements.map((entry, i) => (
                <option value={entry.name} key={i}>
                    {entry.label}
                </option>
            ))}
        </select>
    );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
