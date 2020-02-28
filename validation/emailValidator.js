const axios = require('axios');

async function validateEmail(email) {

    let regexValidationRes = regexValidation(email);
    let domainValidationRes = await domainValidation(email.split('@')[1]);
    let smtpValidationRes = smtpValidation('smtp.' + email.split('@')[1]);

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

function regexValidation(email) {
    // this is the standard HTML5 validation of email type
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let result = {};
    result.valid =  emailRegex.test(email);
    if(!result.valid) result.reason = "Invalid email format"
    
    return result;
}

async function domainValidation(domain) {
    try {
        await axios.get('http://'+ domain, {"accept" : "*/*"});
    }
    catch (err) {
        return {valid : false, reason : err.code};
    }
    return {valid : true};
}

function smtpValidation(hostname) {
    return {valid : true};
}


module.exports = {validateEmail};