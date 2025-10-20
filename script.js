document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.cmd-btn');

    // Définition des couleurs néon
    const NEON_PURPLE = '#b26eff';
    const NEON_CYAN = '#00ffff';
    
    // --- Définition des Commandes ---
    const commands = {
        'help': (history) => {
            history.push(`Commandes disponibles : <span style='color:${NEON_CYAN}'>whoami</span>, <span style='color:${NEON_CYAN}'>ls</span>, <span style='color:${NEON_CYAN}'>cat [fichier]</span>, <span style='color:${NEON_CYAN}'>ping google.com </span>, <span style='color:${NEON_CYAN}'>whois chaima</span>, <span style='color:${NEON_CYAN}'>java -version</span>.`);
            history.push(`Pour naviguer, utilisez <span style='color:${NEON_CYAN}'>cd [section]</span> (ex: cd projets, cd competences, cd certifications).`);
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
            history.push(`  <span style='color:${NEON_CYAN}'>projets/</span> (Travaux clés)`);
            history.push(`  <span style='color:${NEON_CYAN}'>competences/</span> (Skills techniques)`);
            history.push(`  <span style='color:${NEON_CYAN}'>certifications/</span> (Certifications Cisco/ANSSI)`);
            history.push("  about.txt (Présentation)");
            history.push("  cv.pdf (Curriculum Vitae)");
            return history;
        },

        'cat about.txt': (history) => {
            history.push("Étudiante passionnée par l'infrastructure et la cybersécurité. Maîtrise de Linux, réseaux (Cisco) et scripting Python. Rigueur, analyse et documentation sont mes mots d'ordre pour assurer la sécurité.");
            return history;
        },
        
        'cat cv.pdf': (history) => {
            history.push("Fichier binaire détecté (PDF). Tentative d'ouverture dans un nouvel onglet...");
            window.open('assets/cv.pdf', '_blank'); 
            history.push(`<span style='color:${NEON_CYAN}'>[INFO]</span> Le fichier cv.pdf a été ouvert. Vérifiez votre nouvel onglet.`);
            return history;
        },

        'ping google.com': (history) => {
            history.push('PING google.com (8.8.8.8) 56(84) bytes of data.');
            history.push('64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=15.2 ms');
            history.push('64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=14.9 ms');
            history.push('--- google.com ping statistics ---');
            history.push('2 packets transmitted, 2 received, 0% packet loss');
            return history;
        },
        
        'java -version': (history) => {
            history.push('java version "17.0.8" 2023-08-01 LTS');
            history.push('Java(TM) SE Runtime Environment');
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

        'cd certifications': (history) => {
            history.push("Accès au répertoire certifications...");
            document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
            return history;
        },
        
        // CORRECTION DE CLEAR : La fonction clear ne fait rien d'autre que retourner un tableau vide.
        // La logique de nettoyage et d'affichage est gérée par executeCommand.
        'clear': (history) => {
            return [];
        }
    }; // FIN de l'objet commands

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
            // Pour 'clear', on ne fait rien car c'est géré par executeCommand
            if (cmd === 'clear') {
                return []; 
            }
            
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
            // Gère le remplacement des astérisques (**) par <strong> pour le gras
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
            if (cmd) { 
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
        const cmdTrimmed = cmd.toLowerCase().trim();

        // Gestion spéciale du 'clear'
        if (cmdTrimmed === 'clear') {
            output.innerHTML = ''; // Vide l'écran avant d'ajouter le message
            const clearLines = [
                `chaima@ciel-terminal:$ ${cmd}`, // Affiche la commande 'clear'
                `chaima@ciel-terminal:$ <span style='color:${NEON_PURPLE}'>Terminal vidé. Tapez 'help' pour la liste des commandes.</span>`
            ];
            appendOutput(clearLines);
        } else {
            // Gestion des commandes normales
            const historyLines = processCommand(cmd);
            appendOutput(historyLines);
        }

        // CORRECTION CLÉ : Ramener le focus à l'input après chaque commande
        input.focus(); 
    }
});