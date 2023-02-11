export const _decode=async(data:string)=>{
    const buff = Buffer.from(data,'base64')
    const utf8data = buff.toString('utf8')
    return utf8data
}