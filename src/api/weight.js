import request from '@/utils/request'

// 获取一段时间的体重列表
export const getWeightListService = (data) => request.post('/weight/getList', data)

//删除该条体重记录
export const delWeightRecordService = (id) =>
  request.delete('/weight/del', {
    params: { id }
  })

  // 体重：获取某条体重详情
export const weightGetDetailService = (id) =>
request.get('/weight/getInfo', {
  params: { id }
})

// 添加体重
// 注意：data需要是一个formData格式的对象
export const weightAddService = (data) => request.post('/weight/add', data)

// 编辑体重接口
export const weightEditService = (data) => request.put('/weight/update', data)
// 获取一段时间的体重列表
export const getWeightLineService = (data) => request.post('/weight/getLine', data)