# Overview
Backend server Node.js codebase for StoreInventory system

## Architecture
- MongoDB database
- Swagger for documentation
- Rest API framework using Express.js
- Route-Controller-Service

## Dev
Process:
- Take issue from backlog, and place in the To Do column. Add estimate (in labels) if missing.
- Move to the In Progress column when starting work on it.
- When making a PR, make sure to link it to the relevant issue. Move to the linked issue to the For Review/Merging column.
- Once the relevant PR's are merged, close the issue. This will automatically move it to the Done column (an intermediate status column will be added, once servers and automated deployment are set up).

Recommended Practices:
- Do not place the logic (or the majority of it at least) in the router file itself. Place it in functions in a service file (ie. a leadersService with the functions, to be used in the leadersRouter for the /leaders endpoint). More details in the reference (Controller and Routes)

## Resources:
General JS Coding Styleguide: https://google.github.io/styleguide/jsguide.html
Swagger Documentation: http://<app_host>:<app_port>/api-docs (ie. http://localhost:3000/api-docs)
Controller and Routes: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
