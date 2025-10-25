import { useState } from "react";
export interface GridItem {
  imagePath: string;

  destructible: boolean;

  passable: boolean;

  hasItem?: boolean;
}
export default function Map() {
    const [gameState, setGameState] = useState<GridItem[][]>([]);
    return <div>Map Component</div>;
}