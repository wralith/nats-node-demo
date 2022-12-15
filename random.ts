import { faker } from "@faker-js/faker"

export const randomData = () => ({
  name: faker.name.fullName(),
  job: faker.name.jobTitle(),
  salary: faker.finance.amount(1000, 10000, 2, "$"),
})
