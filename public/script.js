document.getElementById('screenshot-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const response = await fetch('/screenshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });

    const result = await response.json();
    if (result.screenshot) {
        document.getElementById('screenshot-result').innerHTML = `<img src="${result.screenshot}" alt="Screenshot" class="mt-4 border border-gray-300 rounded-md">`;
    } else {
        document.getElementById('screenshot-result').textContent = result.error;
    }
});
