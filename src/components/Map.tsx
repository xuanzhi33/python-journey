import { cn, sleep } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useState } from "react";
import maps from "@/data/maps";
export interface GridItem {
    name?: string;
    imagePath?: string;
    backgroundColor?: string;
    destructible: boolean;

    passable: boolean;

    hasItem?: boolean;
}

export const tileTypes: Record<string, GridItem> = {
    G: {
        name: "Grass Block",
        imagePath: "/img/G.png",
        destructible: false,
        passable: false
    },
    F: {
        name: "Flower",
        imagePath: "/img/F.png",
        destructible: true,
        passable: true,
        backgroundColor: "#dbfefe"
    },
    D: {
        name: "Dirt",
        imagePath: "/img/D.png",
        destructible: true,
        passable: true
    },
    O: {
        name: "Oak Log",
        imagePath: "/img/O.png",
        destructible: true,
        passable: false
    },
    B: {
        name: "Bedrock",
        imagePath: "/img/B.png",
        destructible: false,
        passable: false
    },
    "W": {
        name: "Water",
        imagePath: "/img/W.png",
        destructible: false,
        passable: false
    },
    "_": {
        name: "Air",
        imagePath: "/img/A.png",
        destructible: false,
        passable: true
    }
};

export function parseMap(input: string): GridItem[][] {
    const lines = input.trim().split("\n");
    const grid: GridItem[][] = lines.map((line) =>
        line.trim().split("").map((char) => {
            const tile = tileTypes[char];
            if (!tile) {
                throw new Error(`Unknown tile type: ${char}`);
            }
            return tile;
        })
    );
    return grid;
}

export function Player({
    state = "idle",
    className = "",
    position = { x: 0, y: 0 }
}) {
    return <div className={cn("steve", state, className)}
        style={{ position: "absolute", left: position.x * 32, top: position.y * 32 }} />;
}


export interface MapRef {
    moveLeft: () => Promise<void>;
    moveRight: () => Promise<void>;
    jump: () => Promise<void>;
    reset: () => Promise<void>;
}

interface MapProps {
    stop?: number;
    running?: boolean;
}



const Map = forwardRef<MapRef, MapProps>(({ stop = 0, running = false }, ref) => {
    const currentMap = maps[stop];
    const initialState = currentMap.map;
    const [playerPosition, setPlayerPosition] = useState(currentMap.start);
    const [gameState, setGameState] = useState<GridItem[][]>(parseMap(initialState));

    useImperativeHandle(ref, () => ({
        async moveLeft() {
            setPlayerPosition((pos) => ({ ...pos, x: pos.x - 1 }));
        },
        async moveRight() {
            setPlayerPosition((pos) => ({ ...pos, x: pos.x + 1 }));
        },
        async jump() {
            setPlayerPosition((pos) => ({ ...pos, y: pos.y - 1 }));
        },
        async reset() {
            setPlayerPosition(currentMap.start);
            setGameState(parseMap(initialState));
        }
    }));

    return (
        <div className="relative">
            {gameState.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {row.map((tile, colIndex) => (
                        <img
                            key={colIndex}
                            src={tile.imagePath}
                            alt=""
                            style={{
                                width: 32,
                                height: 32,
                                imageRendering: "pixelated",
                                backgroundColor: tile.backgroundColor,
                            }}
                        />
                    ))}
                </div>
            ))}
            <Player state={running ? "playing" : "idle"} position={playerPosition} />
        </div>
    );
});

export default Map;
