import request from '@/utils/request'

// 获取一段时间的体重列表
export const getDietListService = (data) => request.post('/diet/getList', data)

//删除该条体重记录
export const delDietRecordService = (id) =>
  request.delete('/diet/del', {
    params: { id }
  })

// 体重：获取某条体重详情
export const dietGetDetailService = (id) =>
  request.get('/diet/getInfo', {
    params: { id }
  })

// 添加体重
// 注意：data需要是一个formData格式的对象
export const dietAddService = (data) => request.post('/diet/add', data)

// 编辑体重接口
export const dietEditService = (data) => request.put('/diet/update', data)