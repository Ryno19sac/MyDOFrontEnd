import {Store} from '@ngrx/store';
import {Organization} from './organization';
import {GlobalState} from '../+state/global.interfaces';

export abstract class HasOrganization {
    private organization: Organization;

    protected constructor(private theStore: Store<GlobalState>) {
        // subscribe to store updates
        // theStore.select('app').subscribe(state => {
        //     console.log("state is ", state);
        //     // get the organization
        //     this.organization = state.organization;
        //     console.log("[HAS_ORGANIZATION] current organization is ", this.organization);
        // });
    }

    public getOrganization(): Organization {
        return this.organization;
    }

    public getOrganizationId(): number {
        if (this.getOrganization()) {
            return this.organization.id;
        }
        return null;
    }
}
