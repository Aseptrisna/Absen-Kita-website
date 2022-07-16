import services from './service'

export function getabsent(data){
    services.getAbent(data).then((res)=>{
        // console.log(res.data)
        var response=res.data
     return response
    }).catch((err)=>{
        return [{}]
    })
}