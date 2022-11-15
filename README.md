![](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

# myCoktail
This project aims to offer its user 3 random cocktails.


This one has two themes, an extravagant Dark Mode and a sober Light Mode, it is possible to alternate between one and the other thanks to the button located at the bottom right of the screen.


It is possible to change the cocktails in two ways. Either by reloading the page, or by using the button in the center called `Give me new cocktails`.


You can choose to keep one or more cocktails, this will have the effect of keeping them and only changing the unselected ones.


Fully navigable via the keyboard

Compliance with level A of the ecoindex

## Technology & API used 
Vue.js 3, TypeScript, TailwindCss, Vitest, Docker, [thecocktaildb](https://www.thecocktaildb.com/)

## Run Project

```sh
docker-compose build
```

```sh
docker-compose up
```

### Run Test

```sh
npm run test:unit
```

