import text0 from "../data/0.md?raw"
import text1 from "../data/1.md?raw"
import { parse } from "marked"
export const textList = [
    text0,
    text1
]
export default function Info({ stop = 0 }) {
    return (
        <div className="prose max-w-none">
            {
                0 <= stop && stop < textList.length ? <div dangerouslySetInnerHTML={{ __html: parse(textList[stop]) }} />
                    : <div>Content not found.</div>
            }


        </div>
    );
}