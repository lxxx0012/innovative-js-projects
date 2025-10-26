// Voting System
let votes = 0;

function upvote() {
    votes++;
    document.getElementById("vote-count").innerText = votes;
}

function downvote() {
    votes--;
    document.getElementById("vote-count").innerText = votes;
}

// Recipe Upload
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Recipe uploaded successfully!');
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent successfully!');
});

// Live Cooking Sessions
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        // Send stream to remote peer using WebRTC
    })
    .catch(error => console.error('Error accessing media devices.', error));

// API Integration Example: Nutritional Information
fetch('https://api.spoonacular.com/recipes/12345/nutritionWidget.json?apiKey=3be65b210f8243e88531f878292b7743')
    .then(response => response.json())
    .then(data => console.log(data));

// API Integration Example: Recipe Translation
fetch('https://api.microsofttranslator.com/v2/Ajax.svc/Translate?text=Hello&to=es')
    .then(response => response.text())
    .then(data => console.log(data));
