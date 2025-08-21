// Contact page loader
class ContactLoader {
  constructor() {
    this.sections = [{ id: "contact-section", file: "sections/contact.html" }];
  }

  async loadSection(sectionConfig) {
    try {
      const response = await fetch(sectionConfig.file);
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionConfig.file}`);
      }
      const html = await response.text();
      const container = document.getElementById(sectionConfig.id);
      if (container) {
        container.innerHTML = html;
      }
    } catch (error) {
      console.error(`Error loading section ${sectionConfig.id}:`, error);
    }
  }

  async loadAllSections() {
    const loadPromises = this.sections.map((section) =>
      this.loadSection(section)
    );
    await Promise.all(loadPromises);

    // Initialize interactive features after sections are loaded
    this.initializeInteractivity();

    // Hide loading indicator and show content
    document.getElementById("loading").style.display = "none";
    document.querySelector(".main-container").style.visibility = "visible";
  }

  initializeInteractivity() {
    // Add scroll to top functionality
    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Add form submission handler
    this.setupFormHandler();
  }

  setupFormHandler() {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });
    }
  }

  async handleFormSubmission(form) {
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Submit to FormSubmit
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        this.showSuccessMessage();
        form.reset(); // Clear the form
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      this.showErrorMessage();
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = `
      <div class="success-content">
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    `;

    // Insert at the top of contact section
    const contactSection = document.querySelector(".contact");
    contactSection.insertBefore(successDiv, contactSection.firstChild);

    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.style.opacity = "0";
      setTimeout(() => successDiv.remove(), 300);
    }, 5000);
  }

  showErrorMessage() {
    // Create error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.innerHTML = `
      <div class="error-content">
        <h3>Something went wrong</h3>
        <p>Please try again or email me directly.</p>
      </div>
    `;

    // Insert at the top of contact section
    const contactSection = document.querySelector(".contact");
    contactSection.insertBefore(errorDiv, contactSection.firstChild);

    // Remove after 5 seconds
    setTimeout(() => {
      errorDiv.style.opacity = "0";
      setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  const loader = new ContactLoader();
  await loader.loadAllSections();
});
