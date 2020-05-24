export const appUrlBase: string = 'http://localhost:3005';

export const routes = {
  public: {
    login: `${appUrlBase}/account/UI/login`,
  },
  private: {
    home: `${appUrlBase}`,
    about: `${appUrlBase}/about`,
  },
};
