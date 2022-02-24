# EMPLOYEE REVIEW SYSTEM

The application is used to give feedbacks to each others performances.

It has two views :

- Admin
- Employee

## Features

ADMIN -

```bash
  Add/remove/update/view employees
  Add/update/view performance reviews
  Assign employees to participate in another employee's performance review

```

EMPLOYEE -

```bash
  List of performance review requiring feedback
  Submit feedback

```

- Make 1 login for admin and employee
- An employee can register, only admin can make an employee an admin

## Run on local machine

To use this repository you should have following
installed in your machine

- node
- npm
- mongoDB
- git

Clone the project

```bash
  git clone https://github.com/UsernameZERO/Employee_Review-System
```

Go to the project directory

```bash
  cd Employee_Review-System/

```

Install Dependencies

```bash
npm install --save
```

- Make sure to start Mongodb, as it differ from system to system

Now run the application

```bash
npm start
```

## Folder Structure

```bash
EMPLOYEE_REVIEW_SYSTEM
├── assets
│   ├── css
│   ├── js
│   ├── scss
├── configs
├── controllers
├── models
|── node_modules
├── routes
├── views
|   └── partials
├── index.js
├── package-lock.json
├── package.json
└── readme.md
```

## Working

- You should not register an employee without going into the below route.
- First go to get the admin credentials for that
- (Admin- id and password) go to URL/admin/credentials this route for admin credentials.
- From here on you can register from home page for employees or you can register in admin page.
