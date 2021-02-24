# Interview Scheduler

Interview Scheduler is a Single Page Application (SPA) primarily built using React. Integrated with Express backend and PostgreSQL database. Tests written using Jest and Cypress. 

A user can select an available slot, enter their name and select an interviewer. On submit, the page is updated with the appointment and the total available slots for that day. That use can then edit and/or delete their appointment. 

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress
```sh
npm run cypress
```

## Screenshots
!["example view"](https://raw.githubusercontent.com/defsax/scheduler/master/docs/default_view.png)

!["creation form"](https://raw.githubusercontent.com/defsax/scheduler/master/docs/edit_create_appointment.png)

!["appointment shown"](https://raw.githubusercontent.com/defsax/scheduler/master/docs/appointment_card.png)