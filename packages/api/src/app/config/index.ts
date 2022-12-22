export interface IConfig {
  [key: string]: string | number | boolean;
}

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const port = process.env.PORT || 8000;
export const apiMembersUrl = process.env.API_MEMBERS_URL || '';

export const config: IConfig = {
  apiMembersUrl,
  isDevelopment,
  isProduction,
  port,
};
