import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import AccordionDetails from '@mui/material/AccordionDetails';
import { QuestionHeader } from './questionHeader';

interface PreviewCategoriesProps {
  categories: any[];
  answers?: any[];
  general?: boolean;
}
export const PreviewCategories = (props: PreviewCategoriesProps) => {
  const { categories, answers, general } = props;

  const getClassResponse = (option: any): string => {
    if (!answers) return '';
    const idx = answers?.findIndex(
      (item) => item.optionQuestionId === option.id
    );
    return idx !== -1
      ? 'w-full p-1 border-4 border-blue-400 mb-1 rounded'
      : 'p-1 ';
  };

  const getTotalAnswer = (option: any) => {
    return answers?.filter((item) => item.optionQuestionId === option.id)
      .length;
  };

  return (
    <div className="mt-4">
      {!!categories?.length &&
        categories.map((category: any, index: number) => {
          return (
            <Accordion
              key={`Accordion-${index}`}
              className="!bg-gray-100"
              defaultExpanded
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <b>{t('category')} :</b> {category.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="px-4 flex flex-col items-start">
                  <Typography>{t('description')}:</Typography>
                  <b> {category.description} </b>
                  {!!category.questions?.length &&
                    category.questions.map(
                      (question: any, indexQuestion: number) => {
                        return (
                          <QuestionHeader
                            key={`Accordion-${index}-question-${question.id}`}
                            question={question}
                            numberQuestion={indexQuestion + 1}
                            answers={answers}
                            general={general}
                          >
                            {!!question.optionQuestions?.length &&
                              question.optionQuestions.map(
                                (option: any, indexOption: number) => {
                                  return (
                                    <div
                                      // className="!pl-6 flex flex-col items-start w-full p-1 border-4 border-blue-500 mb-1 rounded-3xl"
                                      className={`w-full !pl-6 flex flex-col items-start ${getClassResponse(
                                        option
                                      )}`}
                                      key={`Accordion-${index}-question-${question.id}-option-${indexOption}`}
                                    >
                                      <Typography>
                                        {indexOption + 1} -
                                        <b> {option.name} </b>
                                      </Typography>
                                      <Typography className="!ml-4">
                                        {option.description}
                                      </Typography>
                                      {!!general && (
                                        <div className="w-full flex flex-row items-center justify-end text-blue-800">
                                          <b>{t('total_answer')} : </b>
                                          {/* <span className="text-blue-800"> */}
                                          {/* </span> */}
                                          <span className="text-2xl">
                                            &nbsp;
                                            {getTotalAnswer(option)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                          </QuestionHeader>
                        );
                      }
                    )}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};
