document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.cmd-btn');

    // Définir les couleurs néon pour les utiliser dans les réponses
    const NEON_PURPLE = '#b26eff';
    const NEON_CYAN = '#00ffff';
    
    // --- Définition des Commandes Complexes ---
    const commands = {
        'help': (history) => {
            history.push(`Commandes disponibles : <span style='color:${NEON_CYAN}'>whoami</span>, <span style='color:${NEON_CYAN}'>ls</span>, <span style='color:${NEON_CYAN}'>cat [fichier]</span>, <span style='color:${NEON_CYAN}'>ping [hôte]</span>, <span style='color:${NEON_CYAN}'>whois chaima</span>, <span style='color:${NEON_CYAN}'>clear</span>.`);
            history.push(`Pour naviguer, utilisez <span style='color:${NEON_CYAN}'>cd [section]</span> (ex: cd projets).`);
            return history;
        },

        'whoami': (history) => {
            history.push(`<span style='color:${NEON_PURPLE}'>chaima : root</span>`);
            history.push("Rôle : Étudiante en BTS CIEL (Cybersécurité, Informatique ,Réseaux et Electronique)");
            history.push("Objectif : Ingénieur Cybersécurité en Alternance (Sept. 2026)");
            return history;
        },
        
        'whois chaima': (history) => {
            history.push('Domain Name: CHAIMA-BEJAOUI.FR');
            history.push('Tech Contact: CHAIMA BEJAOUI (BTS CIEL)');
            history.push('Registrar URL: ecole-ingenieur.fr');
            history.push('Created On: 2025-10-10');
            history.push('Status: Poursuite d\'études en Cybersécurité');
            return history;
        },

        'ls': (history) => {
            history.push('Fichiers/Répertoires :');
            history.push(`  <span style='color:${NEON_CYAN}'>projets/</span> (Travaux clés)`);
            history.push(`  <span style='color:${NEON_CYAN}'>competences/</span> (Skills techniques)`);
            history.push("  about.txt (Présentation)");
            history.push("  cv.pdf (Curriculum Vitae)");
            return history;
        },

        'cat about.txt': (history) => {
            history.push("Étudiante passionnée par l'infrastructure et la cybersécurité. Maîtrise de Linux, réseaux (Cisco) et scripting Python. Rigueur, analyse et documentation sont mes mots d'ordre pour assurer la sécurité.");
            return history;
        },
        
        'ping google.com': (history) => {
            history.push('PING google.com (142.250.187.163) 56(84) bytes of data.');
            history.push('64 bytes from 142.250.187.163: icmp_seq=1 ttl=117 time=15.2 ms');
            history.push('64 bytes from 142.250.187.163: icmp_seq=2 ttl=117 time=14.9 ms');
            history.push('--- google.com ping statistics ---');
            history.push('2 packets transmitted, 2 received, 0% packet loss');
            return history;
        },

        'cd projets': (history) => {
            history.push("Accès au répertoire projets...");
            document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
            return history;
        },

        'cd competences': (history) => {
            history.push("Accès au répertoire compétences...");
            document.getElementById('competences').scrollIntoView({ behavior: 'smooth' });
            return history;
        },
        
        'clear': (history) => {
            output.innerHTML = '';
            // Retirer la commande 'clear' elle-même
            history.pop(); 
            history.push(`chaima@ciel-terminal:$ <span style='color:${NEON_PURPLE}'>Terminal vidé. Tapez 'help' pour la liste des commandes.</span>`);
            return history;
        }
    };

    /**
     * Traite la commande entrée par l'utilisateur
     */
    function processCommand(command) {
        let history = [];
        const cmd = command.toLowerCase().trim();

        // 1. Afficher la ligne de commande tapée
        history.push(`chaima@ciel-terminal:$ ${cmd}`);

        // 2. Traiter la commande
        if (commands[cmd]) {
            if (typeof commands[cmd] === 'function') {
                history = commands[cmd](history); 
            } else {
                history.push(commands[cmd]);
            }
        } else {
            // Commande inconnue
            history.push(`<span style='color:#ff5f56;'>bash: ${cmd}: commande introuvable.</span>`);
        }
        
        return history;
    }

    /**
     * Ajoute le texte d'historique à l'output du terminal
     */
    function appendOutput(lines) {
        lines.forEach(line => {
            const newOutput = document.createElement('div');
            // Remplacer les doubles astérisques (**) par <strong> pour le gras
            newOutput.innerHTML = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 
            output.appendChild(newOutput);
        });
        // Scroll automatique vers le bas
        output.scrollTop = output.scrollHeight;
    }

    // --- Écouteurs d'événements ---

    // 1. Entrée clavier (Touche Enter)
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const cmd = input.value.trim();
            if (cmd) { // S'assurer que l'input n'est pas vide
                executeCommand(cmd);
                input.value = ""; // Vider l'input après exécution
            }
        }
    });

    // 2. Boutons prédéfinis
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const cmd = button.getAttribute('data-cmd') || button.textContent.trim();
            executeCommand(cmd);
        });
    });
    
    // Fonction wrapper pour exécuter et nettoyer
    function executeCommand(cmd) {
        const historyLines = processCommand(cmd);
        appendOutput(historyLines);
    }
});



// Ajoutez cette nouvelle commande dans l'objet 'commands' de votre script.js

'cd certifications': (history) => {
    history.push("Accès au répertoire certifications...");
    document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
    return history;
},

// Pensez aussi à mettre à jour la commande 'help' pour la lister :
'help': (history) => {
    history.push(`Commandes disponibles : <span style='color:${NEON_CYAN}'>whoami</span>, <span style='color:${NEON_CYAN}'>ls</span>, <span style='color:${NEON_CYAN}'>cat [fichier]</span>, <span style='color:${NEON_CYAN}'>ping [hôte]</span>, <span style='color:${NEON_CYAN}'>whois chaima</span>, <span style='color:${NEON_CYAN}'>docker ps</span>, <span style='color:${NEON_CYAN}'>clear</span>.`);
    history.push(`Pour naviguer, utilisez <span style='color:${NEON_CYAN}'>cd [section]</span> (ex: cd projets, <span style='color:${NEON_CYAN}'>cd certifications</span>).`); // MIS A JOUR
    return history;
},