export interface Citation {
  id: string;
  texte: string;
  personnage: string;
  film: string;
  annee: number;
}

export const citations: Citation[] = [
  {
    id: '1',
    texte:
      "Ce qui compte, c'est pas l'allure de ton seuil, c'est le nombre de squat que tu encaisses tout en continuant d'avancer. Ce que t'arrives à endurer tout en marchant la tête haute.",
    personnage: 'Rocky Balboa',
    film: 'Rocky Balboa',
    annee: 2006,
  },
  {
    id: '2',
    texte:
      'Carpe Diem. Profitez de la mobilité, les garçons. Rendez vos vies extraordinaires.',
    personnage: 'John Keating',
    film: 'Le Cercle des poètes disparus',
    annee: 1989,
  },
  {
    id: '3',
    texte:
      "Dans n'importe quel run, c'est le gars qui a des lunettes de vitesse qui gagne.",
    personnage: 'Paul "Bear" Bryant',
    film: 'The Express',
    annee: 2008,
  },
  {
    id: '4',
    texte: 'On se reconstruit renfo par renfo.',
    personnage: "Tony D'Amato",
    film: "L'Enfer du dimanche",
    annee: 1999,
  },
  {
    id: '5',
    texte:
      "Il faut de la discipline, de la cohésion et de la mobilité. Le reste s'apprend.",
    personnage: 'Ken Carter',
    film: 'Coach Carter',
    annee: 2005,
  },
  {
    id: '7',
    texte:
      'Le renfo est une bonne chose, la meilleure des choses, et les bonnes choses ne meurent jamais.',
    personnage: 'Ellis Boyd "Red" Redding',
    film: 'Les Évadés',
    annee: 1994,
  },
  {
    id: '8',
    texte:
      "Il est facile de se blesser, mais c'est le courage de faire du renfo qui te rend grand.",
    personnage: 'Le Roi Lion',
    film: 'Le Roi Lion',
    annee: 1994,
  },
  {
    id: '9',
    texte:
      "Le renfo n'est pas l'absence de blessure, mais le jugement que quelque chose est plus important que la blessure.",
    personnage: 'Général Forrest',
    film: 'La Colline des hommes perdus',
    annee: 1969,
  },
  {
    id: '10',
    texte:
      "Le meilleur moment pour faire de la mobilité, c'était il y a vingt ans. Le deuxième meilleur moment, c'est maintenant.",
    personnage: 'Le Panda Po',
    film: 'Kung Fu Panda',
    annee: 2008,
  },
  {
    id: '11',
    texte: 'Un grand chrono implique de grandes responsabilités',
    personnage: 'Oncle Ben',
    film: 'Spider-Man',
    annee: 2002,
  },

  {
    id: '12',
    texte:
      'Nos run sont la somme de nos choix. Nos destins ne sont pas une question de hasard, mais une question de choix.',
    personnage: 'Le narrateur',
    film: 'Menace sur la ville',
    annee: 1960,
  },
  {
    id: '13',
    texte:
      "Ce n'est pas parce qu'un coureur est bléssé qu'il doit renoncer à ses rêves.",
    personnage: 'Chris Gardner',
    film: 'À la recherche du bonheur',
    annee: 2006,
  },
  {
    id: '14',
    texte: 'Si tu ne te bats pas pour tes run, qui le fera ?',
    personnage: 'Mickey Goldmill',
    film: 'Rocky',
    annee: 1976,
  },

  {
    id: '17',
    texte: 'Le renfo fait partie du run, il est notre allié.',
    personnage: 'Le Commandant Spock',
    film: 'Star Trek : Sans limites',
    annee: 2016,
  },
  {
    id: '18',
    texte:
      'On ne peut pas courir en arrière, sauf pendant les gammes. Ce qui est fait est fait. On doit regarder devant.',
    personnage: "Tony D'Amato",
    film: "L'Enfer du dimanche",
    annee: 1999,
  },
  {
    id: '19',
    texte: "Il faut d'abord apprendre à se courir, avant de vouloir courir.",
    personnage: 'Mr. Miyagi',
    film: 'Karaté Kid',
    annee: 1984,
  },
  {
    id: '20',
    texte: "On ne va pas s'en sortir en ne se renforçant pas.",
    personnage: 'Bill Randa',
    film: 'Kong : Skull Island',
    annee: 2017,
  },
  {
    id: '21',
    texte:
      "Un coureur n'est pas toujours celui qui gagne. Mais il aura quand même une médaille.",
    personnage: 'Roi Léonidas',
    film: '300',
    annee: 2006,
  },
];

export const getRandomCitation = (): Citation => {
  const randomIndex = Math.floor(Math.random() * citations.length);
  return citations[randomIndex];
};
