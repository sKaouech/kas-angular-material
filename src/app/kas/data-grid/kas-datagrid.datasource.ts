import {KasDatagridModel} from './kas-datagrid.model';
import {WlmDataSource} from '../../shared/service/wlm-data.source';
import {BehaviorSubject, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {RequestPage} from '../../shared/model/request-page';
import {catchError, finalize} from 'rxjs/operators';
import {KasService} from './kas.service';

export class KasDatagridDatasource extends WlmDataSource<KasDatagridModel> {

  constructor(private kasService: KasService,
              private headerSubject: BehaviorSubject<HttpHeaders>) {
    super();
  }

  loadImportConfiguration(req?: RequestPage): void {
    this.loadingSubject.next(true);
    super.load(() => this.kasService.listDatas(req)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((importConfiguration: HttpResponse<KasDatagridModel[]>) => {
        this.importConfigurationSubject.next(importConfiguration.body);
        this.headerSubject.next(importConfiguration.headers);
      })
    );
  }
}
