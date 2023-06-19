const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');

// 環境變數
const {
    LINEPAY_CHANNEL_ID,
    LINEPAY_RETURN_HOST,
    LINEPAY_SITE,
    LINEPAY_VERSION,
    LINEPAY_CHANNEL_SECRET_KEY,
    LINEPAY_RETURN_CONFIRM_URL,
    LINEPAY_RETURN_CANCEL_URL,
} = process.env;

function createLinePayBody(order) {
    return {
        ...order,
        currency: 'TWD',
        redirectUrls: {
            confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
            cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
        },
    };
}

function createSignature(uri, linePayBody) {
    const nonce = new Date().getTime();
    const encrypt = hmacSHA256(`${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(linePayBody)}${nonce}`, LINEPAY_CHANNEL_SECRET_KEY);
    const signature = Base64.stringify(encrypt);

    const headers = {
        'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
        'Content-Type': 'application/json',
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': signature,
    };
    return headers;
}

module.exports = {
    createLinePayBody,
    createSignature,
};
