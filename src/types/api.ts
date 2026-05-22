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

interface survey {
  id: number;
  title: string;
  description: string;
  creator: user;
  questions: questions[];
  createdAt: string;
  updatedAt: string;
}

interface questions {
  id: number;
  text: string;
  type: string;
  options?: string[];
}

interface answers {
  id: number;
  questionId: number;
  answer: string | number | boolean;
  respondent: user;
  submittedAt: string;
}

export type { 
  user,
  survey,
  questions,
  answers
};