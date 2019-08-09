import {Injectable} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RequestPage} from '../../shared/model/request-page';
import {KasDatagridModel} from './kas-datagrid.model';

@Injectable({
  providedIn: 'root'
})
export class KasService {

  constructor() {
  }

  public listDatas(req?: RequestPage): Observable<HttpResponse<KasDatagridModel[]>> {
    return new Observable((observer) => {

      // observable execution
      observer.next(new HttpResponse({
          body: [
            new KasDatagridModel('name_1', 'description_1', 'type_1', '10/10/10', 'Kas'),
            new KasDatagridModel('name_2', 'description_2', 'type_2', '10/10/12', 'Kas')
          ],
          headers: new HttpHeaders({'X-Total-Count': '8'})
        }
      ));
      observer.complete();
    });
  }
}
