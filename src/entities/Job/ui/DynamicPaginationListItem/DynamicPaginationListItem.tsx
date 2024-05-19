import { FC, memo } from 'react';
import Card from '@mui/material/Card';
import { JobData } from '../../model/types/types';
import { CardContent, Typography } from '@mui/material';
import styles from './DynamicPaginationListItem.module.scss';

interface DynamicPaginationListItemProps {
  item: JobData;
}

const DynamicPaginationListItem: FC<DynamicPaginationListItemProps> = memo((props) => {
  const { item } = props;

  return (
    <Card component="li" className={styles.card}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {item.employer_name}
        </Typography>
        {item.job_country && (
          <div className={styles.box}>
            <Typography component="p">Страна:</Typography>
            <Typography component="p">{item.job_country}</Typography>
          </div>
        )}
        {item.job_apply_link && (
          <div className={styles.box}>
            <Typography component="p">Ссылка на вакансию:</Typography>
            <Typography component="p">{item.job_apply_link}</Typography>
          </div>
        )}
        {item.job_is_remote && (
          <div className={styles.box}>
            <Typography component="p">Удалёнка:</Typography>
            <Typography component="p">{item.job_is_remote ? 'Да' : 'Нет'}</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export { DynamicPaginationListItem };
