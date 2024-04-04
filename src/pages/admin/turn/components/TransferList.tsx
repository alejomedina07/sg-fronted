import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { TypeTurn } from '../dto/TypeTurn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// function not(a: readonly number[], b: readonly number[]) {
//   return a.filter((value) => b.indexOf(value) === -1);
// }
//
// function intersection(a: readonly number[], b: readonly number[]) {
//   return a.filter((value) => b.indexOf(value) !== -1);
// }
//
// function union(a: readonly number[], b: readonly number[]) {
//   return [...a, ...not(b, a)];
// }

function not(a: readonly TypeTurn[], b: readonly TypeTurn[]) {
  return a.filter((value) => !b.some((item) => item.id === value.id));
}

function intersection(a: readonly TypeTurn[], b: readonly TypeTurn[]) {
  return a.filter((value) => b.some((item) => item.id === value.id));
}

function union(a: readonly TypeTurn[], b: readonly TypeTurn[]) {
  return [...a, ...not(b, a)];
}

interface TransferListProps {
  typeTurns: TypeTurn[];
  right: TypeTurn[];
  setRight: (type: TypeTurn[]) => void;
}

export const TransferList = (props: TransferListProps) => {
  const { typeTurns, right, setRight } = props;
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState<readonly TypeTurn[]>([]);
  const [left, setLeft] = React.useState<readonly TypeTurn[]>([]);
  // const [right, setRight] = React.useState<readonly TypeTurn[]>([]);

  useEffect(() => {
    if (typeTurns.length) setLeft([...typeTurns]);
  }, [typeTurns]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TypeTurn) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly TypeTurn[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly TypeTurn[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly TypeTurn[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} ${t('selected')}`}
      />
      <Divider />
      <List
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: TypeTurn) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={5}>
        {customList(t('options'), left)}
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        {customList(t('chosen'), right)}
      </Grid>
    </Grid>
  );
};
