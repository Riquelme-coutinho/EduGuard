export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date
  authorId: string; // school user id
}

const mockNotices: Notice[] = [];

export const getAllNotices = (): Notice[] => {
  // Return sorted by date descending
  return mockNotices.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const createNotice = (data: Omit<Notice, 'id' | 'date'>): Notice => {
  const newNotice: Notice = {
    id: `n${Date.now()}`,
    date: new Date().toISOString(),
    ...data,
  };
  mockNotices.push(newNotice);
  return newNotice;
};
