
export interface Subject {
  id: string;
  name: string;
  syllabusCode: string;
  examBoard: 'Cambridge' | 'Edexcel' | 'AQA' | 'OCR';
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  syllabusReference: string;
  chapter: string;
  status: 'not-started' | 'in-progress' | 'completed';
  examTags: string[];
  difficulty: 'Core' | 'Extended';
  estimatedTime: number; // in minutes
  lastStudied?: Date;
  notes?: string;
  userTags: string[];
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
  progress: number;
}

export interface StudyGoal {
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  current: number;
  unit: 'topics' | 'hours';
}

export interface User {
  id: string;
  name: string;
  subjects: Subject[];
  goals: StudyGoal[];
  preferences: {
    studyReminders: boolean;
    difficulty: 'Core' | 'Extended' | 'Both';
    theme: 'light' | 'dark';
  };
}
