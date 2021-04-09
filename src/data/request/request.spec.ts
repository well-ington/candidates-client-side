import faker from "faker";
import { createAxiosMock, MockedAxios } from "../test/mock-axios";
import { GetServerData } from "./request";

type TmockType = (url?: string, success?: boolean, response?: any) => { sut: GetServerData, spy: MockedAxios }

const makeSUT: TmockType = (url = "http://localhost:5050", success = true, response = { data: {} }) => {

    const spy = createAxiosMock(success, response);

    const sut = new GetServerData(url, spy);

    return {
        sut,
        spy
    };
}

describe("Fetching information from server side", () => {

    test("It calls the right axios function with the correct string", async () => {
        const myRandomURL = faker.internet.url();
        const { sut, spy } = makeSUT(myRandomURL);
        try {
            await sut.getSuggestions();
            expect(spy.lastUrl).toEqual(myRandomURL + "/suggestions");
        } catch (error) {
            throw error;
        }

    });

    test("It calls the right axios POST function with the correct string and query", async () => {
        const randomObject = {
            city: faker.random.words(),
            experience: faker.random.words()
        }

        const myRandomURL = faker.internet.url();
        const { sut, spy } = makeSUT(myRandomURL);
        try {
            await sut.getResults(randomObject);
            expect(JSON.stringify(randomObject)).toEqual(JSON.stringify(spy.lastQuery));
        } catch (error) {
            throw error;
        }
    });

});