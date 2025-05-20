export interface Admin {
    id: number;
    name: string;
    username: string;
    role: 'superadmin' | 'supermaster' | 'master' | 'client';
    balance: number;
    // free_chip: number;
      status: {
    active: boolean;
    locked: boolean;
  };
    downline_share: number;
    upline:number;
    my_share: number;
    created_by?: number; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface AdminCreateData {
    name: string;
    username: string;
    password: string;
    repassword: string;
    role: 'supermaster' | 'master' | 'client';
    // free_chip: number;
    balance: number;
    downline_share: number;
    created_by: number;
  }
  
  export interface AuthData {
    token: string;
    expiration: string;
    user: Omit<Admin, 'password'>;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
  }