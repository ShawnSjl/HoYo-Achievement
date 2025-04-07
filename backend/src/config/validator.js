export function isValidUserId(id) {
    const regex = /^\d+$/;
    return id.test(regex);
}

export function isValidUsername(username) {
    const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,20}$/;
    return typeof username === 'string' && regex.test(username);
}

export function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{}]{8,50}$/;
    return typeof password === 'string' && regex.test(password);
}