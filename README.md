# Pet home
<p align="center">
  <img width="900" height="300" src="https://media.istockphoto.com/photos/domestic-pets-hanging-over-white-website-banner-picture-id1006322426?k=20&m=1006322426&s=612x612&w=0&h=4vcbsebs6CWO_kQCj441e80w9e9QtK2HxK208TkGmSo=">
</p>

### Idea 
The idea of out project is to create application which will help people who are looking for a temporary house for their pets, find it. Others can earn money or simply take care of pets. This project is high relevant nowadays, because a lot of people had to leave their houses and some of them left their pets without food and water.

### Roles
There are two roles in our system:
  1. Owner, the onwer of the pet.
  2. Holder, person, who agreed to look after the pet.
  3. User, includes two previous roles, that has certain possibilities.
  4. Admin, manages the system.

### Functionallity
They have different permissions and functionally.

#### Owner
Owner has the following features:
  1. Add pet to his zoo.
    Acceptance criteria: max count is 10
  2. Edit information about his pet.
  3. Delete pet from his zoo.
  4. Create advertisment.
    Acceptance criteria: user must have at least one pet
  5. Edit advertisment.
    Acceptance criteria: nobody of holder left request for advetisement.
  6. Delete advertisement.
    Acceptance criteria: advertisement is not in progress and not completed.

#### Holder
Owner has the following features:
  1. See the list of advertisement to choose one of them.
  2. Send request to complete an advertisement.
  3. Discard request.
  ... in progress

#### User
User can:
  1. Register in system with email, password and role.
  2. Login into system with email and password.
  3. Reset his password with email.

#### Admin
Admin manages the hole system, so he can do all CRUD operations with Users and Pets.

## Technology stack:
1. NestJs + Typescript
2. MongoDB + Mongoose
3. Auth: - (3rd party)
4. Linter: airbnb

We have chosen these technologies because we want to learn them more and write an application with TypeScript which allows to make code with less number of bugs and makes development faster.
