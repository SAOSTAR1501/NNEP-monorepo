console.log("ðŸš€ [NNEP Extension] Background Service Worker initialized");

chrome.runtime.onInstalled.addListener(() => {
  console.log("âœ… [NNEP Extension] Installed successfully.");
  chrome.alarms.create("nnep_keep_alive", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "nnep_keep_alive") {
    // Keep MV3 worker active when awaiting jobs
  }
});
