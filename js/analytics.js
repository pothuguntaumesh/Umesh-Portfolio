// Vercel Analytics Integration
// Load analytics when the page is ready
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're in production (on Vercel)
  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    // Load Vercel Analytics
    loadVercelAnalytics();
  }
});

function loadVercelAnalytics() {
  // Create script element for Vercel Analytics
  const script = document.createElement("script");
  script.src = "https://va.vercel-scripts.com/v1/script.debug.js";
  script.defer = true;
  script.setAttribute("data-api", "/api/va");

  // Add to head
  document.head.appendChild(script);

  // Initialize analytics when script loads
  script.onload = function () {
    if (window.va) {
      window.va("page_view");
    }
  };
}

// Track custom events (optional)
function trackEvent(eventName, eventData = {}) {
  if (window.va) {
    window.va("track", eventName, eventData);
  }
}

// Track form submissions
function trackFormSubmission(formType) {
  trackEvent("form_submission", { type: formType });
}

// Track project expansions
function trackProjectExpansion(projectName) {
  trackEvent("project_expanded", { project: projectName });
}

// Export functions for use in other scripts
window.trackEvent = trackEvent;
window.trackFormSubmission = trackFormSubmission;
window.trackProjectExpansion = trackProjectExpansion;
