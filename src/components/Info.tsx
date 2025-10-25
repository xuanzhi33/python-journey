import maps from "@/data/maps"

import { parse } from "marked"
export const textList = maps.map((item) => item.info);
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