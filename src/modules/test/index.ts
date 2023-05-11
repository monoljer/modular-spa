import {IRoute, IRouteParameters, matchRoute} from '../../shared/routematcher';

export default class TestModule {
    private baseUrl: string = '/';

    private routes: IRoute[] = [
        {
            key: "^/items/(.+)?",
            options: {
                baseurl: '/',
                type: 'function',
                component: (key: string) => { return this.item(key) },
                container: ''
            } as IRouteParameters
        } as IRoute,
        {
            key: "^\/items",
            options: {
                baseurl: '/',
                type: 'function',
                component: () => { return this.list() },
                container: ''
            } as IRouteParameters
        } as IRoute,
        {
            key: '',
            options: {
                baseurl: '/',
                type: 'function',
                component: () => { return this.dashboard() },
                container: ''
            } as IRouteParameters
        }
    ];

    constructor(baseurl: string) {
        this.baseUrl = baseurl;
    }

    async execute(path: string) {
        const route = matchRoute(this.routes, path);
        if (this.routes[route.index].options.type === 'function') {
            return this.routes[route.index].options.component(route.path);
        }
        return '';
    }

    private dashboard() {
        return `<div>
            <h1>This is content from Test Module :: dashboard</h1>
            <ul>
                <li><a href="${this.baseUrl}/items" data-navigation>Some Items</a></li>
                <li><a href="/" data-navigation>Home</a></li>
            </ul>
        </div>`
    }

    private list(): string {
        return `<div>
            <h1>This is content from Test Module :: Some Items</h1>
            <ul>
                <li><a href="${this.baseUrl}/items/1" data-navigation>Go to item 1</a></li>
                <li><a href="${this.baseUrl}/items/2" data-navigation>Go to item 2</a></li>
                <li><a href="${this.baseUrl}" data-navigation>To Test module</a></li>
            </ul>
        </div>`
    }

    private item(key: string): string {
        return `<div>
            <h1>This is content from Test Module :: item ${key}</h1>
            <ul>
                <li><a href="${this.baseUrl}/items" data-navigation>To List</a></li>
                <li><a href="${this.baseUrl}" data-navigation>To Testmodule</a></li>
            </ul>
        </div>`
    }

}