function validateEmail(email) {

    let regexValidationRes = regexValidation(email);
    let domainValidationRes = domainValidation(email.split('@')[1]);
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
    let resultDefault = {valid : true};
    return resultDefault;
}

function domainValidation(domain) {
    return {valid: false, reason : "Unable to connect to domain"};
}

function smtpValidation(hostname) {
    return {valid : true};
}


module.exports = {validateEmail};