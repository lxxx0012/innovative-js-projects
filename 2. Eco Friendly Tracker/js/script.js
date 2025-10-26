// Update Progress Bar
function updateProgress(value) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = value + '%';
  }
  updateProgress(50); // Example progress update
  
  // Create Interactive Chart with Chart.js
  const ctx = document.getElementById('impactChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Carbon Reduction',
        data: [10, 20, 30, 40],
        borderColor: 'green',
        borderWidth: 2
      }]
    }
  });
  
  // Handle Eco Challenges
  function completeChallenge() {
    alert('Challenge Completed!');
  }
  
  // Community Feed
  function submitTip() {
    const tipInput = document.getElementById('tip-input').value;
    const tipsDisplay = document.getElementById('tips-display');
    tipsDisplay.innerHTML += `<p>${tipInput}</p>`;
    document.getElementById('tip-input').value = ''; // Clear input field
  }
  
  // Leaderboard Interaction (optional dynamic functionality)
  document.getElementById('leaderboard-list').innerHTML += '<li><img src="assets/icons/cup.svg" alt="Trophy Icon" class="icon"> Christine - 130 points</li>';
  