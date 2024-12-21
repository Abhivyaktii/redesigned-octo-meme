export interface Participant {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
  assignedTo?: string;
}

export interface Group {
  id: string;
  name: string;
  participants: Participant[];
  budget?: number;
  exchangeDate?: string;
}