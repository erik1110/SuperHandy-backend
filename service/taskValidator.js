const validator = require('validator');

module.exports = class TaskValidator {
    static validateField(value, fieldName, required = true) {
        const validationResults = [];

        switch (fieldName) {
            case 'title':
                if (required && (!value || !validator.isLength(value, { min: 1 }))) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter a valid ${fieldName}.`,
                    });
                }
                break;
            case 'status':
                const validStatuses = ['draft', 'published', 'unpublished', 'deleted', 'inProgress', 'submitted', 'confirmed', 'completed', 'expired'];
                if (required && (!value || !validator.isIn(value, validStatuses))) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please choose a valid status for ${fieldName}.`,
                    });
                }
                break;
            case 'contactInfo':
                if (required && (!value || !value.name || !value.phone || !value.email)) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter valid contact info for ${fieldName}.`,
                    });
                }
                if (value.email && !validator.isEmail(value.email)) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter a valid email address for ${fieldName}.`,
                    });
                }
                break;
            case 'exposurePlan':
                if (required && (!value || !validator.isIn(value, ['一般曝光', '限時曝光', '黃金曝光', '限時黃金曝光']))) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please choose a valid exposure plan for ${fieldName}.`,
                    });
                }
                break;

            case 'location':
                if (required && (!value || !value.longitude || !value.latitude)) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter valid longitude and latitude for ${fieldName}.`,
                    });
                }
                break;

            case 'salary':
                if (required && (!value || !validator.isNumeric(value))) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter a valid number for ${fieldName}.`,
                    });
                }
                break;
            case 'imgUrls':
                // not required
                break;

            default:
                if (required && (!value || (typeof value === 'string' && !validator.isLength(value, { min: 1 })))) {
                    validationResults.push({
                        isValid: false,
                        msg: `Please enter ${fieldName}.`,
                    });
                }
                break;
        }

        if (validationResults.length > 0) {
            return validationResults[0]; // Return the first validation error
        }

        return {
            isValid: true,
            msg: 'success',
        };
    }

    static validateTaskAllField(task) {
        const validationResults = [];

        validationResults.push(this.validateField(task.title, "task's title", true));
        validationResults.push(this.validateField(task.status, 'status', true));
        validationResults.push(this.validateField(task.category, 'category', true));
        validationResults.push(this.validateField(task.description, 'description', true));
        validationResults.push(this.validateField(task.salary, 'salary', false));
        validationResults.push(this.validateField(task.exposurePlan, 'exposurePlan', false));
        validationResults.push(this.validateField(task.contactInfo, 'contact information', false));
        validationResults.push(this.validateField(task.location, 'location', false));

        const errors = validationResults.filter((result) => result.isValid === false);

        if (errors.length > 0) {
            return {
                isValid: false,
                msg: errors.map((error) => error.msg).join('\n'),
            };
        }

        return {
            isValid: true,
            msg: 'success',
        };
    }
};
