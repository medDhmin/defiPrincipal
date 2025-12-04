async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erreur lors du chargement de ${componentPath}:`, error);
    }
}

async function loadAllComponents() {
    await Promise.all([
        loadComponent('navbar-container', 'components/navbar.html'),
        loadComponent('hero-container', 'components/hero.html'),
        loadComponent('parcours-container', 'components/parcours.html'),
        loadComponent('simulateur-container', 'components/simulateur.html'),
        loadComponent('guides-container', 'components/guides.html'),
        loadComponent('communaute-container', 'components/communaute.html'),
        loadComponent('footer-container', 'components/footer.html')
    ]);
    
    initializeApp();
}

function initializeApp() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    animateStats();
    
    calculateSavings();
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    const cards = document.querySelectorAll('.guide-card, .role-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllComponents();
});

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(value);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

let selectedRole = null;

const roleContents = {
    eleve: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant qu'élève, tu peux participer à la transition de ton école ! Linux permet de faire fonctionner des ordinateurs anciens avec des performances modernes. Tu peux même tester Linux sur ton ordinateur personnel pour découvrir ses avantages."
        },
        step3: {
            title: "Construire le Village",
            description: "Comment toi, en tant qu'élève, peux agir",
            actions: [
                { num: 1, title: "Sensibiliser", desc: "Parle de NIRD à tes camarades et professeurs" },
                { num: 2, title: "Tester", desc: "Essaie Linux sur un vieux PC ou en mode live USB" },
                { num: 3, title: "Participer", desc: "Rejoins le club informatique ou propose un projet NIRD" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Tu es prêt à agir en tant qu'élève",
            badge: "Élève Résistant Numérique"
        }
    },
    enseignant: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant qu'enseignant, tu es un acteur clé de la transition ! Linux offre tous les outils pédagogiques nécessaires (LibreOffice, GIMP, etc.) et permet de former tes élèves à un numérique responsable et souverain."
        },
        step3: {
            title: "Construire le Village",
            description: "Les 3 étapes pour adopter NIRD dans ton établissement",
            actions: [
                { num: 1, title: "Mobilisation", desc: "Sensibilise ta direction, présente les économies possibles" },
                { num: 2, title: "Expérimentation", desc: "Teste Linux sur quelques machines avec tes élèves" },
                { num: 3, title: "Intégration", desc: "Généralise avec reconditionnement et formation de l'équipe" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Tu es prêt à guider ta communauté",
            badge: "Enseignant Résistant Numérique"
        }
    },
    collectivite: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant que collectivité, NIRD vous permet d'économiser des milliers d'euros tout en protégeant les données de vos citoyens. Les données restent en Europe, conformément au RGPD, et vous réduisez votre dépendance aux Big Tech."
        },
        step3: {
            title: "Construire le Village",
            description: "Les 3 étapes pour adopter NIRD dans votre collectivité",
            actions: [
                { num: 1, title: "Évaluation", desc: "Auditez vos équipements et calculez les économies potentielles" },
                { num: 2, title: "Pilotage", desc: "Lancez un projet pilote dans quelques établissements" },
                { num: 3, title: "Déploiement", desc: "Généralisez avec reconditionnement et formation des agents" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Vous êtes prêt à libérer votre collectivité",
            badge: "Collectivité Résistante Numérique"
        }
    },
    famille: {
        step1: {
            title: "Défi : Identifier le Goliath",
            description: "Teste tes connaissances sur les dépendances numériques",
            question: "Combien d'ordinateurs l'État a-t-il dû jeter à cause de l'obsolescence de Windows 10 ?"
        },
        step2: {
            title: "Découvrir la Potion Magique",
            description: "Linux, le logiciel libre qui prolonge la vie de tes PC",
            content: "En tant que famille, vous pouvez comprendre les enjeux et soutenir l'école de vos enfants. NIRD permet aux écoles d'économiser de l'argent qui peut être réinvesti dans l'éducation, tout en formant vos enfants à un numérique responsable."
        },
        step3: {
            title: "Construire le Village",
            description: "Comment vous, en tant que famille, pouvez soutenir NIRD",
            actions: [
                { num: 1, title: "Comprendre", desc: "Informez-vous sur les enjeux du numérique responsable" },
                { num: 2, title: "Soutenir", desc: "Soutenez l'école dans sa démarche NIRD lors des conseils" },
                { num: 3, title: "Participer", desc: "Proposez votre aide pour le reconditionnement des PC" }
            ]
        },
        step4: {
            title: "Rejoindre la Résistance",
            description: "Félicitations ! Vous êtes prêt à soutenir l'école",
            badge: "Famille Résistante Numérique"
        }
    }
};

function selectRole(role) {
    selectedRole = role;
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.classList.remove('selected');
        if (card.getAttribute('data-role') === role) {
            card.classList.add('selected');
            card.style.borderColor = 'var(--primary-color)';
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.borderColor = '';
            card.style.transform = '';
        }
    });
    
//reset quizz when changing the profil
    resetQuiz();
    
    const parcoursContent = document.getElementById('parcours-content');
    parcoursContent.classList.remove('hidden');
    
    setTimeout(() => {
        generateRoleContent(role);
        showStep(1);
        resetQuiz();
    }, 100);
    
    setTimeout(() => {
        scrollToSection('parcours');
    }, 300);
}

function generateRoleContent(role) {
    const content = roleContents[role];
    if (!content) {
        console.error('Contenu non trouvé pour le rôle:', role);
        return;
    }
    
    const parcoursSteps = document.querySelector('.parcours-steps');
    if (!parcoursSteps) {
        console.error('Élément .parcours-steps non trouvé, nouvelle tentative...');
        setTimeout(() => generateRoleContent(role), 200);
        return;
    }
    
    console.log('Génération du contenu pour le rôle:', role);
    
    // 1 - Quizw
    const step1 = parcoursSteps.querySelector('[data-step="1"]');
    if (step1) {
        const h3 = step1.querySelector('.step-content h3');
        const p = step1.querySelector('.step-content > p');
        if (h3) h3.textContent = content.step1.title;
        if (p) p.textContent = content.step1.description;
        const questionEl = step1.querySelector('.quiz-question p');
        if (questionEl) {
            questionEl.innerHTML = `<strong>Question 1 :</strong> ${content.step1.question}`;
        }
        resetQuiz();
    }
    
    //2 - Potion magique
    const step2 = parcoursSteps.querySelector('[data-step="2"]');
    if (step2) {
        const h3 = step2.querySelector('.step-content h3');
        const p = step2.querySelector('.step-content > p');
        if (h3) h3.textContent = content.step2.title;
        if (p) p.textContent = content.step2.description;
        const infoText = step2.querySelector('.info-text p');
        if (infoText) {
            const existingP = infoText;
            existingP.textContent = content.step2.content;
        }
    }
    
    const step3 = parcoursSteps.querySelector('[data-step="3"]');
    if (step3) {
        const h3 = step3.querySelector('.step-content h3');
        const p = step3.querySelector('.step-content > p');
        if (h3) h3.textContent = content.step3.title;
        if (p) p.textContent = content.step3.description;
        const etapesContainer = step3.querySelector('.etapes-nird');
        if (etapesContainer && content.step3.actions) {
            etapesContainer.innerHTML = content.step3.actions.map(action => `
                <div class="etape-card">
                    <div class="etape-number">${action.num}</div>
                    <h4>${action.title}</h4>
                    <p>${action.desc}</p>
                </div>
            `).join('');
        }
    }
    
    const step4 = parcoursSteps.querySelector('[data-step="4"]');
    if (step4) {
        const h3 = step4.querySelector('.step-content h3');
        const p = step4.querySelector('.step-content > p');
        if (h3) h3.textContent = content.step4.title;
        if (p) p.textContent = content.step4.description;
        const badgeTitle = step4.querySelector('.badge-text h4');
        if (badgeTitle) {
            badgeTitle.textContent = content.step4.badge;
        }
    }
    
    console.log('Contenu généré avec succès pour:', role);
}

let currentStep = 1;
const totalSteps = 4;

function showStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    const currentStepElement = document.querySelector(`.step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStep = stepNumber;
    }
}

