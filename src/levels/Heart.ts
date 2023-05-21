import Level from "../types/Level";

export default {
    name: "Heart",
    color: 0x9b1d20,
    blockMap: [
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, 0xff0000, 0xff0000, null, 0xff0000, 0xff0000, null, null, null],
        [null, null, null, 0xff0000, 0xff0000, null, 0xff0000, 0xff0000, null, null, null],
        [null, null, 0xff0000, null, null, 0xff0000, null, null, 0xff0000, null, null],
        [null, null, 0xff0000, null, null, 0xff0000, null, null, 0xff0000, null, null],
        [null, null, null, 0xff0000, null, null, null, 0xff0000, null, null, null],
        [null, null, null, 0xff0000, null, null, null, 0xff0000, null, null, null],
        [null, null, null, null, 0xff0000, null, 0xff0000, null, null, null, null],
        [null, null, null, null, 0xff0000, null, 0xff0000, null, null, null, null],
        [null, null, null, null, null, 0xff0000, null, null, null, null, null],
        [null, null, null, null, null, 0xff0000, null, null, null, null, null],
    ],
} as Level;
