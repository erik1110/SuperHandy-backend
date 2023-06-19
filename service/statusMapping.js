const taskStatusMapping = {
    draft: '草稿',
    published: '媒合中',
    inProgress: '進行中',
    submitted: '進行中',
    confirmed: '已完成',
    completed: '已完成',
    unpublished: '已下架',
    deleted: '未成立',
};

const taskStatusMappingRev = {
    全部: ['draft', 'published', 'inProgress', 'submitted', 'confirmed', 'completed', 'unpublished', 'deleted'],
    草稿: ['draft'],
    媒合中: ['published'],
    進行中: ['inProgress', 'submitted'],
    已完成: ['completed', 'confirmed'],
    已下架: ['unpublished'],
    未成立: ['deleted'],
};

const helperStatusMapping = {
    waiting: '等待媒合中',
    paired: '媒合成功',
    unpaired: '媒合失敗',
    dropped: '取消媒合',
};

const reviewStatusMapping = {
    waiting: '待評價',
    completed: '已評價',
};

const reviewStatusReverseMapping = {
    待評價: 'waiting',
    已評價: 'completed',
};
module.exports = {
    taskStatusMapping,
    helperStatusMapping,
    reviewStatusMapping,
    reviewStatusReverseMapping,
    taskStatusMappingRev,
};
