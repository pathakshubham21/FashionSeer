document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const imageFile = document.getElementById('imageUpload').files[0];
    const prompt = document.getElementById('prompt').value;

    if (!imageFile || !prompt) {
        alert('Please upload an image and enter a prompt.');
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', prompt);

    // Replace this with your server endpoint that handles the image and prompt
    const serverEndpoint = 'file:///Users/shubhampath/Desktop/FashionSeer/Index.html';

    try {
        const response = await fetch(serverEndpoint, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to get suggestions');
        }

        const data = await response.json();
        displaySuggestions(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching suggestions. Please try again later.');
    }
});

function displaySuggestions(data) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    data.suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion';
        suggestionElement.innerHTML = `
            <p>${suggestion.description}</p>
            <a href="${suggestion.link}" target="_blank">Buy on Flipkart</a>
        `;
        suggestionsContainer.appendChild(suggestionElement);
    });
}
