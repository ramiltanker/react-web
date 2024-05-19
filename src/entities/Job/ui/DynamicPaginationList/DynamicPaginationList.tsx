import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useApi from 'shared/lib/hooks/useApi/useApi';
import { getJobs } from '../../lib/api/getJobs';
import { DynamicPaginationListItem } from '../DynamicPaginationListItem/DynamicPaginationListItem';
import styles from './DynamicPaginationList.module.scss';
import { Virtuoso, ScrollSeekPlaceholderProps } from 'react-virtuoso';
import { JobData } from '../../model/types/types';

const DynamicPaginationList = memo(() => {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<JobData[]>([]);

  const fetchGetJobs = useCallback(
    (page: number) => {
      return getJobs({ page });
    },
    [getJobs]
  );

  const [{ isFetching, error, result }, executeGetJobs] = useApi(fetchGetJobs);

  useEffect(() => {
    if (result) {
      setPage(result.parameters.page);
      setJobs((prev) => [...prev, ...result.data]);
    }
  }, [result]);

  useEffect(() => {
    executeGetJobs(1);
  }, []);

  const onLoadNextPart = useCallback(() => {
    executeGetJobs(page + 1);
    setPage((prev) => prev + 1);
  }, [page]);

  const renderJob = (job: JobData) => {
    return <DynamicPaginationListItem key={job.job_id} item={job} />;
  };

  const Footer = () => {
    return <div>Loading...</div>;
  };

  const randomHeights = useMemo(
    () =>
      Array(10)
        .fill(true)
        .map(() => Math.round(Math.random() * 14) + 1),
    []
  );

  const ScrollSeekPlaceholder = ({ height, index }: ScrollSeekPlaceholderProps) => (
    <div
      style={{
        height,
        padding: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          background: index % 2 ? '#ccc' : '#eee',
          height: randomHeights[index % 10]
        }}
      ></div>
    </div>
  );

  return (
    <ul className={styles.paginationList}>
      {jobs.length > 0 && (
        <Virtuoso
          context={{ randomHeights }}
          className={styles.paginationList}
          totalCount={jobs.length}
          endReached={onLoadNextPart}
          data={jobs}
          itemContent={(index, data) => renderJob(data)}
          components={{ Footer, ScrollSeekPlaceholder }}
          increaseViewportBy={200}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 200,
            exit: (velocity) => Math.abs(velocity) < 30
          }}
        />
      )}
    </ul>
  );
});

export { DynamicPaginationList };