function nextStep(stepNumber) {
    if (stepNumber < totalSteps) {
        showStep(stepNumber + 1);
    }
}

let quizAnswers = {};

function resetQuiz() {
    const allQuizOptions = document.querySelectorAll('.quiz-option');
    allQuizOptions.forEach(option => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });
    
    quizAnswers = {};
    currentStep = 1;
}

function checkAnswer(questionNum, answer, isCorrect) {
    const options = document.querySelectorAll(`.quiz-question:nth-of-type(${questionNum}) .quiz-option`);
    options.forEach(option => {
        option.disabled = true;
        option.classList.remove('correct', 'incorrect');
    });
    
    const selectedOption = event.target;
    if (isCorrect) {
        selectedOption.classList.add('correct');
        quizAnswers[questionNum] = true;
        
        setTimeout(() => {
            showStep(2);
        }, 1500);
    } else {
        selectedOption.classList.add('incorrect');
        quizAnswers[questionNum] = false;
        
        setTimeout(() => {
            options.forEach(opt => {
                opt.disabled = false;
                opt.classList.remove('correct', 'incorrect');
            });
        }, 2000);
    }
}

function calculateSavings() {
    const nbPC = parseInt(document.getElementById('nb-pc').value) || 50;
    const agePC = parseInt(document.getElementById('age-pc').value) || 8;
    const licences = parseInt(document.getElementById('licences').value) || 5000;
    
    const prixPCNeuf = 800;
    const dureeViePC = 10; 
    
    
    const ageDans5Ans = agePC + 5; // age des PC dans 5 ans
    const pourcentageARemplacer = Math.min(100, Math.max(0, (ageDans5Ans / dureeViePC) * 100));
    const nbPCARemplacer = Math.ceil(nbPC * (pourcentageARemplacer / 100));
    const nbPCSauves = nbPC - nbPCARemplacer;
    
    // depends on the age
    let prixReconditionnementParPC;
    if (agePC <= 5) {
        prixReconditionnementParPC = 30; 
    } else if (agePC <= 8) {
        prixReconditionnementParPC = 50; 
    } else if (agePC <= 12) {
        prixReconditionnementParPC = 80; 
    } else {
        prixReconditionnementParPC = 120; 
    }
    
    // Scénario Actuel
    // Dans le scénario actuel, on doit remplacer tous les PC qui deviennent t3abe (have to return to this tomorrow if have time to do so hihihi)
    const coutRachat = nbPCARemplacer * prixPCNeuf;
    const coutLicences5ans = licences * 5;
    const totalActuel = coutRachat + coutLicences5ans;
    
    // Scénario NIRD
    // Avec NIRD, on reconditionne tous les PC (même les vieux peuvent être sauves)
    const coutReconditionnement = nbPC * prixReconditionnementParPC;
    const totalNIRD = coutReconditionnement;
    
    const economies = totalActuel - totalNIRD;
    
    document.getElementById('cout-rachat').textContent = formatCurrency(coutRachat);
    document.getElementById('cout-licences').textContent = formatCurrency(coutLicences5ans);
    document.getElementById('total-actuel').textContent = formatCurrency(totalActuel);
    document.getElementById('cout-reconditionnement').textContent = formatCurrency(coutReconditionnement);
    document.getElementById('total-nird').textContent = formatCurrency(totalNIRD);
    document.getElementById('economies').textContent = formatCurrency(economies);
    
    const pcSauvesEl = document.getElementById('pc-sauves');
    const pcRemplacesEl = document.getElementById('pc-remplaces');
    if (pcSauvesEl) {
        pcSauvesEl.textContent = `${nbPCSauves} PC sauvés`;
    }
    if (pcRemplacesEl) {
        pcRemplacesEl.textContent = `${nbPCARemplacer} PC`;
    } 
    animateEconomies(economies);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
}

function animateEconomies(targetValue) {
    const element = document.getElementById('economies');
    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            element.textContent = formatCurrency(targetValue);
            clearInterval(timer);
        } else {
            element.textContent = formatCurrency(Math.floor(current));
        }
    }, 30);
}


