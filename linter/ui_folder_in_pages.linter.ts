import { checkType, checkName } from './type_extension_name';

// tslint:disable:no-console
export default function linterFolderUI(child) {
  let error = 0;

  for (const each of child.children) {
    if (each.type === 'file' && each.extension !== '.sass' && each.extension !== '.tsx') {
      error += 1;
      console.log(`Error: ${each.path}`);
      console.log('You cannot put other file formats here');
    }

    if (each.type !== 'directory') {
      continue;
    }
    const isValidType = checkType(each);

    const isValidName = checkName(each);

    if (!isValidType) {
      error += 1;
    }

    if (isValidName) {
      continue;
    }

    error += 1;

  }

  return error;
}
