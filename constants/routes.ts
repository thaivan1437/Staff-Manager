export const appUrlBase: string = 'http://localhost:3005';

export const routes = {
  public: {},
  private: {
    home: `${appUrlBase}`,
    about: `${appUrlBase}/about`,
    profile: `${appUrlBase}/profile`,
    account: `${appUrlBase}/profile/account`,
    address: `${appUrlBase}/profile/address`,
    companies: `${appUrlBase}/companies`,
    fields: `${appUrlBase}/fields`,
  },
};
