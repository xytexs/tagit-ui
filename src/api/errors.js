class FormValidationError extends Error {
    constructor(message, formState) {
        super(message);
        this.name = 'Validation Error';
        this.form = formState
    }
}

module.exports = {
    FormValidationError
}
