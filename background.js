let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTabId) {
    recordTime(activeTabId);
  }
  activeTabId = activeInfo.tabId;
  startTime = new Date();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    startTime = new Date();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) {
    recordTime(activeTabId);
    activeTabId = null;
    startTime = null;
  }
});

function recordTime(tabId) {
  const endTime = new Date();
  const timeSpent = (endTime - startTime) / 1000; // time in seconds

  chrome.tabs.get(tabId, (tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.storage.local.get([domain], (result) => {
      const totalTime = result[domain] || 0;
      chrome.storage.local.set({ [domain]: totalTime + timeSpent });
    });
  });
}
