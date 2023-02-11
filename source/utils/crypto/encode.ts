export const _encode=async(data:string)=>{
    const buff = Buffer.from(data)
    const base64data = buff.toString('base64')
    return base64data 
}