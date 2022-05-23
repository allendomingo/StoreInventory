# Overview
An inventory system to aid in managing stock, reducing costs, and in accounting. Designed to be used by small businesses (particularly a industrial tools hardware store).

## Features
- Item inventory tracking (item codes, supplier, manufacturer, condition, location, count, date of purchase, etc.)
- Tracking transactions (purchases, sales, running balances, customers, etc.)
- Various data processing (eg. to display inventory history, item purchase heatmap, inventory health, etc.)
- Export tables and charts to .xlsx and .pdf

## Architecture
- MVC
- Rest API framework using Express.js.
- MongoDB Atlas (free) will be used as the database.
- ReactJs for FE
- TBA for deployment
- Swagger for documentation

## Dev
Process:
- Take issue from backlog, and place in the To Do column. Add estimate (in labels) if missing.
- Move to the In Progress column when starting work on it.
- When making a PR, make sure to link it to the relevant issue. Move to the linked issue to the For Review/Merging column.
- Once the relevant PR's are merged, close the issue. This will automatically move it to the Done column (an intermediate status column will be added, once servers and automated deployment are set up).

Recommended Practices:
- suggested PR title format: [NET-0000] Title (ie. [NET-1010] Add login page)
- branch name format: <issue type (ie. feature, enhancement, bug, etc.)>-<issue no. (ie. NET0000)> ie. feature-NET0000, bug-NET1000
- commit message format: 'Ticket#: Commit Message'
- multiple commits is preferred to a singular one for a PR when the changes are large

BE:
- Do not place the logic (or the majority of it at least) in the router file itself. Place it in functions in a service file (ie. a leadersService with the functions, to be used in the leadersRouter for the /leaders endpoint)

## Starting Out (from scratch)
1. Install git bash ([download link](https://git-scm.com/downloads)).
2. Install VSCode ([download link](https://code.visualstudio.com/download)), and install the following (recommended) extensions: ESLint, GitLens, and Visual Studio IntelliCode.
3. Install node package manager ([download link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).
4. Using git bash, go to directory where project will be located in. If using windows, this can be achieved through file explorer, right clicking the directory, and opening git bash from there. Clone this repository.
5. Open project in VSCode, and run 'npm install' in the terminal (can also be done in git bash when inside the project directory).
6. <TODO: Add setup for mongo db/environment variables>
7. The project should now be setup.

## Resources:
General JS Coding Styleguide: https://google.github.io/styleguide/jsguide.html
Swagger Documentation: http://<app_host>:<app_port>/api-docs (ie. http://localhost:3000/api-docs)
