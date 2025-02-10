# Node.js Email Sender with Nodemailer

This is a simple Node.js application that uses Nodemailer to send emails. It's set up to handle contact form submissions, sending a copy of the message to yourself and a thank-you email to the sender.

## Features

- Sends emails using Gmail.
- Handles contact form submissions.
- Sends a confirmation email to the sender.
- Uses environment variables for sensitive information.
- Includes basic HTML formatting for emails.

## Prerequisites

- Node.js and npm installed
- A Gmail account
- An App Password generated for your Gmail account (for security reasons, it's recommended to use an App Password instead of your regular Gmail password)

## API endpoint :-
use /send-email along with this req.body format :-{
    "name":"Dev Kumar",
    "email":"codingcontests42@gmail.com",
    "subject":"Hi Dev",
    "message":"Humpy dumpy"
}....to send me a mail
