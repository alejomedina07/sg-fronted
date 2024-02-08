import { useParams } from 'react-router-dom';
import { AnswerSurvey } from '../../admin/survey/views/AnswerSurvey';

export const AnswerAnonymous = () => {
  const { idSurvey } = useParams();
  const parsedIdSurvey = idSurvey ? parseInt(idSurvey, 10) : null;

  return (
    <div className="p-8">
      {!!parsedIdSurvey && <AnswerSurvey idSurvey={parsedIdSurvey} />}
    </div>
  );
};
