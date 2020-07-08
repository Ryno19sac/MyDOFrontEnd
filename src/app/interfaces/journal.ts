export interface Journal {
    user_id?: number,
    id?: number,
    entry: string,
    is_completed?: boolean,
    editing?: boolean,
    entryDate?: number
}
