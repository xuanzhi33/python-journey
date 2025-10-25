import type { MapRef } from "@/components/Map";

declare global {
    interface Window {
        loadPyodide: (options?: { indexURL?: string }) => Promise<PyodideInterface>;
    }
}

export interface PyodideInterface {
    runPython: (code: string, options?: RunOptions) => any;
    runPythonAsync: (code: string, options?: RunOptions) => Promise<any>;
    globals: PyProxy; // 默认全局命名空间

    toPy: (obj: any) => PyProxy;
}

export interface RunOptions {
    globals?: PyProxy; // 可选，指定运行时的命名空间
}

export interface PyProxy {
    get: (name: string) => any;
    set: (name: string, value: any) => void;
    toJs: () => any;

    // 常见的 PyProxy 方法
    keys?: () => string[];
    length?: number;
    // 释放资源
    destroy?: () => void;
}


export const initPython = async (appendOutput: (text: string) => void, mapRef: MapRef) => {
    let pyodide = await window.loadPyodide();
    let context: PyProxy = pyodide.globals;
    function clearContext() {
        context = pyodide.toPy({
            print: (...args: any[]) => {
                appendOutput(args.map(String).join(" "));
            },
            input: (msg: string) => {
                return prompt(msg);
            },
            __move_left: async () => {
                await mapRef.moveLeft();
            },
            __move_right: async () => {
                await mapRef.moveRight();
            },
            __jump: async () => {
                await mapRef.jump();
            }
        });
            const predefinedFunctions = `
from time import sleep as __sleep
def move_left():
    __move_left()
    __sleep(0.5)

def move_right():
    __move_right()
    __sleep(0.5)

def jump():
    __jump()
    __sleep(0.5)
`;
        pyodide.runPython(predefinedFunctions, { globals: context });
    }

    clearContext();
    async function run(code: string) {
        try {
            return await pyodide.runPythonAsync(code, { globals: context });
        } catch (error) {
            appendOutput(`${error}`);
            throw error;
        }
    }

    async function syntaxCheck(code: string) {
        const result = await pyodide.runPythonAsync(`
import ast
def check_syntax(code):
    try:
        ast.parse(code)
        return { "ok": True }
    except SyntaxError as e:
        return { "message": str(e), "startLineNumber": e.lineno, "startColumn": e.offset, "endLineNumber": e.end_lineno, "endColumn": e.end_offset, "ok": False }
check_syntax(${JSON.stringify(code)})
`, { globals: pyodide.toPy({}) });
        return result.toJs();

    }

    await run(`
import sys
print("Python version:", sys.version)
`);

    return {
        run,
        clearContext,
        syntaxCheck
    }
};
