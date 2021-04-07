export class GetServerData {
    baseUrl: string;
    paths: {
        suggestions:  string;
        query: string;
    };
    //injected dependency
    fetcHTTP: {
        get: (url: string) => Promise<any>;
        post: (url: string, any) => Promise<any>;
    };

    constructor(baseUrl: string, fetchDependency: any) {
        this.baseUrl = baseUrl;
        this.paths = {
            suggestions: 'suggestions',
            query: 'query'
        }
        this.fetcHTTP = fetchDependency;
    }
    getSuggestions(): Promise<{error: boolean, errorObject: any} | any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.fetcHTTP.get(`${this.baseUrl}/${this.paths.suggestions}`);
                const data = response.data;
                resolve(data);
                
            } catch (error) {
                resolve({
                    error: true,
                    errorObject: error
                });
            }
        });
    }

    getResults(queryObject: any) {        
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.fetcHTTP.post(`${this.baseUrl}/${this.paths.query}`, queryObject);
                resolve(response.data);
            } catch (error) {
                resolve({
                    error: true,
                    errorObject: error
                });
            }
        });
    }
}