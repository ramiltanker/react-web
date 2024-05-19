import { getJobs } from './getJobs';

export const fetchNextJobsPage = (page: number) => {
  return getJobs({ page: page + 1 });
};
