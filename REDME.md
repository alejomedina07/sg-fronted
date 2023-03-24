# EWP MICRO FRONT CLINIC

## Installation

Use [node](https://nodejs.org/dist/latest-v18.x/docs/api/) version 18 to install foobar.

```bash
$ cd ewp-mf-clinic
$ yarn 
$ yarn run dev
```

### Dependencies

* [Vite](https://vitejs.dev/guide/)

* [Material ui](https://mui.com/material-ui/getting-started/installation/)

* [React router doom](https://reactrouter.com/en/main)

* [react-redux](https://react-redux.js.org/introduction/getting-started)
  
* [i18next translate](https://react.i18next.com/latest/typescript)

## Deploy on esvyda platform

### Run:

```bash
$ yarn run lint
```

### Verify that there are no errors and:


```bash
$ yarn build:staging
```

### Copy and paste 'dist' folder in:

```
/static/scripts/esvyda/React/clinic
```

### The tags 'link' and 'scripts' add static url on dist/index.html and copy content and paste in: 


```
/templates/esvyda_clinic/emails/consent_form_patient_view.html
```
