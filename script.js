const input = document.getElementById("terminal-input");
const output = document.getElementById("output");
const buttons = document.querySelectorAll(".cmd-btn");

const commands = {
  help: "Commandes disponibles : whoami, ls, cd projets, cat about.txt",
  whoami: "chaima",
  ls: "projets/ document skills.txt about.txt",
  "cd projets": "Accès au dossier projets...",
  "cat about.txt": "Chaima est une étudiante passionnée par la cybersécurité et le développement.",
};

function executeCommand(cmd) {
  const userLine = document.createElement("div");
  userLine.textContent = `chaima@ciel-terminal:$ ${cmd}`;
  output.appendChild(userLine);

  const responseLine = document.createElement("div");
  responseLine.textContent = commands[cmd] || `bash: ${cmd}: commande introuvable`;
  output.appendChild(responseLine);

  output.scrollTop = output.scrollHeight;
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    executeCommand(cmd);
    input.value = "";
  }
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    executeCommand(button.textContent);
  });
});
