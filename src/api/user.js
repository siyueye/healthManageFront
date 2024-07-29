import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) =>
  request.post('/api/reg', data)

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户基本信息
export const userGetInfoService = () => request.get('/user/userinfo')

// 更新用户基本信息
export const userUpdateInfoService = (data) =>
  request.put('/user/update', data)

// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userUpdatePasswordService = ({ id,old_pwd, new_pwd }) =>
  request.get('/user/updatepwd', {params:{ 'id':id,'old_pwd':old_pwd, 'new_pwd':new_pwd }})