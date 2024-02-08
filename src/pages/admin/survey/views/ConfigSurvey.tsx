import { SgLink } from '../../../../components/form/button/SgLink';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import React, { useEffect, useState } from 'react';
import { ListCategoryComponent } from '../components/category/listCategoryComponent';
import {
  useGetCategoryQuery,
  useGetQuestionQuery,
} from '../redux/api/surveyApi';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ListQuestionComponent } from '../components/question/listQuestionComponent';
import { ListSurveyConfig } from '../components/survey/config/listSurveyConfig';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabPanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="flex-1"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabPanel-${index}`,
  };
}

export const ConfigSurvey = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [valueTab, setValueTab] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const {
    data: categories,
    isLoading: isLoadingCategory,
    refetch: refetchCategories,
  } = useGetCategoryQuery(openCategory);

  const { data: questions, isLoading: isLoadingQuestion } =
    useGetQuestionQuery(openQuestion);

  useEffect(() => {
    refetchCategories();
  }, [openQuestion, refetchCategories]);

  return (
    <>
      <ViewTitle title={t('config_survey')}>
        <SgLink label={t('home')} to="/admin" />
      </ViewTitle>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: 'auto',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={valueTab}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label={t('surveys')} {...a11yProps(0)} />
          <Tab label={t('questions')} {...a11yProps(1)} />
          <Tab label={t('categories')} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <ListSurveyConfig categories={categories} />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <ListQuestionComponent
            data={questions}
            setOpenQuestion={setOpenQuestion}
            openQuestion={openQuestion}
            isLoading={isLoadingQuestion}
            categories={categories}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          <ListCategoryComponent
            data={categories}
            setOpenCategory={setOpenCategory}
            openCategory={openCategory}
            isLoading={isLoadingCategory}
          />
        </TabPanel>
      </Box>
    </>
  );
};
