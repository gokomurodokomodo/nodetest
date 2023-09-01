class BaseResponse{
    constructor(){
        this.statusCode = 200
        this.message = ""
        this.data = null
    }

    getStatusCode(){
        return this.statusCode;
    }

    getMessage(){
        return this.message;
    }

    getData(){
        return this.data;
    }

    setStatusCode(statusCode){
        this.statusCode = statusCode
    }

    setMessage(message){
        this.message = message
    }

    setData(data){
        this.data = data
    }
}

export default BaseResponse