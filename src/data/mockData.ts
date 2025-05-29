
import { Subject, Topic, Chapter } from '@/types';

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    syllabusCode: '0580',
    examBoard: 'Cambridge',
    progress: 65,
    totalTopics: 48,
    completedTopics: 31
  },
  {
    id: '2',
    name: 'Physics',
    syllabusCode: '0625',
    examBoard: 'Cambridge',
    progress: 40,
    totalTopics: 36,
    completedTopics: 14
  },
  {
    id: '3',
    name: 'Chemistry',
    syllabusCode: '0620',
    examBoard: 'Cambridge',
    progress: 25,
    totalTopics: 42,
    completedTopics: 10
  }
];

export const mockMathTopics: Topic[] = [
  {
    id: '1',
    title: 'Number Operations',
    description: 'Basic arithmetic operations with integers, decimals, and fractions',
    syllabusReference: '1.1',
    chapter: 'Number',
    status: 'completed',
    examTags: ['Core', 'Extended'],
    difficulty: 'Core',
    estimatedTime: 45,
    lastStudied: new Date('2024-01-15'),
    userTags: ['foundation', 'important']
  },
  {
    id: '2',
    title: 'Indices and Standard Form',
    description: 'Laws of indices, negative and fractional indices, standard form',
    syllabusReference: '1.2',
    chapter: 'Number',
    status: 'in-progress',
    examTags: ['Core', 'Extended'],
    difficulty: 'Extended',
    estimatedTime: 60,
    lastStudied: new Date('2024-01-20'),
    userTags: ['challenging', 'review-needed']
  },
  {
    id: '3',
    title: 'Ratio and Proportion',
    description: 'Direct and inverse proportion, ratio calculations',
    syllabusReference: '1.3',
    chapter: 'Number',
    status: 'not-started',
    examTags: ['Core'],
    difficulty: 'Core',
    estimatedTime: 40,
    userTags: []
  },
  {
    id: '4',
    title: 'Linear Equations',
    description: 'Solving linear equations and inequalities',
    syllabusReference: '2.1',
    chapter: 'Algebra',
    status: 'completed',
    examTags: ['Core', 'Extended'],
    difficulty: 'Core',
    estimatedTime: 50,
    lastStudied: new Date('2024-01-18'),
    userTags: ['mastered']
  },
  {
    id: '5',
    title: 'Quadratic Equations',
    description: 'Factoring, completing the square, quadratic formula',
    syllabusReference: '2.2',
    chapter: 'Algebra',
    status: 'in-progress',
    examTags: ['Extended'],
    difficulty: 'Extended',
    estimatedTime: 75,
    userTags: ['needs-practice']
  }
];

export const mockChapters: Chapter[] = [
  {
    id: '1',
    title: 'Number',
    topics: mockMathTopics.filter(t => t.chapter === 'Number'),
    progress: 66
  },
  {
    id: '2',
    title: 'Algebra',
    topics: mockMathTopics.filter(t => t.chapter === 'Algebra'),
    progress: 50
  }
];
