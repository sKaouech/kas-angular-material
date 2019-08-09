import {HttpParams} from '@angular/common/http';
import {RequestPage} from './request-page';

export const createRequestOption = (req?: RequestPage): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach((key) => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
            // params.set('query', req.query);
        });
        if (req.sort) {
            req.sort.forEach((val) => {
                options = options.append('sort', val);
            });
        }
        // options = options.set('query', req.query);
    }
    return options;
};
