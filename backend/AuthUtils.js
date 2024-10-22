
class AuthUtils {
    forbiddenChars = ["/", "\\", ":", "*", "?", "\"", "<", ">", "|" ];
    validateString(str) {
        if (str === undefined || str === null || str === '') {
            return false
        }

        if (this.forbiddenChars.some((char) => str.includes(char))) {
            return false
        }
        return true
    }
}

module.exports = AuthUtils