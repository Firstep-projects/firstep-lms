export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  duration: number; // в часах
  price: number; // в USD
  status: 'active' | 'inactive' | 'draft';
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
