interface Ob {
  name: string;
  attribute: string;
  type: string;
  readonly: boolean;
}

interface Polp {
  // can khai bao type dung chuan
  sm: boolean | 5 | 10 | 'auto' | 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 11 | 12 | undefined;
  object: Ob[];
}

export const initialProfiles: Polp[] = [
  {
    sm: 5,
    object: [
      { name: 'Gender', attribute: 'gender', type: 'select', readonly: false },
      {
        name: 'Date Of Birth',
        attribute: 'dateOfBirth',
        type: 'date',
        readonly: false,
      },
    ],
  },
  {
    sm: 5,
    object: [
      { name: 'Earned Amount', attribute: 'earnedAmount', type: 'number', readonly: true },
      { name: 'Paid Amount', attribute: 'paidAmount', type: 'number', readonly: true },
    ],
  },
  { sm: 10, object: [
    {
      name: 'Phone Number',
      attribute: 'phoneNumber',
      type: 'text',
      readonly: false,
    },
  ],
  },
];
