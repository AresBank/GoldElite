
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  concept: string;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
}

export interface UserWallet {
  balance: number;
  currency: string;
  address: string;
  tier: 'Elite' | 'Gold' | 'Founder';
}

export enum AppState {
  BIOMETRIC_LOCK = 'BIOMETRIC_LOCK',
  DASHBOARD = 'DASHBOARD',
  PLAID_LINK = 'PLAID_LINK',
  AI_CONSULTANT = 'AI_CONSULTANT'
}
