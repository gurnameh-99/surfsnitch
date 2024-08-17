document.addEventListener('DOMContentLoaded', function () {
  // Load and display the time data
  chrome.storage.local.get(null, function (items) {
    let output = '<ul>';
    for (const [domain, time] of Object.entries(items)) {
      output += `<li>${domain}: ${time.toFixed(2)} seconds</li>`;
    }
    output += '</ul>';
    document.getElementById('timeData').innerHTML = output;
  });

  // Handle export button click
  document.getElementById('export').addEventListener('click', function () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.exportData(); // Call the exportData function from background.js
    });
  });
});
