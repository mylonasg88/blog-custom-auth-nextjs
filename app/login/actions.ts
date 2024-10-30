import { findUserByEmail } from "app/db/queries/users"

export const getByEmail = async (email: string) => {   
    return (await findUserByEmail(email));
}
