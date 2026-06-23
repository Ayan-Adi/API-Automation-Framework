export type EnvironmentName = 'qa' | 'stage';

export interface EnvironmentConfig {
  name: EnvironmentName;
  baseURL: string;
}

const environments: Record<EnvironmentName, EnvironmentConfig> = {
  qa: {
    name: 'qa',
    baseURL: 'https://practice.expandtesting.com/notes/api/',
  },
  stage: {
    name: 'stage',
    baseURL: 'https://practice.expandtesting.com/notes/api/',
  },
};

export function getEnvironmentName(): EnvironmentName {
  const env = process.env.ENV?.toLowerCase();

  if (env === 'qa' || env === 'stage') {
    return env;
  }

  return 'qa';
}

export function getEnvironmentConfig(): EnvironmentConfig {
  return environments[getEnvironmentName()];
}
