import type { GridItem } from "@/components/Map"
import text0 from "../data/0.md?raw"
import text1 from "../data/1.md?raw"
import text2 from "../data/2.md?raw"
import text3 from "../data/3.md?raw"
import text4 from "../data/4.md?raw"
import text5 from "../data/5.md?raw"
import text6 from "../data/6.md?raw"
export default [
    {
        map: `
____________________
____________________
____________________
____________________
__________F_________
__________G_________
GGGGGGGGGGDGGGGGGGGG
DDDDDDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 8, y: 5 },
        // goal: { x: 10, y: 4 },
        goal(pos: { x: number; y: number }, _: GridItem[][]) {
            return pos.x === 10 && pos.y === 4;
        },
        info: text0
    },
    {
        map: `
____________________
____________________
____________________
____________________
____________________
___________________F
GGGGGGGGGGGGGGGGGGGG
DDDDDDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 0, y: 5 },
        // goal: { x: 19, y: 5 },
        goal(pos: { x: number; y: number }, _: GridItem[][]) {
            return pos.x === 19 && pos.y === 5;
        },
        info: text1
    },
    {

        map: `
____________________
____________________
____________________
____________________
____G____G____G_____
___GDG__GDG__GDG___F
GGGDDDGGDDDGGDDDGGGG
DDDDDDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB

`,
        start: { x: 0, y: 5 },
        // goal: { x: 19, y: 5 },
        goal(pos: { x: number; y: number }, _: GridItem[][]) {
            return pos.x === 19 && pos.y === 5;
        },
        info: text2
    },
    {

        map: `
____________________
___________________F
________________SSSS
_____________SSSS___
__________SSSS______
_______SSSS_________
____SSSS____________
_SSSS_______________
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 0, y: 7 },
        // goal: { x: 19, y: 1 },
        goal(pos: { x: number; y: number }, _: GridItem[][]) {
            return pos.x === 19 && pos.y === 1;
        },
        info: text3
    },
    {

        map: `
________LLL_________
_______LLLLL________
_______LLOLL________
_________O__________
_________O__________
SSSSSSSSg_cSSSSSSSSS
SSSSSSSSSdSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSS
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 9, y: 5 },
        // goal: { x: 19, y: 1 },
        goal(_1: { x: number; y: number }, _2: GridItem[][]) {
            return false;
        },
        info: text4
    },

    {

        map: `
____________________
____________________
____________________
____________________
____________________
____________________
____________________
_S__S_____SS_______F
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 0, y: 7 },
        goal(pos: { x: number; y: number }, _2: GridItem[][]) {
            return pos.x === 19 && pos.y === 7;
        },
        info: text5
    },

    {

        map: `
____________________
____________________
____________________
____________________
____________________
____________________
____________________
_S__S_____SS_______F
DDDDDDDDDDDDDDDDDDDD
BBBBBBBBBBBBBBBBBBBB
`,
        start: { x: 0, y: 7 },
        goal(pos: { x: number; y: number }, _2: GridItem[][]) {
            // Update goal logic to reflect the while loop concept from 6.md
            return pos.x === 19 && pos.y === 7; // Steve reaches the flower
        },
        info: text6
    },

]