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

function exportData() {
  chrome.storage.local.get(null, (result) => {
      // Convert JSON data to CSV format
      const csvData = convertToCSV(result);

      // Download the CSV file
      downloadFile(csvData, 'tab_data.csv', 'text/csv');
  });
}

// function getData() {
//   chrome.storage.local.get(null, (result) => {
//       // Convert JSON data to CSV format
//       const csvData = convertToCSV(result);
      
//       // Download the CSV file
//       return csvData;
//   });
// }


function getData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      // Convert JSON data to CSV format
      const csvData = convertToCSV(result);
      
      // Resolve the promise with the CSV data
      resolve(csvData);
    });
  });
}



// Convert JSON data to CSV format
function convertToCSV(data) {
  const header = ["Domain", "Time Spent (seconds)"];
  const rows = [header.join(',')];

  for (const [domain, time] of Object.entries(data)) {
      rows.push([domain, time].join(','));
  }

  return rows.join('\n');
}


function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Ensure you have the correct API version and syntax
chrome.browserAction.onClicked.addListener(exportData);
