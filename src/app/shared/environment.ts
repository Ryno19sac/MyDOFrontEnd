export abstract class Environment {
    abstract readonly production: boolean;
    abstract readonly webUrl: string;
    abstract readonly apiUrl: string;
    abstract readonly loginUrl: string;
    abstract readonly userInfoUrl: string;
    abstract readonly snackBarTimeout: number;
}

