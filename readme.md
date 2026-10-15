## npm scripts
* angular-app start
    * angular http://localhost:4200 
* website director start http-server
    * http://localhost:8080

## python backend
cd backend
python -m venv .venv
python -m pip install -r requirements.txt
python -m pip show fastapi langchain langchain-openai uvicorn

### to freeze dependencies
python -m pip freeze > requirements.txt

### to use latest dependencies put this in requirements.txt see "requirements using latest versions.txt"
fastapi
uvicorn[standard]
langchain
langchain-openai
python-dotenv

### Test NVIDIA NIM locally
From your backend/ directory, activate your virtual environment and run:

bash
uvicorn main:app --reload --port 8000
Open 
http://127.0.0.1:8000/docs 

Test POST /chat with:

json
{
  "message": "Summarize my Java and Spring experience and give two examples of my accomplishments."
}
The chatbot should return an answer based on your portfolio files, using NVIDIA's model.

If you get an error, check that the model ID is available to your account, your key is valid, and your NVIDIA API access is enabled.


### Configure Render when you're ready
In your Render service's environment settings, add:

Variable                Value

OPENAI_API_KEY=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
OPENAI_MODEL=nvidia/nemotron-3.5-lightning-30b-a3b
FRONTEND_ORIGIN=https://www.oygavult.com,http://localhost:8080,http://127.0.0.1:8080

Remove the old OPENAI_API_KEY and OPENAI_MODEL variables if you no longer use them. Keep the key private.

My recommendation: get NVIDIA NIM working locally before deploying. Once you receive a successful answer from /docs, you'll know your backend can use NVIDIA's model with your existing portfolio knowledge.


