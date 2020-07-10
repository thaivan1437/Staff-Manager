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
          { name: 'Element', router: '/' },
          { name: 'React', router: '/' },
          { name: 'Redux', router: '/' },
        ],
        router: '/',
      },
      { name: 'Fields', tab: 'fields', objectChild: [], router: '/fields' },
      { name: 'Invitation', tab: 'react', objectChild: [
        { name: 'Supper Admin', router: '/invitation/admins' },
      ], router: '/invitation' },
      { name: 'Profile', tab: 'profile', objectChild: [], router: '/profile' },
      { name: 'Company', tab: 'company', objectChild: [
        { name: 'Update', router: '/companies/update' },
      ], router: '/companies' },
    ],
  },
  {
    name: 'main',
    object: [
      { name: 'Companies', tab: 'dashboards', objectChild: [], router: '/companies' },
      { name: 'Fields', tab: 'page', objectChild: [], router: '/fields' },
      { name: 'Departments', tab: 'element', objectChild: [], router: '/departments_member' },
      { name: 'React', tab: 'react', objectChild: [], router: '/' },
      { name: 'React', tab: 'element', objectChild: [], router: '/' },
      { name: 'ConverSations', tab: 'conversations', objectChild: [], router: '/conversations' },

    ],
  },
];
