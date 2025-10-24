import { useState, type ComponentProps } from 'react';
import pythonKeywords from './assets/pythonKeywords';
import Editor from '@monaco-editor/react';

export default function App() {
  const [value, setValue] = useState("123");
  const onMount: ComponentProps<typeof Editor>['onMount'] = (editor, monaco) => {
    console.log('editor mounted', editor);



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
            insertText: item.label,
            range: range
          };
        });

        return { suggestions };
      }
    });

  }

  return (
    <>
    <div className='h-dvh flex'>
      <div
        className='h-full w-1/2'
      >
      <Editor
        defaultLanguage="python"
        theme='vs-dark'
        value={value}
        onMount={onMount}
        onChange={(newValue) => setValue(newValue || "")}
      />

      </div>
      <div className='flex-1'>
        123
      </div>
    </div>
    </>
  );
}