function isValidUserId(id) {
    const regex = /^\d+$/;
    return regex.test(id);
}

function isValidUsername(username) {
    const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,20}$/;
    return typeof username === 'string' && regex.test(username);
}

function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{}]{8,50}$/;
    return typeof password === 'string' && regex.test(password);
}

module.exports = {isValidUserId, isValidUsername, isValidPassword};