// Attendre que la page soit chargée
window.onload = function() {

  const input = document.getElementById("terminal-input");
  const output = document.getElementById("output");

  // Commandes disponibles dans le mini terminal
  const commands = {
    help: "Commandes disponibles : help, about, skills, projects, contact, cv",
    about: "Je suis Chaima Bejaoui, étudiante en Informatique et Cybersécurité, à la recherche d'une alternance pour Septembre 2026.",
    skills: "Compétences : HTML, CSS, JavaScript, Python, Git/GitHub, travail en équipe, autonomie",
    projects: "Mes projets sont visibles dans la section Projets de ce portfolio.",
    contact: "Vous pouvez me contacter via Email, LinkedIn ou GitHub dans la section Contact.",
    cv: "Cliquez sur le bouton CV dans le menu pour voir ou télécharger mon CV."
  };

  // Écouter la touche Entrée
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const command = input.value.toLowerCase();
      input.value = ""; // vider le champ

      // Vérifier si la commande existe
      if (commands[command]) {
        output.innerHTML += `<p style="color:#00ff99;">> ${command}</p><p>${commands[command]}</p>`;
      } else {
        output.innerHTML += `<p style="color:#00ff99;">> ${command}</p><p>Commande non reconnue. Tapez 'help' pour voir les commandes.</p>`;
      }

      // Faire défiler automatiquement vers le bas
      output.scrollTop = output.scrollHeight;
    }
  });

};
