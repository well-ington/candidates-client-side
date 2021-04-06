import { GetServerData } from "./request";


//testing on localhost:5050
const makeSUT: (url?: string, success?: boolean) => {sut: GetServerData} = (url = 'http://localhost:5050', success = true)  => {

    const mockFetch = (str: string, options?: any) => {

        return new Promise((resolve, reject) => {
            if (success) {
                if(options) {
                    resolve({
                        json: () => new Promise((resolve, reject) => {
                            resolve({
                                results: []
                            });
                        })
                    });

                } else {
                    resolve({
                        json: () => new Promise((resolve, reject) => {
                            resolve({
                                city: [],
                                experience: [],
                                tech: [],
                                results: []
                            });
                        })
                    });

                }                
            } else {
                reject('access denied');
            }
        });
    }
    
    const sut = new GetServerData(url, mockFetch);

    return {
        sut
    }
}

describe('Fetching information from server side', () => {

    test('It receive a success for localhost. Localhost must be online', async () => {
        const { sut } = makeSUT();
        try {
            const data = await sut.getSuggestions();
            expect(data).toBeTruthy();
            expect(data.error).toBeFalsy();
        } catch (error) {
            expect(error).toBeFalsy();
        }
    });

    test('If any error occurs, return a custom error object with error: true alongside with the error object', async () => {
        const { sut } = makeSUT(undefined, false);
        try {
            const data = await sut.getSuggestions();
            expect(data.error).toBe(true);
            expect(data.errorObject).toBeTruthy();
        } catch (error) {
            expect(error).toBeFalsy();
        }
    });


});