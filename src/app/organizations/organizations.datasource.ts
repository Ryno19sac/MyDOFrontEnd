import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {Organization} from "./organization";
import {OrganizationService} from "./organization.service";
import {ResponseBase} from "../shared/model";

export class OrganizationsDataSource implements DataSource<Organization> {
  private organizationsSubject = new BehaviorSubject<Organization[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // internal data
  resultsLength: number;
  private data: Organization[];

  constructor(private organizationService: OrganizationService) {
  }

  searchOrganizations(filter: string, pageIndex: number, pageSize: number) {
    // set loading
    this.loadingSubject.next(true);
    // make the api search call
    return this.organizationService.search(filter, pageIndex, pageSize)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((results: ResponseBase<Organization[]>) => {
      this.resultsLength = results.totalCount;
      // store the data locally
      this.data = results.object;
      // update the observable subject
      this.organizationsSubject.next(results.object);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Organization[]> {
    console.log('Connecting data source');
    return this.organizationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.organizationsSubject.complete();
    this.loadingSubject.complete();
  }

  // helper for deletions
  deleteOrganization(organization: Organization): boolean {
    // make a clone of the data
    const clonedData = this.data.map(x => Object.assign({}, x));
    // remove the organization in question from the list
    for (let j = 0; j < clonedData.length; j++) {
      // get the current organization
      const currentOrganization = clonedData[j];
      console.log('currentOrganization is ', currentOrganization);
      // compare them
      if (organization.id === currentOrganization.id) {
        console.log('got a match on id ', organization.id);
        // pop it from the clone
        clonedData.splice(j, 1);
        // notify the datasource that it the data has changed
        this.organizationsSubject.next(clonedData);
        return true;
      }
    }
    // not found
    return false;
  }
}
