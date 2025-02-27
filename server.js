// Boilerplate Code for HTTP Status Code API
const express = require('express');
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 9125;

app.use(cors());

/*
Task:
You need to create an API that helps users understand different HTTP status codes and their meanings.

Requirements:
1. Create a GET endpoint at "/status-info".
2. The endpoint should accept a "code" as a query parameter (e.g., /status-info?code=200).
3. Based on the status code provided, the API should respond with:
   a. The status code.
   b. A description of the status code.

Example Responses:
- For 200 (OK):
  Request: /status-info?code=200
  Response:
  {
    "status": 200,
    "message": "OK: The request has succeeded. The meaning of this status depends on the HTTP method used."
  }

- For 404 (Not Found):
  Request: /status-info?code=404
  Response:
  {
    "status": 404,
    "message": "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource."
  }

- For 500 (Internal Server Error):
  Request: /status-info?code=500
  Response:
  {
    "status": 500,
    "message": "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
  }

- For 400 (Bad Request):
  Request: /status-info?code=400
  Response:
  {
    "status": 400,
    "message": "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax)."
  }

List of Status Codes to Handle:
200, 201, 204, 400, 401, 403, 404, 405, 429, 500, 502, 503, 504
*/


const HTTTcodedescription = {
200 :  "OK:** Request was successful.",
201 : "Created:** A resource has been successfully created.",
204 : "No Content:** Request processed successfully, no content return",
400 : "Bad Request:** The request is invalid due to client-side errors.",
401 : "Unauthorized:** Authentication is required to access the resource.",
403 : "Forbidden:** Server refuses to authorize the request.",
404 : "Not Found:** The resource does not exist.",
405 : "Method Not Allowed:** HTTP method not supported for this resource.",
429 : "Too Many Requests:** User has exceeded rate limits.",
500 : "Internal Server Error:** The server encountered an error.",
502 : "Bad Gateway:** The server received an invalid response from the upstream server.",
503 : "Service Unavailable:** Server temporarily overloaded or under maintenance.",
504 : "Gateway Timeout:** The server did not receive a timely response from the upstream server."
}

app.get('/status-info', (req,res) => {

  try {
    
    const code = parseInt(req.query.code);
    if(!code){
      return res.status(400).json({message : "Enter a HTTP code its Missing from the Params"});
    }

    const description = HTTTcodedescription[code];

    if(isNaN(code)){
      return res.status(400).json({message: "Invalid Status code , must be a Integer or variable"})
    }

    if(!description){
      return res.status(400).json({message : "Message cannot be displayed as you entered a Invalid HTTP code"});
    }


    return res.json({
      status : code,
      message : description
    })

  } catch (error) {
    console.log(error);
    
  }
})

app.get('/assistant/greet', (req,res) => {

  const name = req.query.name;

  if(!name){
    return res.status(400).json({message : "Name is missing from the Params"})
  }


  return res.status(200).json({
    message : `Hi  ${name}! ,  How can I assist you`
  })
})



app.listen(PORT, () => {
    console.log(`Status Code API is running on http://localhost:${PORT}`);
});
