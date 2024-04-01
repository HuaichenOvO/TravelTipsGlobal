# TravelTipsGlobal

The website is run on [Firebase deployment](https://traveltip-3ec28.web.app/).

A detailed explanation of business design can be found [here](https://docs.google.com/document/d/1K7ydgHkuluqRMtHdqvjduUy-H-t1VDItXyiKeXczgRQ/edit?usp=sharing).

# Features

1. A home page with a global map and a search box that can add cities as thumbtacks to the map.

2. A note page that can be entered by clicking the thumbtack. Each city corresponds to a note page.

3. Both the cities and notes are stored in the online database and therefore support online CRUD. (Deleting a city is not supported yet.)

# How to run

```
  git clone https://github.com/HuaichenOvO/TravelTipsGlobal.git

  cd TravelTipsGlobal

  npm install

  npm run dev
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
