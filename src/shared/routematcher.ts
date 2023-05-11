
export interface IRouteParameters {
  baseurl: string,
  type: string,
  component: any,
  container: string
}

export interface IRoute {
  key: string;
  options: IRouteParameters
}

export interface IMatchedRoute {
  index: number,
  baseUrl: string,
  path: string
}

export function matchRoute(routes: IRoute[], path: string): IMatchedRoute {
    for(let i=0;i<routes.length; i++){
      const r = path.match(routes[i].key);
      if (r) {
        return {
          index: i,
          baseUrl: r[0].replace(new RegExp(r[1] + '$'), ''),
          path: r[1] !== undefined ? r[1] : ''
        } as IMatchedRoute;
      }
    }
    return undefined!;
  }