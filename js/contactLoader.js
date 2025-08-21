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
  }

  initializeInteractivity() {
    // Add scroll to top functionality
    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  const loader = new ContactLoader();
  await loader.loadAllSections();
});
