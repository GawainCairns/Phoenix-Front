interface user {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  description: string;
  permissions: string[];
  memberSince: string;
  lastLogin: string;
}

export type { 
  user 
};