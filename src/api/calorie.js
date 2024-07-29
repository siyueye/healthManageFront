import request from '@/utils/request'

// 获取卡路里列表
export const calorieGetAllService = (itemname,flag) => request.get('/calorie/getCalorieAll', {
    params: { itemname,flag }
  })


export const calorieDelRecordService = (id) =>
    request.delete('/calorie/del', {
      params: { id }
    })
// 文章：编辑接口
export const calorieEditService = (data) => request.put('/calorie/update', data)
// 文章：添加体重
// 注意：data需要是一个formData格式的对象
export const calorieAddService = (data) => request.post('/calorie/add', data)
