# A Python Journey

A Python Journey - an interactive adventure for beginners that turns learning Python basics into playful coding quests.

## Credits

- Steve Character is drawn by `Tarkan809`
- Map tiles and assets are from Minecraft by Mojang Studios

> Project for HackNotts 2025

## Inspiration
Our inspiration came from the COMP2013 course work, which featured a pixel-style 2D game. At the same time, while exploring Monaco Editor and Pyodide, we came up with the idea of combining programming education with interactive gameplay. We wanted to create a platform that makes learning to code fun and approachable—similar to Swift Playgrounds, but for Python.

## What it does
Python Journey is an interactive learning platform built around a 2D game map. Users follow step-by-step tutorials and complete in-game tasks by writing Python code. As they progress through the challenges, they gradually build up their programming knowledge while enjoying a playful, game-like experience.

## How we built it
Frontend framework: React + Vite

Code editor: Integrated Monaco Editor with syntax highlighting, autocompletion, and real-time error checking

Python runtime: Embedded Pyodide (WebAssembly-based Python interpreter) to execute Python code directly in the browser

Game design: Developed a pixel-style 2D map with tasks tied to coding challenges

## Challenges we ran into
Monaco Editor integration: Customizing syntax autocompletion and real-time error checking was technically demanding

Pyodide integration and optimization: Running Python in the browser required performance tuning and compatibility adjustments

## Accomplishments that we're proud of
Successfully built a fully functional online Python editor with real-time execution

Designed and implemented a 2D interactive game map, making the learning process more immersive and engaging

## What we learned
Throughout the project, we gained valuable experience in:

Extending and customizing Monaco Editor

Understanding WebAssembly and the inner workings of Pyodide

Applying gamification principles to programming education to improve learner engagement

## What's next for A Python Journey
Looking ahead, we plan to:

Add more levels and tasks to cover a wider range of programming concepts

Introduce progress tracking and achievement systems to motivate learners

Optimize performance for smoother gameplay and code execution

Explore community-driven level creation, allowing users to design and share their own coding challenges

Integrate AI-powered guidance: By leveraging large language models, we aim to provide real-time hints, explain errors, and offer personalized learning paths. This will make the platform not only interactive but also adaptive, helping beginners overcome challenges more effectively.