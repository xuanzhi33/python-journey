import text01 from "../data/0.md?raw"
import { parse } from "marked"
export const textList = [
    text01
]
export default function Info({ stop = 0 }) {
  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: parse(textList[stop]) }} />

    </div>
  );
}