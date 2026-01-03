import { JwtPayload } from 'jsonwebtoken'; // 1. Import JwtPayload

export interface AuthTokenPayload extends JwtPayload {
  mid: string;
  name: string;
  role: string;
}

export interface authTokenInterface {
    mid: string,
    name: string,
    role: string,
}