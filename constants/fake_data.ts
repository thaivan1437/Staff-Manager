const faker = require('faker')

export const person = {
  // tslint:disable-next-line:prefer-template
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words(),
}
