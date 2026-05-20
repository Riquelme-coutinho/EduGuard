export interface Routine {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  food: {
    ateWell: boolean;
    obs: string;
  };
  sleep: {
    sleptWell: boolean;
    obs: string;
  };
  hygiene: {
    clean: boolean;
    obs: string;
  };
}

const mockRoutines: Routine[] = [];

const getTodayStr = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const findRoutineForToday = (studentId: string): Routine | undefined => {
  const today = getTodayStr();
  return mockRoutines.find(r => r.studentId === studentId && r.date === today);
};

export const upsertRoutine = (data: Omit<Routine, 'id'>): Routine => {
  const today = getTodayStr();
  const existingIdx = mockRoutines.findIndex(
    r => r.studentId === data.studentId && r.date === today
  );

  if (existingIdx >= 0) {
    // Update existing
    mockRoutines[existingIdx] = { ...mockRoutines[existingIdx], ...data, date: today };
    return mockRoutines[existingIdx];
  } else {
    // Create new
    const newRoutine: Routine = {
      id: `r${Date.now()}`,
      ...data,
      date: today,
    };
    mockRoutines.push(newRoutine);
    return newRoutine;
  }
};
