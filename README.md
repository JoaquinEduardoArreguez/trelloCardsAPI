# Trello Cards API
This API enables you to create cards in trello.
Has been built as part of a coding challenge you can find [here](https://doc.clickup.com/p/h/e12h-16043/f3e54f9ffd37f57/e12h-16043)

Contemplates three different ways to create a card on a list (on a Trello board)
* **issues** represent business features to be implemented. They have a `title` and a `description`
* **bugs** represent problems that need to be fixed. They have a `description`, the `Bug` label and are assigned autamically to a random member of the board. Also they have an auto-generated `name`.
* **tasks** represent manual work that needs to be done. They have `title` and `category` label that can take any of these values: `Maintenance`, `Research`, `Test`

## Have in mind
To create a Trello `card` we need to specify the `list` that should contain it, and that `list` needs to be contained on a `board`.

Since the challenge's example API calls do not receive the `list id` in which the card will be created, **this API works with one specific board (owned by me) and will try to create the cards on a list named 'To Do' on that boad**.

**You have to ask me for an invitation to this board.**
## Trying it out online
This API is deployed on AWS and it isn't protected by any authorizer so you can use it without providing an `authorization token`.

`https://aq1pn2iqy2.execute-api.us-east-1.amazonaws.com/cards`  

Here yo can send your requests and check the changes on the Trello boad.
You can use the examples provided on `/samples` to know how to build your own requests.

For example using `curl`

`curl -H "Content-Type: application/json" -d '{"type":"issue","title":"Send message","description":"Some description"}' https://aq1pn2iqy2.execute-api.us-east-1.amazonaws.com/cards`

## Trying it out locally
This API uses [Serverless Framework](https://www.serverless.com/) and the [serverless offline plug-in](https://www.npmjs.com/package/serverless-offline), so you can use `serverless invoke local` or `serverless offline` to test the code locally.
The serverless library has been conveniently added as a `dev-dependency` of the proyect so you don't need to install it globally on your system.

* Run `npm i` on this project's root folder

Some npm scripts are provided to facilitate local use of this code as well

* `npm run localServer` runs a local server on `http://localhost:3000`
* `npm run invokeLocal` invokes a function locally
* `npm run debug` invokes a function locally providing a debug process for you to attach to it.

Note that when invoking a function locally, you have to provide a *sample input* and some *secrets* the lambda function needs on it's environment to work.

Some samples are provided on the `/samples` folder,
* `/samples/issue.json`
* `/samples/bug.json`
* `/samples/task.json`
 
 and you have to provide `TRELLO_API_KEY` and `TRELLO_API_CLIENT_TOKEN` as environment variables.  
You can get these two values from [Trello API introduction](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/#authentication-and-authorization)

Example:  
* To invoke locally  
`npm run invokeLocal createCard -- -p samples/issue.json --env TRELLO_API_KEY=<your-api-key> --env TRELLO_API_CLIENT_TOKEN=<your-api-client-token>`
* To debug  
`npm run debug createCard -- -p samples/issue.json --env TRELLO_API_KEY=<your-api-key> --env TRELLO_API_CLIENT_TOKEN=<your-api-client-token>`
* To run a local server and send a request to it
`npm run localServer` , the send a request to this server however you prefer. For example, using `curl`
`curl -H "Content-Type: application/json" -d '{"type":"issue","title":"Send message","description":"Some description"}' http://localhost:3000/cards`

## API responses
status `200` with information of the created card.  
status `4XX` with comprehensive message if something goes wrong.  
status `500` with comprehensive message if something goes unexpectedly wrong.