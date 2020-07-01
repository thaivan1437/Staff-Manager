export const getDepartmentName = (departmentID, listDepartment) => {

  for (const element of listDepartment) {
    if (element.departmentID !== departmentID){
      continue;
    }

    return element.name;
  }

  return false;
};
