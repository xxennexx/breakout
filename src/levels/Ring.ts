import Level from "../types/Level";

export default {
    name: "Ring",
    color: 0x1fa514,
    blockMap: [
        [null, null, null, null, 0x1fa514, null, null, null, null],
        [null, null, null, 0x6588f2, null, 0xf32993, null, null, null],
        [null, null, 0xe32f5c, null, null, null, 0x4646e9, null, null],
        [null, 0x13fef9, null, null, null, null, null, 0x99f756, null],
        [0x5510b5, null, null, null, null, null, null, null, 0xfb1fa9],
        [null, 0xc75678, null, null, null, null, null, 0xdbda64, null],
        [null, null, 0xed946d, null, null, null, 0xdc058, null, null],
        [null, null, null, 0xed7356, null, 0x8aafd, null, null, null],
        [null, null, null, null, 0x23e302, null, null, null, null],
    ],
} as Level;
