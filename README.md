# 🏃‍♂️ LazyRunner

Une application mobile React Native pour les runners qui souhaitent planifier et suivre leurs séances de renforcement et de mobilité.

## ✨ Fonctionnalités

### 📅 Planificateur Hebdomadaire
- **Timeline visuelle** : Planifiez vos entraînements sur une timeline hebdomadaire
- **Types d'entraînements** : Course 🏃‍♂️, Mobilité 🧘‍♀️, Renforcement 💪
- **Couleurs personnalisées** : Choisissez des couleurs pour identifier vos entraînements
- **Modal d'ajout** : Interface intuitive pour ajouter de nouveaux entraînements

### 🧘‍♀️ Séances de Mobilité
- **Timer par exercice** : Chronomètre pour chaque exercice de mobilité
- **Préférences utilisateur** : Système de couleurs (🟢, 🔴, ⚪️) pour les exercices
- **Liste d'exercices** : Exercices de mobilité avec descriptions et images
- **Session en temps réel** : Suivi de la progression pendant la séance

### 💪 Séances de Renforcement
- **Niveaux adaptatifs** : Débutant, intermédiaire, avancé
- **Répétitions dynamiques** : Nombre de reps adapté au niveau
- **Timer de repos** : Chronomètre pour les temps de repos entre exercices
- **Validation d'exercices** : Bouton pour valider et passer au suivant

### 🎯 Session en Temps Réel
- **Timers multiples** : Temps total, temps par exercice, temps de repos
- **Progression visuelle** : Affichage de l'exercice en cours et du suivant
- **Conseils intégrés** : Tips pour optimiser chaque exercice
- **Arrêt sécurisé** : Possibilité d'arrêter la séance à tout moment

## 🏗️ Architecture

### Structure du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── button.tsx
│   ├── timer.tsx
│   ├── exercise-card.tsx
│   ├── color-legend.tsx
│   ├── weekly-planner.tsx
│   └── index.ts
├── screens/            # Écrans de l'application
│   ├── home-screen.tsx
│   ├── mobility-screen.tsx
│   ├── strengthening-screen.tsx
│   └── session-screen.tsx
├── navigation/         # Configuration de navigation
│   └── app-navigator.tsx
├── data/              # Données statiques
│   ├── mobility-exercises.ts
│   └── strengthening-exercises.ts
├── hooks/             # Hooks personnalisés
│   ├── useUser.ts
│   └── useUserPreferences.ts
├── services/          # Services métier
│   └── user-service.ts
└── types/             # Types TypeScript
    └── index.ts
```

### Technologies Utilisées
- **React Native** : Framework mobile cross-platform
- **TypeScript** : Typage statique pour la robustesse
- **React Navigation** : Navigation entre écrans
- **AsyncStorage** : Persistance des données locales
- **Kebab-case** : Convention de nommage des fichiers

## 🚀 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Installation
```bash
# Cloner le repository
git clone https://github.com/Jrejoire/lazy-runner.git
cd lazy-runner

# Installer les dépendances
npm install

# iOS (macOS uniquement)
cd ios && pod install && cd ..

# Lancer l'application
npx react-native run-android  # Pour Android
npx react-native run-ios      # Pour iOS
```

## 📱 Utilisation

### 1. Planification Hebdomadaire
- Accédez à l'écran d'accueil
- Cliquez sur les barres des jours pour ajouter des entraînements
- Choisissez l'heure, le type et la couleur
- Visualisez votre planning sur la timeline

### 2. Séances de Mobilité
- Naviguez vers l'onglet "Mobilité"
- Sélectionnez vos exercices préférés (🟢)
- Ajustez les préférences avec les couleurs
- Lancez votre séance avec "Commencer la séance"

### 3. Séances de Renforcement
- Allez dans l'onglet "Renforcement"
- Choisissez votre niveau (débutant/intermédiaire/avancé)
- Sélectionnez vos exercices
- Validez chaque exercice pendant la séance

## 🎨 Design

### Interface Utilisateur
- **Minimaliste** : Design épuré et moderne
- **Couleurs harmonieuses** : Palette de couleurs cohérente
- **Navigation intuitive** : Footer fixe avec onglets
- **Responsive** : Adaptation aux différentes tailles d'écran

### Expérience Utilisateur
- **Mode immersif** : Barre de navigation Android masquée
- **Feedback visuel** : Retours d'action clairs
- **Accessibilité** : Interface adaptée aux runners
- **Performance** : Optimisations pour une expérience fluide

## 🔧 Développement

### Scripts Disponibles
```bash
# Démarrer le serveur Metro
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Tests
npm test

# Linting
npm run lint
```

### Structure des Données
```typescript
// Types principaux
interface User {
  id: string;
  name: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  exercisePreferences: { [exerciseId: string]: 'green' | 'red' | 'white' };
  weeklyPlan: WeeklyPlan;
  createdAt: Date;
  lastActive: Date;
}

interface WeeklyPlan {
  [day: string]: {
    running?: boolean;
    mobility?: boolean;
    strengthening?: boolean;
    notes?: string;
  };
}
```

## 🚧 Roadmap

### Fonctionnalités Futures
- [ ] **Notifications** : Rappels 30min avant les séances
- [ ] **Statistiques** : Suivi des progrès et performances
- [ ] **Synchronisation** : Sauvegarde cloud des données
- [ ] **Exercices personnalisés** : Ajout d'exercices custom
- [ ] **Mode hors ligne** : Fonctionnement sans connexion
- [ ] **Partage social** : Partage des séances avec des amis

### Améliorations Techniques
- [ ] **Tests unitaires** : Couverture de tests complète
- [ ] **CI/CD** : Pipeline d'intégration continue
- [ ] **Analytics** : Suivi d'utilisation anonyme
- [ ] **Accessibilité** : Support des lecteurs d'écran
- [ ] **Internationalisation** : Support multi-langues

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines
- Respectez la convention de nommage kebab-case
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les nouvelles APIs
- Suivez les standards TypeScript

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Jrejoire** - [GitHub](https://github.com/Jrejoire)

---

⭐ Si ce projet vous plaît, n'hésitez pas à le star sur GitHub !
