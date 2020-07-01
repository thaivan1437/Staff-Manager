export const isAdmin = (accesses) => {

  for (const element of accesses) {
    if (element.name !== 'ADMIN'){
      continue;
    }

    return true;
  }

  return false;
};
