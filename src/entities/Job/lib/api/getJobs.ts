import axios, { AxiosRequestConfig } from 'axios';
import { GetJobDataResponse, JobData } from '../../model/types/types';
import { apiUrl } from 'shared/api/apiUrl';

export interface GetJobsParams {
  page: number;
}

export const getJobs = ({ page }: GetJobsParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'ca655b06dcmsh123a236778d61e7p17a651jsn2566af537d9d',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {
      query: 'Developer',
      page
    }
  };

  return axios.get<GetJobDataResponse>(`${apiUrl}/search`, config);
};
