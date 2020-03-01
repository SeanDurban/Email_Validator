# Email Validator

Email validation service: accepting an email address and returns validation data for the given email address. It considers a number of validators including:
- Email format - regex check on valid email format. 
- Domain - checks that the domain in the email address exists and is operating (eg - gmail.com).
- SMTP - attempts to connect to smtp associated with email address.
- TLD - checks TLD associated with the email address (eg .com) vs the ICANN maintained [list](https://www.icann.org/resources/pages/tlds-2012-02-25-en) of valid TLDs.

Please see usage section for setup instructions.

#### Extensions considered 
Given more time, extras could be delivered to increase overall quality of the solution. These are some extras I would consider exploring:
- There's a complete lack of testing from API level to internal validation logic. This would be high priority to ensure all edge and error cases are handled correctly.
- The SMTP validation is simply checking a connection can be established. But I'm aware that through that connection you can query the server if the email alias is known. Possibly send a dummy mail too to ensure the server can also accept it. 
- Validation of TLD is against a static list, meaning new TLDs will return false positives. The list is updated regularly online but no API is provided. However, could simply scrape the page at regular intervals. 
- Another alidation step to check known blacklists against the email domain. Issue was I found these APIs were behind paywalls.
- There's also services out there that scrape the web for usages of emails. But again had issues finding an API to implement it. If an email has been used to say setup a social media or to publish an article then it's highly likely to be valid.

#### SMTP Validation
- Validating the SMTP was particularly difficult since their address/domain doesn't always follow a convention and can't be programatically determined from the email address (eg - iCloud is  smtp.mail.me.com and gmail is smtp.gmail.com). To deal with this I have a config file containing the most popular email services and their corresponding SMTP address. If an email is not present in this list then it a default value is used (smtp.email.com).
- Port 587 is used as this is most commonly used port. Although edge cases could exist and result in false negatives.
- I did attempt to look up the addresses using DNS returning MX records. But was unable to connect to them.

#### Docker Notes
I developed this app on a windows machine which brought a few issues around docker support and testing the required commands (curl etc)
- I spent a lot of time trying to debug the container as it seemed it was not exposing the port correctly. When in fact the issue lay with docker mapping in windows, see this [github issue](https://github.com/docker/for-win/issues/204) for more info/fix

### Usage 
A docker image can be found on [dockerhub](https://hub.docker.com/repository/docker/seandurban/email_validator). Following are steps to run that docker image locally.

Docker run command. This will pull from dockerhub if it can not be found locally.
```
docker run -t -p 8080:8080 -e PORT=8080 seandurban/email_validator
```

The web service should then be running locally (in the container) at the ENV port specified and exposed at the port specified in docker run command.

Example queries to the email validator:
Unix systems
```
curl -XPOST -d '{"email":"xxx@yyy.zzz"}' -H "Content-Type: application/json" http://localhost:8080/email/validate
```

Windows powershell. Docker machine IP can be found by running 'docker-machine ip'.
```
Invoke-RestMethod -Method Post -Uri "DOCKER_MACHINE_IP:3000/email/validate" -Body '{"email" : "xxx@yyy.zzz"}' -ContentType 'application/json'
```
