export const appUrlBase: string = 'http://localhost:3005';

export const routes = {
  public: {},
  private: {
    home: `${appUrlBase}`,
    about: `${appUrlBase}/about`,
    profile: `${appUrlBase}/profile`,
    account: `${appUrlBase}/profile/account`,
    address: `${appUrlBase}/profile/address`,
    invitation: `${appUrlBase}/invitation`,
    adminInvitation: `${appUrlBase}/invitation/admins`,
    fields: `${appUrlBase}/fields`,
    company: `${appUrlBase}/companies`,
    update_company: `${appUrlBase}/companies/update`,
    get_conversations: `${appUrlBase}/conversations`,
  },
};
