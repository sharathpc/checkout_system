# Checkout System

**Demo**: [https://sharathpc.github.io/checkout_system](https://sharathpc.github.io/checkout_system)

## Tech Stack and Time Spent
- Frontend: Create React App(Typescript)
  - Time Spent: 2 hours
- Testing: React Testing Libiary
  - Time Spent: 30 minutes 
## Install Dependencies and Run app(Development)

```bash
$ yarn install
$ yarn start
```

 Navigate to `http://localhost:3000/`.

## Build app(Production)

```bash
$ yarn build
```
The build artifacts will be stored in the `build/` directory.


## Key decisions

1. Used create react app to bootstrap app quickly
2. To make the app simple, I have used only App component and also default data
3. Embedded offer details at each product level to calculate discount price
4. Used Bootstrap CSS and SCSS to make styling easy

## Future Improvements

1. Create seperate components for easy maintenance and testing
2. Decouple data from component and load it from API/Service
3. Write generic function to handle both add and delete functionality 
4. Build more appealing UX/UI
5. Refactor the project to be highly scalable and add more e2e testcases