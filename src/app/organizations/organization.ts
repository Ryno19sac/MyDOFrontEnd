export class Organization {
  id?: number;
  name?: string;
  clientId?: string;
  clientSecret?: string;
  stripeCustomerId?: string;
  invitationEmail?: string;
  initializationFee?: number;
  subscriptionFee?: number;
  active?: boolean;
  created?: string;
  modified?: string;
}
