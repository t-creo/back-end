# www-back-end

![](https://img.shields.io/docker/automated/german1608/world-white-web?style=flat-square) ![](https://img.shields.io/travis/World-White-Web/www-back-end/develop?style=flat-square) ![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square) [![Coverage Status](https://coveralls.io/repos/github/World-White-Web/www-back-end/badge.svg?branch=develop)](https://coveralls.io/github/World-White-Web/www-back-end?branch=develop)

Backend for the World White Web Applicatio. Miniproject of software development
of the Simon Bolivar University.

## Members

* Yuni Quintero
* Germán Robayo
* Nairelys Hernandez
* Fabiola Martinez
* David Cabeza
* Jose Acevedo

## Mentors

* Yudith Cardinale
* Irvin Dongo

## Installation

### Requirements

It is only needed to have nodejs lts/dubnium (v10.16.0). It is recommended to use
nvm to manage local nodejs versions.

### How to run

#### On development

1. Run `npm install` to download all dependencies.
2. On the root of the project, create an `.env` file with the following contents:
```
PORT=3000 # Port where server will listen for requests. Normally its value its 3000
TWITTER_CONSUMER_KEY: '' # Consumer key provided by twitter after applying for API access
TWITTER_CONSUMER_SECRET: '' # Consumer secret provided by twitter after applying for API access
```
3. Run `npm start` to run the development server. Changes are auto-reloaded after
saving any file.
4. Visit http://localhost:3000/health
5. Check that response has 200 status code and a body `{ "status": "UP" }`.

## How to contribute

1. Clone the repository and do a `checkout` to the `develop` branch.
2. Create a branch with your contribution. That branch should follow the
[branching name conventions](#branching-name-conventions)
3. When finished, issue a Pull request to integrate your branch to `develop`.
Put every team member as a reviewer.

### Branching name conventions

* `feature/*` for branches that introduces features. Ejemplo: `feature/add-facebook-support`.
* `bugfix/*` for branches that introduces patches and bugfixes. Ejemplo: `bugfix/fix-weight-calculation`.

## Who do I talk to?

You can contact any contributor and member of the [World-White-Web](https://github.com/World-White-Web)
team with any subject, though the most active maintaineris @german1608
