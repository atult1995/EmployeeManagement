import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { COMPANY, DESIGNATION } from '../../helpher/helpher';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() emitFilter = new EventEmitter();
  designations = DESIGNATION;
  companies = COMPANY;
  filterCompanies: string[] = [];
  filterDesignations: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  getCompanyFilterValue(event: any, value: any) {
    let temp = this.companies.find((com) => com.companyKey === value);
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
    let temp = this.designations.find((des) => des.designationKey === value);
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
}
