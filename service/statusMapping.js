const taskStatusMapping = {
    draft: '草稿',
    published: '媒合中',
    inProgressed: '進行中',
    submitted: '進行中',
    confirmed: '已完成',
    completed: '已完成',
    unpublished: '已下架',
    deleted: '未成立',
};

const helperStatusMapping = {
    waiting: '等待媒合中',
    paired: '媒合成功',
    unpaired: '媒合失敗',
    dropped: '取消媒合'
};

module.exports = {
    taskStatusMapping,
    helperStatusMapping,
};
