# Your AI Portfolio Chatbot: Project Plan

I'd approach this as a small, professional software project that you can build incrementally and confidently demonstrate in a job interview. You already have your GitHub Pages website, a strong Java/full-stack background, and two knowledge files to start with.

The goal: turn your existing Polyglot Tickets website into an interactive AI portfolio that answers questions about your career, technical skills, accomplishments, and application architecture.

## 1. The roadmap

## Phase 1 — Prepare the knowledge

Start here

Estimated time: 30–60 minutes

- Add `backend/portfolio.md` with your professional background.
- Add `backend/project_knowledge.md` with your project details.
- Verify facts, technologies, accomplishments, and dates.
- Commit both files to GitHub.
  Deliverable: organized knowledge for the AI assistant.

## Phase 2 — Build the Python API

Estimated time: 1–2 hours

- Create `backend/main.py` and `requirements.txt`.
- Set up Python and a virtual environment.
- Connect FastAPI to LangChain and an LLM provider.
- Load both Markdown files into the prompt.
- Test questions through `/docs`.
  Deliverable: a working chatbot API on your computer.

## Phase 3 — Integrate the website

Estimated time: 1–2 hours

- Add `public/chatbot.css`.
- Add `public/chatbot.js`.
- Integrate the floating chat panel into `public/index.html`.
- Test responsive behavior, loading indicators, and error handling.
- Verify the existing framework demos still work.
  Deliverable: a functioning chat interface on your existing website.

## Phase 4 — Deploy

Estimated time: 45–90 minutes

- Deploy the Python backend to Render or another Python host.
- Configure environment variables and CORS.
- Connect the GitHub Pages frontend to the deployed API.
- Test the live website from a fresh browser session.
  Deliverable: a publicly accessible portfolio chatbot.

## Phase 5 — Make it interview-ready

Estimated time: 2–4 hours

- Add automated tests and request validation.
- Add rate limiting and API cost controls.
- Improve answer grounding and source references.
- Document architecture and trade-offs in the README.
- Prepare a short demo and interview talking points.
  Deliverable: a project you can explain, defend, and demonstrate.

These are planning estimates, not guarantees. As a beginner with Python, allow extra time for environment setup and deployment troubleshooting.

## 2. Recommended project structure

Keep the existing website and framework demos. Add only the files needed for the chatbot.

text
```
bobfyahoo.github.io/
├── public/
│   ├── index.html
│   ├── chatbot.css
│   └── chatbot.js
├── backend/
│   ├── main.py
│   ├── portfolio.md
│   ├── project_knowledge.md
│   └── requirements.txt
├── react-app/
├── angular-app/
├── vue-app/
├── package.json
├── .gitignore
└── README.md
```

Keep the knowledge files outside `public/`. If your GitHub repository is public, however, those files will still be visible through GitHub itself. The API key must never be stored in the repository or frontend JavaScript.

## 3. The technology choices

| Component | Recommended choice | Why |
| --- | --- | --- |
| Existing frontend | HTML, CSS, JavaScript | Preserves your current website |
| Backend | Python + FastAPI | Simple REST API, easy to test |
| LLM orchestration | LangChain | Demonstrates an AI application framework |
| Model | OpenAI API | Straightforward integration |
| Knowledge source | Markdown files | Easy to edit and version-control |
| Hosting | GitHub Pages + Render | Separates static frontend from Python backend |
| Testing | pytest | Demonstrates reliable engineering practices |
| Future enhancement | RAG | Scales to larger project documentation |

The initial version doesn't need a vector database. You can provide the contents of both Markdown files as context to the model. Once that works, introduce retrieval-augmented generation (RAG) as a separate milestone.

## 4. Define what "done" means

Before adding advanced features, make sure the first version passes these acceptance tests.

## Acceptance checklist

0/8 complete

[ ]Professional backgroundAnswers questions about your Tradeweb and O'Reilly experience using the information in portfolio.md.

[ ]Technical skillsIdentifies relevant Java, Spring, database, frontend, and AI-assisted development skills.

[ ]Project knowledgeExplains the Polyglot Tickets repository and its verified technologies.

[ ]Honest answersAcknowledges when a detail is missing instead of inventing a qualification or feature.

[ ]Follow-up handlingCan handle at least basic follow-up questions if conversation history is implemented.

[ ]Error handlingShows a useful error message when the API is unavailable.

[ ]SecurityKeeps the API key server-side and applies rate limiting before public release.

[ ]Live deploymentWorks through the published GitHub Pages website over HTTPS.

## 5. What to demonstrate to a hiring manager

Prepare a three-minute walkthrough:

1. The problem: Visitors need an easy way to learn about your experience and technical work.
2. The architecture: Explain how the browser calls FastAPI, how LangChain passes the knowledge to the model, and how the response returns to the browser.
3. The implementation: Show how the chatbot uses `portfolio.md` and `project_knowledge.md`.
4. The engineering decisions: Explain why you started without RAG, how you protect API credentials, and how you handle errors and costs.
5. The next iteration: Demonstrate how you'd add RAG, source citations, automated evaluations, or conversation memory.

Your strongest differentiator is not simply that you used an LLM. It's that you combined your existing enterprise development experience with a thoughtfully designed, tested, and deployed AI application.

## 6. Start with this first task

For your next working session, focus only on getting the backend running locally. Don't deploy or redesign the website yet.

- [ ]Confirm both Markdown files are committed.
- [ ]Install Python and create a virtual environment.
- [ ]Create `requirements.txt` and `main.py`.
- [ ]Configure your model API key locally.
- [ ]Start FastAPI and test `/health`.
- [ ]Submit one question through `/docs` and verify the answer.

Once this succeeds, the frontend and deployment become much easier to troubleshoot.

My recommendation: build a reliable end-to-end version first, then invest in RAG and evaluation. A small, working AI portfolio with clear architecture and sound engineering practices will make a stronger job-demo project than a large collection of unfinished features.