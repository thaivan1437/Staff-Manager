export const roleName = (rolesID, listRoles) => {

  for (const element of listRoles) {
    if (element.roleID !== rolesID){
      continue;
    }

    return element.name;
  }

  return false;
};
