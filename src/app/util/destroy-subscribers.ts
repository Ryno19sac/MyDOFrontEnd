import { Subscriber } from 'rxjs';
// creating the decorator DestroySubscribers
// this decorator automatically unsubs from all subscriptions that are on the subscription object
// ref: https://medium.com/@2muchcoffee/how-to-avoid-multiple-subscription-in-angular-2-component-ce50bc21991b
export function DestroySubscribers() {
  return function(target: any) {
    // decorating the function ngOnDestroy
    target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

    // decorator function
    function ngOnDestroyDecorator(f) {
      return function() {
        // saving the result of ngOnDestroy performance to the variable superData
        let superData = f ? f.apply(this, arguments) : null;

        // unsubscribing
        for (let subscriberKey in this.subscribers) {
          let subscriber = this.subscribers[subscriberKey];
          if (subscriber instanceof Subscriber) {
            subscriber.unsubscribe();
          }
        }

        // returning the result of ngOnDestroy performance
        return superData;
      };
    }

    // returning the decorated class
    return target;
  };
}
