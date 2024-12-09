import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Company,
  COMPANY,
  deepCopy,
  Designation,
  DESIGNATION,
} from '../../helpher/helpher';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() emitFilter = new EventEmitter();
  designations: Designation[] = [];
  companies: Company[] = [];
  filterCompanies: string[] = [];
  filterDesignations: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initDesignationAndCompany();
  }

  getCompanyFilterValue(event: any, value: any) {
    let temp = this.companies.find((com: any) => com.companyKey === value);
    if (temp) {
      temp.selected = event;
      if (event === false) {
        this.filterCompanies = this.filterCompanies.filter(
          (val) => val !== value
        );
      } else {
        this.filterCompanies.push(temp.companyKey);
      }
    }
  }

  getDesignationFilterValue(event: any, value: any) {
    let temp = this.designations.find(
      (des: any) => des.designationKey === value
    );
    if (temp) {
      temp.selected = event;
      if (event === false) {
        this.filterDesignations = this.filterDesignations.filter(
          (val) => val !== value
        );
      } else {
        this.filterDesignations.push(temp.designationKey);
      }
    }
  }

  onApplyFilters() {
    if (
      this.filterCompanies.length === this.companies.length &&
      this.filterDesignations.length === this.designations.length
    ) {
      this.emitFilter.emit({ filterCompanies: [], filterDesignations: [] });
    }
    this.emitFilter.emit({
      filterCompanies: this.filterCompanies,
      filterDesignations: this.filterDesignations,
    });
  }
  clearFilter() {
    this.filterDesignations = [];
    this.filterCompanies = [];
    this.initDesignationAndCompany();
    this.emitFilter.emit({
      filterCompanies: this.filterCompanies,
      filterDesignations: this.filterDesignations,
    });
  }

  initDesignationAndCompany() {
    this.designations = deepCopy(DESIGNATION);
    this.companies = deepCopy(COMPANY);
  }
}
