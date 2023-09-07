import fetch from "node-fetch"

export const xd = 2;
export const subtaskPrompter = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${"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"}`
        }
    };
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
            method: "POST",
            body: JSON.stringify({prompt: "Hello, how are you?", maxTokens: 15}),
            headers: config.headers,
        });
    console.log(await response.json())
}