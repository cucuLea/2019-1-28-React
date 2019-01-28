

export const verifyForm = (firstName, lastName, phone, email) => {
    return required(lastName) && required(firstName) && phoneCheck(phone) && emailCheck(email);
}

export const required = (data) => {
    if (data === null || data.trim() === '') {
        return false;
    }
    return true;
}

export const phoneCheck = (data) => {
    const tel = /^[0-9]{3,11}$/;
    if (tel.test(data) || data === null || data.trim()=== '') {
        return true;
    }
    return false;
}

export const emailCheck = (data) => {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (pattern.test(data) || data === null || data.trim() === '') {
        return true;
    }
    return false;
}