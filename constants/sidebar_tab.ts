
interface ObjectChild {
  name: string;
  router: string;
}
interface ObjectP {
  name: string;
  tab: string;
  objectChild: ObjectChild[];
  router: string;
  icon: string;
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
        name: 'Companies',
        tab: 'company',
        objectChild: [
          {
            name: 'Update',
            router: '/companies/update',
          },
        ],
        router: '/companies',
        icon: 'HomeWorkIcon',
      },
      {
        name: 'Departments',
        tab: 'element',
        objectChild: [],
        router: '/departments_member',
        icon: 'AllInboxIcon',
      },
      {
        name: 'Fields',
        tab: 'fields',
        objectChild: [],
        router: '/fields',
        icon: 'AccountCircleIcon',
      },
      {
        name: 'Invitation',
        tab: 'invitation',
        objectChild: [
          {
            name: 'Supper Admin',
            router: '/invitation/admins',
          },
        ],
        router: '/invitation',
        icon: 'AllInboxIcon',
      },
      {
        name: 'Profile',
        tab: 'profile',
        objectChild: [],
        router: '/profile',
        icon: 'PermContactCalendarIcon',
      },
      {
        name: 'ConverSations',
        tab: 'conversations',
        objectChild: [],
        router: '/conversations',
        icon: 'ForumIcon',
      },
      {
        name: 'Posts',
        tab: 'posts',
        objectChild: [],
        router: '/posts',
        icon: 'ForumIcon',
      },
    ],
  },
];
