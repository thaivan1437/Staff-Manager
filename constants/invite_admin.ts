import AcUnitIcon  from '@material-ui/icons/AcUnit';

interface FieldInvite {
  name: string;
  attribute: string;
  type: string;
  readonly: boolean;
  icon?: React.ReactNode;
}

interface InviteAdmin {
  sm: boolean | 5 | 10 | 'auto' | 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 11 | 12 | undefined;
  objectInvite: FieldInvite[];
}

export const initialFieldInvite: InviteAdmin[] = [
  {
    sm: 5,
    objectInvite: [
      { name: 'Name',
        attribute: 'name',
        type: 'text',
        readonly: false,
        icon: AcUnitIcon,
      },
      { name: 'Call Limit',
        attribute: 'callLimit',
        type: 'number',
        readonly: false,
      },
    ],
  },
  {
    sm: 5,
    objectInvite: [
      {
        name: 'Address',
        attribute: 'address',
        type: 'text',
        readonly: false,
      },
      { name: 'Month Limit',
        attribute: 'monthLimit',
        type: 'number',
        readonly: false,
      },
    ],
  },
  {
    sm: 12,
    objectInvite: [
      {
        name: 'Intro',
        attribute: 'intro',
        type: 'text',
        readonly: false,
      },
    ],
  },
];
