export class Responce {
    resultCode: number
    mesage: Array<string>
    data: any

    constructor(resultCode= 200, errorMessage = '', data = {}) {
        this.resultCode = resultCode
        this.mesage = [errorMessage]
        this.data = data
    }
}