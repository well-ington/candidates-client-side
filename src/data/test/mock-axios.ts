export class MockedAxios {
    success: boolean;
    response: any;
    lastUrl: string;
    lastQuery: any;
    constructor(success: boolean, response: any) {
        this.success = success;
        this.response = response;
        this.lastUrl = '';
        this.lastQuery = {};
    }

    get(url: string) {
        this.lastUrl = url;
        return new Promise((resolve,reject) => {
            if(this.success && this.response) {
                resolve({ data: this.response });
            } else {
                reject("error");
            }
        });
    }

    post(url: string, options?: any) {
        this.lastUrl = options;
        this.lastQuery = options;
        return new Promise((resolve,reject) => {
            if(this.success && this.response) {
                resolve({ data: this.response });
            } else {
                reject("error");
            }
        });
    }
}

export const createAxiosMock: (success: boolean, response: any) => MockedAxios = (success, response) => {   
    return new MockedAxios(success, response);
};