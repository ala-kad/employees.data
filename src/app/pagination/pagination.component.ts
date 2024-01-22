import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../employees.service';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit {
  // Columns to be displayed in the table
  displayedColumns: string[] = ['id', 'age', 'email', 'salary', 'address', 'lastName', 'firstName', 'contactNumber'];
  // Pagination parameters.
  total: number = 0;
  p: number = 1;
  itemsPerPage: number = 9;

  collection: any[] = [];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private employeeService: EmployeesService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.collection = data;
      this.total = data.length;
      this.dataSource.data = data;
    });
  }

}
