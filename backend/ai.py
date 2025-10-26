from flask import Flask, request, Response
import requests
import json
app = Flask(__name__)


with open("./ai.json", "r") as f:
    config = json.load(f)
    OPENAI_API_KEY = config["key"]
    OPENAI_API_URL = config["url"]


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    def generate():
        with requests.post(
            OPENAI_API_URL,
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json",
            },
            json=data,
            stream=True,   # 开启流式
        ) as r:
            for line in r.iter_lines():
                if line:
                    yield line.decode("utf-8") + "\n"

    return Response(generate(), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)
