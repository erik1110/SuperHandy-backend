const exposurePlanPrices = {
    一般曝光: 20,
    限時曝光: 30,
    黃金曝光: 50,
    限時黃金曝光: 70,
};
const getExposurePlanPrices = (type) => exposurePlanPrices[type] || 0;

module.exports = getExposurePlanPrices;
