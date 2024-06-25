from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Configure your OpenAI API key
openai.api_key = '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'

@app.route('/get-suggestions', methods=['POST'])
def get_suggestions():
    image = request.files.get('image')
    prompt = request.form.get('prompt')

    if not image or not prompt:
        return jsonify({'error': 'Image and prompt are required'}), 400

    # Here you would process the image to determine body shape and color tone
    # For simplicity, let's assume you have a function `analyze_image` that does this
    body_shape, color_tone = analyze_image(image)

    # Generate a detailed prompt for ChatGPT
    chatgpt_prompt = f"Suggest the best clothes for a person with {body_shape} body shape and {color_tone} color tone. The style they are looking for is: {prompt}. Provide Flipkart links for the suggestions."

    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=chatgpt_prompt,
        max_tokens=500
    )

    suggestions = response.choices[0].text.strip().split('\n')
    formatted_suggestions = []
    for suggestion in suggestions:
        if suggestion:
            description, link = suggestion.split(' - ')
            formatted_suggestions.append({'description': description, 'link': link})

    return jsonify({'suggestions': formatted_suggestions})

def analyze_image(image):
    # Dummy function to simulate image analysis
    return 'average', 'fair'

if __name__ == '__main__':
    app.run(debug=True)
