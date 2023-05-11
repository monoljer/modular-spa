export default class Dashboard {
    baseUrl = undefined;
    constructor(baseurl: string) {
        this.baseUrl = baseurl;
    }
    async execute(_: string) {
        return `<div>This is content from Dashboard Module</div>`
    }
}