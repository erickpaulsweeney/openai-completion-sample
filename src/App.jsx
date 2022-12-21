import { useEffect, useState } from "react";

export default function App() {
  const [response, setResponse] = useState(null);
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const API_KEY = "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";

  const generatePost = async (ev) => {
    ev.preventDefault();

    const params = {
      model: "text-davinci-003",
      prompt: `Write a blog post from the title "${title}"`,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(API_KEY),
      },
      body: JSON.stringify(params),
    };

    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    
    setResponse(data.choices[0].text);
  };

  const reset = () => setResponse(null);

  useEffect(() => {
    if (title.length > 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title]);

  return (
    <div className="container">
      <h2 className="display-4 text-center py-4">OpenAI Completion Sample</h2>

      <p className="h6 text-center">
        Simply insert the title of your blog post and OpenAI shall generate 300
        words - precise, simple, and efficient
      </p>

      <form onSubmit={generatePost}>
        <h4 className="text-center mt-5 display-6">Blog Post Title</h4>
        <input
          type="text"
          className="form-control text-center"
          id="title"
          placeholder="How to Improve Your Writing in 3 Easy Steps"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          disabled={response}
        />
        <div className="text-center p-4">
          {response ? (
            <button
              onClick={reset}
              className="btn btn-dark text-center mb-4"
              disabled={disabled}
            >
              Generate New
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-dark text-center mb-4"
              disabled={disabled}
            >
              Generate
            </button>
          )}
        </div>
      </form>

      {response && (
        <div className="card p-4 mb-5" style={{ whiteSpace: "pre-line" }}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{response}</p>
        </div>
      )}
    </div>
  );
}
