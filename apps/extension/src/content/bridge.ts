console.log("ðŸŒ [NNEP Extension] Content Bridge attached to document.");

window.addEventListener("message", (event) => {
  if (event.data?.type === "NNEP_LAUNCH_HANDSHAKE") {
    console.log("ðŸ¤ [NNEP Extension] Received handshake from Web Portal:", event.data);
  }
});
