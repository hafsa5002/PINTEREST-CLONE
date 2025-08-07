  const boardsTab = document.getElementById("boardsTab");
  const pinsTab = document.getElementById("pinsTab");
  const boardsContent = document.getElementById("boardsContent");
  const pinsContent = document.getElementById("pinsContent");

  boardsTab.addEventListener("click", () => {
    boardsContent.classList.remove("hidden");
    pinsContent.classList.add("hidden");

    boardsTab.classList.add("border-black", "text-gray-700");
    boardsTab.classList.remove("text-gray-500");
    pinsTab.classList.remove("border-black", "text-gray-700");
    pinsTab.classList.add("text-gray-500");
  });

  pinsTab.addEventListener("click", () => {
    pinsContent.classList.remove("hidden");
    boardsContent.classList.add("hidden");

    pinsTab.classList.add("border-black", "text-gray-700");
    pinsTab.classList.remove("text-gray-500");
    boardsTab.classList.remove("border-black", "text-gray-700");
    boardsTab.classList.add("text-gray-500");
  });

//logout
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsMenu = document.getElementById('settingsMenu');

  settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
  });

  // Optional: Hide dropdown if clicked outside
  document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
      settingsMenu.classList.add('hidden');
    }
  });

