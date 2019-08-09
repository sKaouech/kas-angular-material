import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ITEMS_PER_PAGE, PAGE_SIZE_OPTIONS, RESPONSE_HEADER_X_TOTAL_COUNT} from '../../shared/const/request.constant';
import {ConfigurationImportTableColumn} from './kas-datagridheader.enum';
import {KasDatagridDatasource} from './kas-datagrid.datasource';
import {RequestPage} from '../../shared/model/request-page';
import {SortDirectionEnums} from '../../shared/enums/sort-direction.enums';
import {KasService} from './kas.service';
import {BehaviorSubject, merge} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {MatPaginator, MatSort} from '@angular/material';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'kas-datagrid',
  templateUrl: './kas-datagrid.html',
  styleUrls: ['./kas-datagrid.scss']
})
export class KasDatagridComponent implements OnInit, AfterViewInit {
  itemPerPage: number = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  displayedColumns: string[] = ConfigurationImportTableColumn.values();
  totalItems: string;
  columns = ConfigurationImportTableColumn;
  dataSource: KasDatagridDatasource;
  private headerSubject = new BehaviorSubject<HttpHeaders>(new HttpHeaders());

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(@Inject(KasService) private kasService: KasService) {
  }

  ngOnInit(): void {
    this.headerSubject.subscribe(header => {
      this.totalItems = header.get(RESPONSE_HEADER_X_TOTAL_COUNT);
    });
    this.dataSource = new KasDatagridDatasource(this.kasService, this.headerSubject);
    const requestPage = new RequestPage(this.paginator.pageIndex,
      this.paginator.pageSize ? this.paginator.pageSize : this.itemPerPage,
      [`${ConfigurationImportTableColumn.NAME},${SortDirectionEnums.ASC}`]);
    this.dataSource.loadImportConfiguration(requestPage);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadImportConfigurationPage())
      )
      .subscribe();
  }

  loadImportConfigurationPage(): void {
    const columnSort = ConfigurationImportTableColumn[this.sort.active];
    const requestPage = new RequestPage(this.paginator.pageIndex, this.paginator.pageSize, [`${columnSort},${this.sort.direction}`]);
    this.dataSource.loadImportConfiguration(requestPage);
  }

}
