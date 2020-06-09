interface ObjectChild {
  name: string;
  router: string;
}

interface ObjectP {
  name: string;
  tab: string;
  objectChild: ObjectChild[];
  router: string;
}

interface ListCard {
  name: string;
  object: ObjectP[];
}
export const listCard: ListCard [] = [
  {
    name: 'main',
    object: [
      {
        name: 'Dashboards',
        tab: 'dashboards',
        objectChild: [
          { name: 'Dashboards', router: '/' },
          { name: 'Page', router: '/' },
          { name: 'Element', router: '/' },
          { name: 'React', router: '/' },
          { name: 'Redux', router: '/' },
        ],
        router: '/',
      },
      { name: 'Page', tab: 'Page', objectChild: [], router: '/' },
      { name: 'Element', tab: 'element', objectChild: [], router: '/' },
      { name: 'React', tab: 'react', objectChild: [], router: '/' },
      { name: 'Profile', tab: 'profile', objectChild: [], router: '/profile' },
    ],
  },
  {
    name: 'main',
    object: [
      { name: 'Dashboards', tab: 'dashboards', objectChild: [], router: '/' },
      { name: 'Page', tab: 'page', objectChild: [], router: '/' },
      { name: 'Element', tab: 'element', objectChild: [], router: '/' },
      { name: 'React', tab: 'react', objectChild: [], router: '/' },

    ],
  },
];
