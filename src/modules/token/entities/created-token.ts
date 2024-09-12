interface CreatedToken {
    user: string;
    application: string;
    type: string;
    destination: string;
    token: string;
    created_at: Date;
    expires_at: Date;
    token_live: number;
    already_created: boolean;
}

export default CreatedToken