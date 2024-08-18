document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dashboardLink').addEventListener('click', function() {
        chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
    });

    document.getElementById('goalsLink').addEventListener('click', function() {
        chrome.tabs.create({ url: chrome.runtime.getURL('goals.html') });
    });

    document.getElementById('aiAnalysisLink').addEventListener('click', function() {
        chrome.tabs.create({ url: chrome.runtime.getURL('ai_analysis.html') });
    });
});
