import request from '@/utils/request'

// 获取一段时间的体重列表
export const getSportListService = (data) => request.post('/sport/getList', data)

//删除该条体重记录
export const delSportRecordService = (id) =>
  request.delete('/sport/del', {
    params: { id }
  })

  // 体重：获取某条体重详情
export const sportGetDetailService = (id) =>
request.get('/sport/getInfo', {
  params: { id }
})

// 添加体重
// 注意：data需要是一个formData格式的对象
export const sportAddService = (data) => request.post('/sport/add', data)

// 编辑体重接口
export const sportEditService = (data) => request.put('/sport/update', data)