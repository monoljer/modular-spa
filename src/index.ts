import {Router} from './util';
import {IRouteParameters} from './shared/routematcher';

const app = async () => {

    const router = new Router();
    
    router.add('^\/test(\/.*)?', {
      baseurl: '/test',
      type: 'module',
      component: 'test', 
      container: 'content'
    } as IRouteParameters);

    router.add('/', {
      baseurl: '/',
      type: 'module',
      component: 'dashboard', 
      container: 'content'
    } as IRouteParameters);

    // TODO: properly type node
    const listenLinks = (node: any) => {
        if (!!!node) {
            return;
        }
        node.querySelectorAll('[data-navigation]').forEach((item: any) => {
            item.addEventListener('click', (event: PointerEvent) => {
              router.route(event);
            });
        });
    }
    
    window.addEventListener("DOMContentLoaded", (event: Event) => {
        listenLinks(event.target);
    });

    window.addEventListener("DOMNodeInserted", (event: Event) => {
        listenLinks(event.target);
    });
    
    window.onpopstate = router.handleLocation;
    window.route = router.route;
    router.handleLocation();
    console.log('App started');
}

app();
