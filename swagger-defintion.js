const page = {
    totalPages: 1,
    currentPage: 1,
    perPage: 10,
    totalDatas: 1,
    has_pre: false,
    has_next: false
  };
  
  const Success = {
    message: "成功訊息"
  };

  const Error400 = {
    message: "錯誤訊息"
  };

  const Error404 = {
    message: "外太空也找不到這個頁面"
  };
  
  const Error500 = {
    message: "系統錯誤，請稍後再試"
  };

  const Sign = {
    token: "abcde",
    _id: "123456789"
  };

  const RegisterEmailSuccess = {
    status: "success",
    message: "請至 Email 查收信件",
  };

  const RegisterEmailError = {
    message: "請稍後重試或聯絡管理員",
  };

  const ValidateEmailError = {
    message: "信箱驗證失敗",
  };
  
  const getCategorySuccess = {
    status: "success",
    data: [
      {
        "name": "到府驅蟲",
        "template": "請填寫以下資訊：\n1. 蟲種：\n2. 家居面積：\n3. 服務時間："
      },
    ],
    message: "取得成功"
  }
  const user = { // Schema 定義為 editor
    _id: "123456789",
    nickName: "會員暱稱",
    avatar: "https://i.imgur.com/xxx.png"
  };
  
  const User = { // Schema 定義為 editor
    ...user,
    gender: 1,
    createdAt: "2022-05-31T14:21:36.129Z",
    updatedAt: "2022-05-31T14:21:36.129Z"
  };
  
  const post = {
    _id: "123456789",
    user,
    content: "來新增一筆資料吧",
    image: ["https://i.imgur.com/xxx.png"],
    likes: ["123456789"],
    comments: [
      {
        _id: "123456789",
        user,
        comment: "夏日大作戰?!",
        createdAt: "2022-05-24T14:44:48.358Z",
        updatedAt: "2022-05-24T14:44:48.358Z"
      }
    ],
    createdAt: "2022-06-01T08:32:14.125Z",
    updatedAt: "2022-06-01T08:32:14.125Z"
  };
  
  const Post = {
    ...post
  };
  
  const Posts = {
    list: [post],
    page: page
  };
  
  const GetPosts = {
    list: [post],
    page: page,
    Success
  };

  const Comment = {
    _id: "123456789",
    user,
    comment: "大家來回應",
    createdAt: "2022-06-01T08:41:23.254Z",
    updatedAt: "2022-06-01T08:41:23.254Z"
  };
  
  const like = {
    _id: "123456789",
    user,
    content: "來新增一筆資料吧",
    image: ["https://i.imgur.com/xxx.png"],
    likes: [User],
    createdAt: "2022-06-01T08:32:14.125Z",
    updatedAt: "2022-06-01T08:32:14.125Z"
  };
  
  const File = {
    upload: "https://i.imgur.com/xxx.png"
  };
  
  module.exports = {
    User,
    Post,
    Posts,
    GetPosts,
    Comment,
    File,
    Success,
    Error400,
    Error404,
    Error500,
    Sign,
    RegisterEmailSuccess,
    RegisterEmailError,
    ValidateEmailError,
    getCategorySuccess
  };