interface Question {
  id?: number;
  name: string;
  description: string;
  status: boolean;
  categoryId: number;
}

interface OptionQuestion {
  id?: number;
  name: string;
  description: string;
  status: boolean;
}

interface BodyQuestion {
  question: Question;
  options?: OptionQuestion[];
}
