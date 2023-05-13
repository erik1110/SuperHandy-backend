const categories = require('../db/initCategories');
const validator = require('validator');
const validStatuses = ['published', 'unpublished', 'deleted', 'inProgress', 'submitted', 'confirmed', 'completed', 'expired'];

const categoryNames = categories.categories.map(cat => cat.name);
module.exports = class TaskValidator {
    static checkDraft({ title, category, description, salary, exposurePlan, imagesUrl, contactInfo, location }) {
        if (!title) {
            return {
                status: false,
                msg: '未填寫任務標題!',
            };
        }
        if (category && ! categoryNames.includes(category)) {
            return {
                status: false,
                msg: '任務類別錯誤!',
            };
        }
        if (description && typeof description !== 'string') {
            return {
                status: false,
                msg: '任務描述格式錯誤!',
            };
        }
    
        if (salary && (typeof salary !== 'number' || salary <= 0)) {
            return {
                status: false,
                msg: '任務薪資錯誤!',
            };
        }
    
        if (exposurePlan && !['一般曝光', '限時曝光', '黃金曝光', '限時黃金曝光'].includes(exposurePlan)) {
            return {
                status: false,
                msg: '任務曝光計畫錯誤!',
            };
        }
    
        if (imagesUrl && !Array.isArray(imagesUrl)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
    
        if (contactInfo) {
            if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
                return {
                    status: false,
                    msg: '聯絡人資訊未填寫完整!',
                };
            }
    
            if (typeof contactInfo.name !== 'string' || typeof contactInfo.phone !== 'string' || typeof contactInfo.email !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊格式錯誤!',
                };
            }
    
            if (!validator.isEmail(contactInfo.email)) {
                return {
                    status: false,
                    msg: 'Email 格式不正確!',
                };
            }
        }
    
        if (location) {
            if (!location.city || !location.dist || !location.address) {
                return {
                    status: false,
                    msg: '地址資訊未填寫完整!',
                };
            }
    
            if (typeof location.city !== 'string' || typeof location.dist !== 'string' || typeof location.address !== 'string') {
                return {
                    status: false,
                    msg: '地址資訊格式錯誤!',
                };
            }
        }
    
        return {
            status: true,
            msg: 'success',
        };
    }
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
