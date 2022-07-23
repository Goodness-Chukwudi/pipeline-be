
class ErrorResponseMessage {
    public ERROR = {
        response_code: 1,
        message: "An error occurred",
    };

    public USER_NOT_FOUND = {
        response_code: 2,
        message: "User not found",
    };

    public INVALID_CODE = {
        response_code: 3,
        message: "Invalid code",
    };

    public DUPLICATE_EMAIL = {
        response_code: 4,
        message: "This email already exist, please try a different email",
    };

    public DUPLICATE_PHONE = {
        response_code: 5,
        message: "This phone number already exist, please try a different phone number",
    };

    public UNABLE_TO_SAVE = {
        response_code: 6,
        message: "Unable to save",
    };

    public UNABLE_TO_COMPLETE_REQUEST = {
        response_code: 7,
        message: "Unable to complete request",
    };

    public INVALID_REQUEST = {
        response_code: 8,
        message: "Invalid request",
    };

    public INVALID_LOGIN = {
        response_code: 9,
        message: "Invalid email or password",
    };

    public ACCOUNT_BLOCKED = {
        response_code: 10,
        message: "Account may have been blocked or suspended. Please contact administrator",
    };

    public INVALID_TOKEN = {
        response_code: 11,
        message: "Unable to verify token",
    };

    public UPDATE_NOT_PERMITTED = {
        response_code: 12,
        message: "This update is not permitted",
    };

    public ACCOUNT_ACTIVATION_REQUIRED = {
        response_code: 13,
        message: "Account activation required",
    };

    public ID_EXISTS = {
        response_code: 14,
        message: "ID exists",
    };

    public SUBSCRIPTION_REQUIRED = {
        response_code: 15,
        message: "This is a premium feature, please upgrade your membership",
    };

    public ALREADY_ACTIVATED = {
        response_code: 16,
        message: "Account already activated",
    };

    public SESSION_EXPIRED = {
        response_code: 17,
        message: "Session expired. Please login again",
    };

    public EMAIL_REQUIRED = {
        response_code: 18,
        message: "Email is required",
    };

    public PHONE_REQUIRED = {
        response_code: 19,
        message: "Phone is required",
    };

    public PASSWORD_REQUIRED = {
        response_code: 20,
        message: "Password is required",
    };

    public USERNAME_REQUIRED = {
        response_code: 21,
        message: "Username is required",
    };

    public CONTACT_ADMIN = {
        response_code: 22,
        message: "An error occurred, please contact admin",
    };

    public UNABLE_TO_LOGIN = {
        response_code: 23,
        message: "Unable to login",
    };

    public INVALID_TOKEN_USER = {
        response_code: 24,
        message: "Unable to validate user from token",
    };

    public missingFieldMessage(input: unknown) {
        return {
          response_code: 25,
          message: "Please provide input for " + input,
        };
      }
}


export default ErrorResponseMessage;
