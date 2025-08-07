# LazyRunner

Une application mobile React Native pour les runners qui souhaitent planifier et suivre leurs séances de renforcement et de mobilité.

## 🎯 Objectif

LazyRunner aide les coureurs à maintenir une routine d'entraînement équilibrée en combinant course, mobilité et renforcement musculaire.

## ✨ Fonctionnalités

### 📱 Écrans principaux

1. **HomeScreen** - Planificateur de la semaine

   - Message d'accueil personnalisé selon l'heure
   - Planificateur de la semaine avec 3 types d'entraînement
   - Sauvegarde automatique des préférences

2. **MobilityScreen** - Séance de mobilité

   - Timers pour la durée totale et par exercice
   - Liste des exercices avec préférences utilisateur
   - Système de couleurs : 🟢 (j'aime), 🔴 (je n'aime pas), ⚪️ (neutre)

3. **StrengtheningScreen** - Séance de renforcement

   - Gestion des séries et répétitions
   - Timer pour le temps de repos
   - Indicateurs de niveau (débutant, intermédiaire, avancé)

4. **SessionScreen** - Séance en cours
   - Timer global de la séance
   - Affichage de l'exercice en cours avec image
   - Conseils aléatoires pendant la séance
   - Gestion différente selon le type (mobilité/renforcement)

### 🔧 Technologies utilisées

- **React Native** avec **TypeScript**
- **React Navigation** pour la navigation
- **AsyncStorage** pour la persistance des données
- **Architecture modulaire** avec séparation des responsabilités

### 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Button.tsx
│   ├── Timer.tsx
│   ├── ExerciseCard.tsx
│   └── ColorLegend.tsx
├── screens/            # Écrans principaux
│   ├── HomeScreen.tsx
│   ├── MobilityScreen.tsx
│   ├── StrengtheningScreen.tsx
│   └── SessionScreen.tsx
├── navigation/         # Configuration de navigation
│   └── AppNavigator.tsx
├── data/              # Données statiques
│   └── exercises.ts
├── hooks/             # Hooks personnalisés
│   └── useUserPreferences.ts
└── types/             # Types TypeScript
    └── index.ts
```

## 🚀 Installation et lancement

1. **Cloner le projet**

   ```bash
   git clone <repository-url>
   cd LazyRunner
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer l'application**

   ```bash
   # Pour iOS
   npm run ios

   # Pour Android
   npm run android
   ```

## 📊 Données et persistance

- **Exercices** : Données mock dans `src/data/exercises.ts`
- **Préférences utilisateur** : Sauvegardées avec AsyncStorage
- **Planning hebdomadaire** : Persistant entre les sessions

## 🎨 Design et UX

- **Style minimaliste** et épuré
- **Couleurs cohérentes** : vert principal (#4CAF50)
- **Navigation intuitive** avec footer fixe
- **Feedback visuel** pour les interactions utilisateur

## 🔮 Fonctionnalités futures

- [ ] Notifications push pour les rappels d'entraînement
- [ ] Statistiques de progression
- [ ] Synchronisation cloud
- [ ] Exercices personnalisés
- [ ] Mode sombre/clair
- [ ] Support multilingue

## 📝 Notes de développement

### Logique à étoffer

- **Notifications** : Intégration avec react-native-notifications
- **Flux complet des sessions** : Gestion des pauses et reprises
- **Validation des exercices** : Logique plus sophistiquée pour le renforcement

### Commentaires dans le code

Le code contient des commentaires `TODO` pour indiquer où la logique doit être étoffée, notamment :

- Gestion des notifications
- Détails des exercices
- Logique de validation avancée

## 🤝 Contribution

Ce projet est un prototype fonctionnel prêt à être amélioré. Les contributions sont les bienvenues !

## 📄 Licence

MIT License
