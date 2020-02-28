# Email Validator

Email validation service: accepting an email address and returns validation data for the given email address. It considers a number of validators including:
- Email format - regex check on valid email format. 
- Domain - checks that the domain in the email address exists and is operating (eg - gmail.com).
- SMTP - attempts to connect to smtp associated with email address.

Please see usage section for setup instructions.

#### Extensions considered 
Given more time, extras could be delivered to increase overall quality of the solution. These are some extras I would consider exploring:
- There's a complete lack of testing at API level but on internal validation logic. This would be high priority to ensure all edge and error cases are handled correctly.
- The SMTP validation is simply checking a connection can be established. But I'm aware that through that connection you can query the server if the email alias is known. Possibly send a dummy mail too to ensure the server can also accept it. 
- Validation step to check known blacklists against the email domain. Issue was I found these APIs were behind paywalls.
- There's also services out there that scrape the web for usages of emails. But again had issues finding an API to implement it. If an email has been used to say setup a social media or to publish an article then it's highly likely to be valid.

#### SMTP Validation
- Validating the SMTP was particularly difficult since their address/domain doesn't always follow a convention and can't be programatically determined from the email address (eg - iCloud is  smtp.mail.me.com and gmail is smtp.gmail.com). To deal with this I have a config file containing the most popular email services and their corresponding SMTP address. If an email is not present in this list then it a default value is used (smtp.email.com).
- Port 587 is used as this is most commonly used port. Although edge cases could exist and result in false negatives.
- I did attempt to look up the addresses using DNS returning MX records. But was unable to connect to them.

### Usage 
TODO
