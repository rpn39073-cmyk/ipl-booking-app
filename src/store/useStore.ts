import { create } from 'zustand';

interface Seat {
  id: string;
  stand_id: string;
  row_label: string;
  seat_number: number;
  status: 'Available' | 'Selected' | 'Booked';
  locked_by?: string;
}

interface Match {
  id: string;
  team_home: string;
  team_away: string;
  date_time: string;
  stadium: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

interface StoreState {
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match) => void;
  selectedSeats: Seat[];
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearSeats: () => void;
  ticketLimit: number;
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  selectedMatch: null,
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  selectedSeats: [],
  addSeat: (seat) => {
    const { selectedSeats, ticketLimit } = get();
    if (selectedSeats.length < ticketLimit && !selectedSeats.find(s => s.id === seat.id)) {
      set({ selectedSeats: [...selectedSeats, seat] });
    }
  },
  removeSeat: (seatId) => set((state) => ({
    selectedSeats: state.selectedSeats.filter(s => s.id !== seatId)
  })),
  clearSeats: () => set({ selectedSeats: [] }),
  ticketLimit: 1, // specified in requirements as 1 for the booking
  userDetails: null,
  setUserDetails: (details) => set({ userDetails: details }),
}));
