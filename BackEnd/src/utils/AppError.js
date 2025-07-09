class AppError extends Error{
    constructor(){
        super()
    }
    create(code, message, status){
        this.code = code; 
        this.message= message;
        this.status = status;
        return this;
    }
}

export default new AppError();