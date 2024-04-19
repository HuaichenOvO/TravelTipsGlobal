# TravelTipsGlobal | Test in CyPress

The website is run on [Firebase deployment](https://traveltip-3ec28.web.app/).

A detailed explanation of business design can be found [here](https://docs.google.com/document/d/1K7ydgHkuluqRMtHdqvjduUy-H-t1VDItXyiKeXczgRQ/edit?usp=sharing).

The test demo can be view [here](https://drive.google.com/file/d/12ap9UKnjBhD_jwbOUwOPELGW0R3V_gcv/view?usp=drive_link)

# Test Cases

1. Tested the navbar's existence

2. Tested the remote-loaded map component has a specific style to ensure the successful loading

3. Tested the return result of the search box, to ensure Firebase connection is successfully setup

# How to run

- In one terminal
```
  git clone https://github.com/HuaichenOvO/TravelTipsGlobal.git

  cd TravelTipsGlobal

  npm install

  npm run dev

  npm install cypress --save-dev // install locally for one-time usage
```

- In another terminal
```
  npx cypress open
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
