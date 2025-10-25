export default [
  // Keywords
  {
    label: "def",
    kind: "Keyword",
    detail: "Define a function",
    documentation: "Used to define a function.\n\nExample:\n```python\ndef foo():\n    pass\n```"
  },
  {
    label: "class",
    kind: "Keyword",
    detail: "Define a class",
    documentation: "Used to define a class.\n\nExample:\n```python\nclass MyClass:\n    pass\n```"
  },
  {
    label: "return",
    kind: "Keyword",
    detail: "Return statement",
    documentation: "Used to return a value from a function."
  },
  {
    label: "if",
    kind: "Keyword",
    detail: "Conditional statement",
    documentation: "Used for conditional branching.\n\nExample:\n```python\nif x > 0:\n    print('positive')\n```"
  },
  {
    label: "for",
    kind: "Keyword",
    detail: "Loop statement",
    documentation: "Used to iterate over an iterable.\n\nExample:\n```python\nfor i in range(5):\n    print(i)\n```"
  },
  {
    label: "while",
    kind: "Keyword",
    detail: "Loop statement",
    documentation: "Repeatedly executes as long as the condition is true."
  },
  {
    label: "try",
    kind: "Keyword",
    detail: "Exception handling",
    documentation: "Used to catch and handle exceptions."
  },
  {
    label: "import",
    kind: "Keyword",
    detail: "Import module",
    documentation: "Used to import a Python module or package."
  },
  {
    label: "with",
    kind: "Keyword",
    detail: "Context manager",
    documentation: "Simplifies resource management.\n\nExample:\n```python\nwith open('file.txt') as f:\n    data = f.read()\n```"
  },

  // Common functions
  {
    label: "print",
    kind: "Function",
    detail: "Output function",
    documentation: "Prints content to the console.\n\nExample:\n```python\nprint('Hello, World!')\n```"
  },
  {
    label: "input",
    kind: "Function",
    detail: "Input function",
    documentation: "Reads input from the user.\n\nExample:\n```python\nname = input('Enter your name: ')\n```"
  },
  {
    label: "len",
    kind: "Function",
    detail: "Length function",
    documentation: "Returns the length of an object.\n\nExample:\n```python\nlen([1,2,3])  # 3\n```"
  },
  {
    label: "range",
    kind: "Function",
    detail: "Range generator",
    documentation: "Generates a sequence of integers, often used in loops.\n\nExample:\n```python\nfor i in range(5):\n    print(i)\n```"
  },
  {
    label: "int",
    kind: "Function",
    detail: "Integer conversion",
    documentation: "Converts a value to an integer.\n\nExample:\n```python\nint('123')  # 123\n```"
  },
  {
    label: "str",
    kind: "Function",
    detail: "String conversion",
    documentation: "Converts a value to a string."
  },
  {
    label: "list",
    kind: "Function",
    detail: "List constructor",
    documentation: "Creates a new list object."
  },
  {
    label: "dict",
    kind: "Function",
    detail: "Dictionary constructor",
    documentation: "Creates a new dictionary object."
  },
  {
    label: "open",
    kind: "Function",
    detail: "File operation",
    documentation: "Opens a file and returns a file object.\n\nExample:\n```python\nwith open('file.txt') as f:\n    data = f.read()\n```"
  },
  {
    label: "move_left",
    kind: "Function",
    detail: "Move character left",
    documentation: "Moves the character one step to the left.\n\nExample:\n```python\nmove_left()\n```"
  },
  {
    label: "move_right",
    kind: "Function",
    detail: "Move character right",
    documentation: "Moves the character one step to the right.\n\nExample:\n```python\nmove_right()\n```"
  },
  {
    label: "jump",
    kind: "Function",
    detail: "Make character jump",
    documentation: "Makes the character jump upward.\n\nExample:\n```python\njump()\n```"
  }
];
