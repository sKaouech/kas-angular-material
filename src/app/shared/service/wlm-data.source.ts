import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';

export class WlmDataSource<T> implements DataSource<T> {

  protected importConfigurationSubject = new BehaviorSubject<T[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);

  protected loading$ = this.loadingSubject.asObservable();

  constructor() {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.importConfigurationSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.importConfigurationSubject.complete();
    this.loadingSubject.complete();
  }

  load(callService: () => any): void {
    this.loadingSubject.next(true);
    callService();
  }

}
