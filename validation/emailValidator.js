const axios = require('axios');
const net = require('net');
const dns = require('dns'); 
const smtpAddresses = require('./smtpConfig').smtpAddresses;

async function validateEmail(email) {
    let domain = getDomain(email);
    let regexValidationRes = regexValidation(email);
    let domainValidationRes = await domainValidation(domain);
    let smtpValidationRes = await smtpValidation(domain);
    let valid = regexValidationRes.valid && domainValidationRes.valid && smtpValidationRes.valid;

    let resultFormat = { 
        "valid": valid,
        "validators": {
            "regex" : regexValidationRes,
            "domain" : domainValidationRes,
            "smtp" : smtpValidationRes
        }
    };
    return resultFormat;
}

// Simple regex validation on email address
function regexValidation(email) {
    // this is the standard HTML5 validation of email type
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let result = {};
    result.valid =  emailRegex.test(email);
    if(!result.valid) result.reason = "Invalid email format"
    
    return result;
}

// Pings the domain to check it exists
async function domainValidation(domain) {
    try {
       await axios.get('http://'+ domain);
       return {valid: true};
    }
    catch (err) {
        return {valid : false, reason : err.code};
    }
}

// Trys to connect to the smtp using TCP sockets
// Returns: Valid or timeout if unable to connect and notfound if doesn't exist
// Note: Timeout can take a few seconds as uses default timeout (5 seconds)
function smtpValidation(domain) {
    // Net library doesn't have promise support out of the box so have to implement it
    return new Promise((resolve) => {
        // attempt lookup on common smtp addresses
        let domainName = getDomainWithoutExtension(domain);
        let smtpAddress = smtpAddresses[domainName];
        if(!smtpAddress) smtpAddress = 'smtp.' + domain;
            let connection= net.createConnection(587, smtpAddress, () => {
                    connection.end();
                    resolve({valid:true});
            });

            // This will catch all errors, timeout error can take a number of seconds
            connection.on('error', (err) => {
                resolve({valid : false, reason : err.code});
            });
    });
}

// Simple splitting of string to get domain => assumes email is in standard form XYZ@domain.com
function getDomain(email) {
    let domain = email.split('@')[1];
    if(!domain) domain = '';
    return domain;
}

// Simple splitting of string to get domain name  => assumes domain is in standard form domain.com
function getDomainWithoutExtension(domain) {
    let domainName = domain.split('.')[0];
    if(!domainName) domainName = '';
    return domainName;
}

// Uses DNS to retrieve MX addresses associated with a domain
function getMxRecord(domain) {
    dns.resolveMx(domain, (err, addresses ) => {
        return addresses;
    });
}

module.exports = {validateEmail};