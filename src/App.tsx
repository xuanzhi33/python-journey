import { useEffect, useRef, useState, type ComponentProps } from 'react';
import pythonKeywords from './assets/pythonKeywords';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Button } from './components/ui/button';
import { ArrowLeft, ArrowRight, Play, RefreshCw, TriangleAlert } from 'lucide-react';
import { initPython } from './lib/python';
import { Spinner } from './components/ui/spinner';
import { toast, Toaster } from 'sonner';
import Info, { textList } from './components/Info';
import Map, { type MapRef } from './components/Map';
import { sleep } from './lib/utils';



export default function App() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("Welcome to the Python Journey!");
  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);
  const editorRef = useRef<Parameters<NonNullable<ComponentProps<typeof Editor>['onMount']>>[0] | null>(null);
  const highlightCollectionRef = useRef<any>(null);
  const onMount: ComponentProps<typeof Editor>['onMount'] = (editor, monaco) => {
    console.log('editor mounted', editor);
    editorRef.current = editor;

    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const CompletionItemKind = monaco.languages.CompletionItemKind;
        const kindMap: Record<string, number> = {
          Method: CompletionItemKind.Method,
          Function: CompletionItemKind.Function,
          Constructor: CompletionItemKind.Constructor,
          Field: CompletionItemKind.Field,
          Variable: CompletionItemKind.Variable,
          Class: CompletionItemKind.Class,
          Struct: CompletionItemKind.Struct,
          Interface: CompletionItemKind.Interface,
          Module: CompletionItemKind.Module,
          Property: CompletionItemKind.Property,
          Event: CompletionItemKind.Event,
          Operator: CompletionItemKind.Operator,
          Unit: CompletionItemKind.Unit,
          Value: CompletionItemKind.Value,
          Constant: CompletionItemKind.Constant,
          Enum: CompletionItemKind.Enum,
          EnumMember: CompletionItemKind.EnumMember,
          Keyword: CompletionItemKind.Keyword,
          Text: CompletionItemKind.Text,
          Color: CompletionItemKind.Color,
          File: CompletionItemKind.File,
          Reference: CompletionItemKind.Reference,
          Customcolor: CompletionItemKind.Customcolor,
          Folder: CompletionItemKind.Folder,
          TypeParameter: CompletionItemKind.TypeParameter,
          User: CompletionItemKind.User,
          Issue: CompletionItemKind.Issue,
          Tool: CompletionItemKind.Tool,
          Snippet: CompletionItemKind.Snippet
        };

        const suggestions = pythonKeywords.map(item => {
          return {
            label: item.label,
            kind: kindMap[item.kind],
            detail: item.detail,
            documentation: item.documentation,
            insertText: item.kind === "Function" ? `${item.label}()` : item.label,
            range: range
          };
        });

        return { suggestions };
      }
    });

    highlightCollectionRef.current = editor.createDecorationsCollection([]);

  }
  const outputScrollToBottomRef = useRef<() => void | null>(null);
  const pythonRef = useRef<ReturnType<typeof initPython> extends Promise<infer R> ? R : null>(null);
  const monacoApi = useMonaco();
  const monacoRef = useRef(monacoApi);
  useEffect(() => {
    monacoRef.current = monacoApi;
  }, [monacoApi]);
  const mapRef = useRef<MapRef | null>(null);

  const appendOutput = (text: string) => {
    setOutput((prev) => {
      const newOutput = prev + "\n" + text;
      setTimeout(() => {
        outputScrollToBottomRef.current?.();
      }, 100);
      return newOutput;
    });
  }


  function highlightLine(lineNumber: number) {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const collection = highlightCollectionRef.current;

    if (!editor || !monaco || !collection) return;



    if (lineNumber === -1) {
      collection.set([]);
      return;
    }
    collection.set([
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "myLineHighlight",
        },
      },
    ]);

  
    editor.revealLine(lineNumber);
  }

  const runPythonCode = async () => {
    if (pythonRef.current) {
      pythonRef.current.clearContext();
      try {
        setStatus("running");

        await pythonRef.current.run(value);

        setStatus("idle");
      } catch (error) {
        appendOutput(`${error}`);
        toast.error("Python Error", {
          description: "Please check the error details in the Output located at the bottom right.",
          action: { label: "Dismiss", onClick: () => { } }
        });
        setStatus("error");
      }
    }
  }

  async function realtimeSyntaxCheck(code: string) {
    const editor = editorRef.current;
    if (!editor || !monacoApi) return;
    const model = editor.getModel();
    if (!model) return;

    let markers = [];

    const result = await pythonRef.current?.syntaxCheck(code);
    if (!result.ok) {
      markers.push({
        severity: monacoApi.MarkerSeverity.Error,
        message: result.message,
        startLineNumber: result.lineno,
        startColumn: result.offset,
        endLineNumber: result.lineno,
        endColumn: result.offset + 1
      });
      setStatus("error");
    } else {
      setStatus("idle");
    }

    monacoApi?.editor.setModelMarkers(model, "python", markers);

  }


  const editorDebounceRef = useRef<any>(null);

  useEffect(() => {
    async function initialize() {
      pythonRef.current = await initPython(appendOutput, highlightLine, mapRef.current!);
      setStatus("idle");
    }
    initialize();
  }, []);

  return (
    <>
      <div className='h-dvh flex flex-col'>
        <div className='h-[50px]'>
          <div className='flex px-4 py-2 justify-between items-center'>

            <div className='text-2xl'>
              A Python Journey
            </div>
            <div className='flex items-center'>

              <Button className='mr-2' variant="secondary" disabled={progress <= 0} onClick={async () => {
                setProgress((prev) => Math.max(0, prev - 1));
                await sleep(100);
                mapRef.current?.reset();
              }}>
                <ArrowLeft />
                Previous
              </Button>
              <div>
                Stop {progress}
              </div>
              <Button className='ml-2' variant="secondary" disabled={progress >= textList.length - 1} onClick={async () => {
                setProgress((prev) => Math.min(textList.length - 1, prev + 1));
                await sleep(100);
                mapRef.current?.reset();

              }}>
                Next
                <ArrowRight />
              </Button>

              <Button className='ml-5' variant="outline" disabled={status === "running" || status === "loading"} onClick={async () => {
                await mapRef.current?.reset();
              }}>
                <RefreshCw />
                Reset
              </Button>
              <div className='w-28 ml-5 flex items-center justify-between'>
                <Button className='text-green-500 flex-1'
                  disabled={status === "running" || status === "loading"}
                  onClick={async () => {
                    await mapRef.current?.reset();
                    await sleep(500);
                    await runPythonCode();
                  }}>
                  <Play />
                  Run
                </Button>
                <div className='ml-2'>
                  {
                    status === "error" ? (
                      <TriangleAlert className='text-yellow-500' />
                    ) : status !== "idle" ? (
                      <Spinner className='text-green-500' />
                    ) : null
                  }

                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='flex h-[calc(100vh-50px)]'>
          <div className='w-1/2 flex flex-col'>

            <div className='flex-1 overflow-y-scroll p-3'>
              <Info stop={progress} />
            </div>
            <div className='flex-1 flex justify-center items-center overflow-auto'>
              <Map stop={progress} ref={mapRef} running={status === "running"} />
            </div>
          </div>
          <div
            className='h-full w-1/2 bg-[#1e1e1e] flex flex-col'
          >

            <Editor
              defaultLanguage="python"
              loading={
                <Spinner className='text-white size-8' />
              }
              value={value}
              onMount={onMount}
              onChange={async (newValue) => {
                const code = newValue || "";
                setValue(code);

                clearTimeout(editorDebounceRef.current);
                editorDebounceRef.current = setTimeout(async () => {
                  await realtimeSyntaxCheck(code);
                  highlightLine(-1);
                }, 300);

              }}
            />
            <Editor
              options={
                {
                  readOnly: true,
                  lineNumbers: "off",
                  minimap: { enabled: false }
                }
              }
              height="200px"
              loading={
                <Spinner className='text-white size-8' />
              }
              onMount={(editor) => {
                outputScrollToBottomRef.current = () => {
                  const model = editor.getModel();
                  if (model) {
                    const lastLine = model.getLineCount();
                    editor.revealLine(lastLine);
                  }
                }
              }}
              value={output}
            />

          </div>


          <Toaster />
        </div>
      </div>

    </>
  );
}