import dotenv from 'dotenv';
dotenv.config();

export class CommonResponse {
    status: Boolean = false;
    code: string | number = 500;
    data: Object | null = null; //any js data type can be stored in the Object data type
    error: Object | null = null;
    message: string | null = '';

    setStatus(status: Boolean) {
        this.status = status;
    }

    setCode(code: string | number) {
        this.code = code;
    }

    setData(data: Object | null) {
        this.data = data;
    }

    setMessage(message: string | null) {
        this.message = message;
    }

    setError(error: Object | null) {
        this.error = error;
    }

    getCode() {
        return this.code;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getData() {
        return this.data;
    }

    getError() {
        return this.error;
    }

    getResponse() {
        return {
            status: this.getStatus(),
            message: this.getMessage(),
            data: this.getData(),
            errorStack: process.env.NODE_ENV === 'development' ? this.getError() : null,
        };
    }
}
