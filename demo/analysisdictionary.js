
// 保存的数据解析
export const dictionarySaveData = (data) => {
  let saveData = data.map(a=>{
    return {
      fieldData:a.map(fieldData =>  {
        return {
          name:fieldData.name,
          value:fieldData.value
        }
      } ),
      fieldId:a[0].fieldId
    }
  })
  saveData.shift()
  return saveData
};
