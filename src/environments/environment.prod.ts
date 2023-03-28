export interface EnvironmentInterface {
  production: boolean;
  apiURL: string;
}

export const environment = {
  production: true,
  apiURL: "http://sedov.space:8080"
};
