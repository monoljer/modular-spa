import {IRoute, matchRoute} from './shared/routematcher';
import { IRouteParameters } from './shared/routematcher';

export class Router {
    
    private routes: IRoute[] = [];
    
    constructor() {
    }

    add(key: string, options: IRouteParameters): void {
        this.routes.push({key, options} as IRoute);
    }

    async lazyLoad(moduleId: string, baseUrl: string) {
        const { default: module } = await import(`./modules/${moduleId}/index.js`);
        return new module(baseUrl);
    }

    async handleLocation() {
        if (this.route.length < 1) {
            return;
        }
        const path = window.location.pathname;
        const result = matchRoute(this.routes, path);

        if (!!!result) {
            return;
        }

        const route = this.routes[result.index];
        if (route.options.type === 'module') {
            const module = await this.lazyLoad(route.options.component, result.baseUrl);
            const container = document.getElementById(route.options.container);
            if (!!container) {
                container.innerHTML = await module.execute(result.path);
            }
        } else {
            console.log('Unknown type');
        }
    };
    
    route(event: PointerEvent) {
        //event = event || window.event;
        event.preventDefault();
        if (!!event.target) {
            const href = (event.target as HTMLAnchorElement).href;
            window.history.pushState({}, "", href);
            this.handleLocation();
        }
    };
}

