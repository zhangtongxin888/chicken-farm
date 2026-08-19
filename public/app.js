const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.dataset.open = String(!isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.dataset.open = "false";
    });
  });
}

const checklist = document.querySelector("[data-checklist]");

if (checklist) {
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const progress = document.querySelector("[data-progress]");
  const progressLabel = document.querySelector("[data-progress-label]");
  const storageKey = "chicken-farm-beginner-progress-v1";

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    boxes.forEach((box) => {
      box.checked = saved.includes(box.value);
    });
  } catch {
    // The checklist still works if browser storage is unavailable.
  }

  const updateProgress = () => {
    const completed = boxes.filter((box) => box.checked);
    const percent = Math.round((completed.length / boxes.length) * 100);
    if (progress) progress.style.width = `${percent}%`;
    if (progressLabel) progressLabel.textContent = `${completed.length} of ${boxes.length} steps complete`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed.map((box) => box.value)));
    } catch {
      // Keep the interaction available without persistence.
    }
  };

  boxes.forEach((box) => box.addEventListener("change", updateProgress));
  updateProgress();
}
