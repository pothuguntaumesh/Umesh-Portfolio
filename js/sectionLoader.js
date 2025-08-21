// Section loader for modular portfolio
class SectionLoader {
  constructor() {
    this.sections = [
      { id: "hero-section", file: "sections/hero.html" },
      { id: "achievements-section", file: "sections/achievements.html" },
      { id: "projects-section", file: "sections/projects.html" },
      { id: "tldr-section", file: "sections/tldr.html" },
      { id: "personal-cards-section", file: "sections/personal-cards.html" },
      { id: "experience-section", file: "sections/experience.html" },
      { id: "other-projects-section", file: "sections/other-projects.html" },
      { id: "directory-section", file: "sections/directory.html" },
    ];
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

    // Initialize interactive features after all sections are loaded
    this.initializeInteractivity();

    // Hide loading indicator and show content
    document.getElementById("loading").style.display = "none";
    document.querySelector(".main-container").style.visibility = "visible";
  }

  initializeInteractivity() {
    // Re-attach event listeners after dynamic loading
    this.attachToggleListeners();
  }

  attachToggleListeners() {
    // Re-attach toggle functionality for project details
    window.toggleDetails = function (id) {
      const element = document.getElementById(id);
      const toggle = event.target;

      if (element.style.display === "block") {
        element.style.display = "none";
        toggle.textContent = "⌄";
        toggle.classList.remove("up-caret");
        toggle.classList.add("down-caret");
      } else {
        element.style.display = "block";
        toggle.textContent = "⌃";
        toggle.classList.remove("down-caret");
        toggle.classList.add("up-caret");
      }
    };

    // Re-attach toggle functionality for personal cards
    window.toggleCard = function (cardId) {
      const cardContent = document.getElementById(cardId);
      const toggleText = event.target
        .closest(".card-header")
        .querySelector(".card-toggle");

      if (cardContent.style.display === "block") {
        cardContent.style.display = "none";
        toggleText.textContent = "OPEN";
      } else {
        cardContent.style.display = "block";
        toggleText.textContent = "CLOSE";
      }
    };

    // Re-attach scroll to top functionality
    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  const loader = new SectionLoader();
  await loader.loadAllSections();
});
