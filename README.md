# Overview
An inventory system to aid in managing stock, reducing costs, and in accounting. Designed to be used by small businesses (particularly a industrial tools hardware store).

## Features
- Item inventory tracking (item codes, supplier, manufacturer, condition, location, count, date of purchase, etc.)
- Tracking transactions (purchases, sales, running balances, customers, etc.)
- Various data processing (eg. to display inventory history, item purchase heatmap, inventory health, etc.)
- Export tables and charts to .xlsx and .pdf

## Architecture
- Rest API framework using Express.js.
- MongoDB Atlas (free) will be used as the database.
- ReactJs for FE

## Dev 
General:
- commit message format: 'Ticket#: Commit Message'
- multiple commits is preferred to a singular one for a PR when the changes are large

BE:
- Do not place the logic (or the majority of it at least) in the router file itself. Place it in functions in a service file (ie. a leadersService with the functions, to be used in the leadersRouter for the /leaders endpoint)
