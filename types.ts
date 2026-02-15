
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  service: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  missionBrief?: string;
}