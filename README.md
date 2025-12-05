# Rafiq-AI - Secrétaire Virtuel Intelligent

Rafiq-AI est un assistant virtuel intelligent conçu pour le **Défi National de la Nuit de l'Info 2025**. Il incarne l'esprit de résistance numérique du "Village Numérique Résistant" (NIRD) et aide les visiteurs à comprendre les enjeux de la souveraineté numérique.

## 🚀 Fonctionnalités

- **💬 Chatbot Intelligent** : Répond aux questions sur le défi, les règles, et la démarche NIRD.
- **🧠 Base de Connaissances Dynamique** : Permet aux utilisateurs (ou administrateurs) d'ajouter du texte personnalisé (FAQ, services, horaires) que l'IA apprend instantanément.
- **🌍 Multilingue** : Supporte le français et comprend les expressions courantes en **Hassaniya** (arabe dialectal mauritanien).
- **⚡ Intégration Facile** : Conçu comme un composant React autonome, facile à intégrer dans n'importe quel projet Web.
- **🤖 Powered by DeepSeek R1** : Utilise le modèle DeepSeek via OpenRouter pour des réponses précises et contextuelles.

## 🛠️ Installation et Configuration

### 1. Prérequis

- Node.js (v18+)
- Une clé API OpenRouter (avec accès à `deepseek/deepseek-chat` ou un autre modèle).

### 2. Installation

Clonez le projet et installez les dépendances :

```bash
git clone <votre-repo>
cd defiPrincipal
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API :

```env
VITE_OPENROUTER_API_KEY=sk-or-votre-cle-api-ici
```

### 4. Lancement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## 📖 Guide d'Utilisation de Rafiq-AI

### Utiliser le Chatbot

1. Cliquez sur l'icône de bulle en bas à droite de l'écran.
2. Posez votre question (ex: "C'est quoi le défi 2025 ?", "Quels sont les critères d'évaluation ?").
3. Rafiq-AI vous répondra en se basant sur ses connaissances pré-chargées.

### Ajouter une Base de Connaissances (Fonctionnalité "Module d'adaptation")

Rafiq-AI peut apprendre de nouvelles informations à la volée !

1. Ouvrez le chatbot.
2. Cliquez sur le bouton **"⚙️ Config"** en haut à droite de la fenêtre du chat.
3. Dans la zone de texte, collez vos informations (présentation de votre entreprise, liste de services, FAQ interne, etc.).
4. Cliquez sur **"Sauvegarder & Retour"**.
5. Posez une question sur le texte que vous venez d'ajouter. Rafiq-AI utilisera ces nouvelles informations pour vous répondre !

*Exemple : Collez "Le service support est ouvert de 9h à 12h." puis demandez "Quels sont les horaires du support ?".*

## 💻 Intégration dans un autre site

Rafiq-AI est conçu pour être portable. Pour l'intégrer ailleurs :

1. Copiez le dossier `src/components/Chatbot.tsx` et `src/components/ui` (pour les boutons/inputs).
2. Copiez le fichier de configuration `src/configs/chatbot-prompt.ts`.
3. Assurez-vous d'avoir `framer-motion`, `lucide-react`, et `react-markdown` installés.
4. Importez et utilisez le composant :

```jsx
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div>
      {/* Votre contenu */}
      <Chatbot title="Mon Assistant" />
    </div>
  );
}
```

## 🏗️ Stack Technique

- **Frontend** : React, Vite
- **Styling** : Tailwind CSS, Shadcn UI
- **Animations** : Framer Motion
- **IA** : OpenRouter API (Modèle DeepSeek R1)
- **Icônes** : Lucide React

## 🏆 Critères du Défi Respectés

- **Qualité des réponses** : Prompt ingénierie optimisé pour le contexte NIRD.
- **Adaptation dynamique** : Interface de configuration intégrée pour l'ajout de connaissances.
- **Facilité d'usage** : Interface "Plug & Play", aucune config complexe requise.
- **Hassaniya** : Instructions spécifiques dans le prompt système pour gérer le dialecte.

---
*Développé pour la Nuit de l'Info 2025.*
