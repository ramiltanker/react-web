export interface JobData {
  job_id: string;
  employer_name: string;
  job_apply_link: string;
  job_country: string;
  job_is_remote: boolean;
}

export interface GetJobDataResponse {
  data: JobData[];
  parameters: {
    page: number;
  };
}
