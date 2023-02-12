// Return the user display name from the session

export function UserDisplayName(req){
    if(req.user){
        return req.user.displayName;
    }

    return '';
}