interface CheckedToken {
    user: string;
    application: string;
    type: string;
    destination: string;
    token: string;
    created_at: Date;
    expires_at: Date;
    token_live: number;
}

export default CheckedToken