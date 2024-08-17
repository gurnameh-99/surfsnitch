document.addEventListener('DOMContentLoaded', () => {
    loadChartData();
    document.getElementById('setGoalBtn').addEventListener('click', setGoal);
    document.getElementById('askBtn').addEventListener('click', handleChat);
});

function loadChartData() {
    chrome.storage.local.get(null, (items) => {
        // Use Chart.js or similar to create charts
        const labels = Object.keys(items);
        const data = Object.values(items);

        // Example of using Chart.js
        const ctx = document.getElementById('chartContainer').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Time Spent (seconds)',
                    data: data,
                }]
            }
        });
    });
}

function setGoal() {
    const site = document.getElementById('goalInput').value;
    const time = document.getElementById('timeInput').value;

    chrome.storage.local.set({ [site + '_goal']: time }, () => {
        alert('Goal set!');
    });
}

function handleChat() {
    const query = document.getElementById('chatInput').value;

    // Simple rule-based response
    if (query.includes('time spent')) {
        chrome.storage.local.get(null, (items) => {
            let response = '';
            for (let [site, time] of Object.entries(items)) {
                if (!site.endsWith('_goal')) {
                    response += `${site}: ${time} seconds\n`;
                }
            }
            document.getElementById('chatOutput').innerText = response;
        });
    } else {
        document.getElementById('chatOutput').innerText = "I didn't understand the query.";
    }
}
