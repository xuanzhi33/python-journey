import { cn, sleep } from "@/lib/utils";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import maps from "@/data/maps";
import { toast, Toaster } from "sonner";
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
        destructible: true,
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
        passable: false
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
    S: {
        name: "Stone",
        imagePath: "/img/S.png",
        destructible: true,
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
    mine: (direction: "up" | "down" | "left" | "right") => Promise<void>;
    check: (direction: "up" | "down" | "left" | "right") => Promise<string>;
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

    const gameStateRef = useRef(gameState);
    const currentMapRef = useRef(currentMap);
    const initialStateRef = useRef(initialState);
    const stopRef = useRef(stop);
    const playerPositionRef = useRef(playerPosition);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        currentMapRef.current = currentMap;
    }, [currentMap]);

    useEffect(() => {
        initialStateRef.current = initialState;
    }, [initialState]);

    useEffect(() => {
        playerPositionRef.current = playerPosition;
    }, [playerPosition]);

    useEffect(() => {
        stopRef.current = stop;
    }, [stop]);

    const afterMove = async () => {
        await sleep(50);

        setPlayerPosition((pos) => {
            const goal = currentMapRef.current.goal;
            if (pos.x === goal.x && pos.y === goal.y) {
                toast.success("🎉 Congratulations!", {
                    description:
                        'You reached the goal! Now click the "Next" button in the top right corner to move on to the next stop!',
                });
                return pos;
            }

            let newY = pos.y;
            while (true) {
                const belowTile = gameStateRef.current[newY + 1]?.[pos.x];
                if (belowTile && belowTile.passable) {
                    newY += 1;
                } else {
                    break;
                }
            }

            if (newY !== pos.y) {
                return { ...pos, y: newY };
            }

            return pos;
        });
    };

    useImperativeHandle(ref, () => ({
        async moveLeft() {
            setPlayerPosition((pos) => {
                if (!gameStateRef.current[pos.y]?.[pos.x - 1]?.passable) return pos;
                return { ...pos, x: pos.x - 1 };
            });
            await afterMove();
        },
        async moveRight() {
            setPlayerPosition((pos) => {
                if (!gameStateRef.current[pos.y]?.[pos.x + 1]?.passable) return pos;
                return { ...pos, x: pos.x + 1 };
            });
            await afterMove();
        },
        async jump() {
            setPlayerPosition((pos) => ({ ...pos, y: pos.y - 1 }));
        },
        async reset() {
            setPlayerPosition(currentMapRef.current.start);
            setGameState(parseMap(initialStateRef.current));
        },
        async mine(direction: "up" | "down" | "left" | "right") {
            setGameState((state) => {
                const newState = state.map((row) => row.slice());
                const pos = playerPositionRef.current;
                let targetX = pos.x;
                let targetY = pos.y;
                if (direction === "up") targetY -= 1;
                else if (direction === "down") targetY += 1;
                else if (direction === "left") targetX -= 1;
                else if (direction === "right") targetX += 1;
                
                const targetTile = newState[targetY]?.[targetX];
                console.log(targetTile, "mined");
                
                if (targetTile && targetTile.destructible) {
                    newState[targetY][targetX] = tileTypes["_"];
                }
                return newState;
            });
            await afterMove();
        },
        async check(direction: "up" | "down" | "left" | "right") {
            const pos = playerPositionRef.current;
            let targetX = pos.x;
            let targetY = pos.y;
            if (direction === "up") targetY -= 1;
            else if (direction === "down") targetY += 1;
            else if (direction === "left") targetX -= 1;
            else if (direction === "right") targetX += 1;

            const targetTile = gameStateRef.current[targetY]?.[targetX];
            return targetTile ? targetTile.name || "Unknown" : "Out of bounds";
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
            <Toaster />
        </div>
    );
});

export default Map;
