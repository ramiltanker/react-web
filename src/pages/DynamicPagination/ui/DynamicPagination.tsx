import { DynamicPaginationList } from 'entities/Job';
import { memo } from 'react';

const DynamicPagination = memo(() => {
  return <DynamicPaginationList />;
});

export { DynamicPagination };
