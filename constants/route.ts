export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const FORGET_PASSWORD_ROUTE = "/forget-password";
export const LANDING_PAGE_ROUTE = "/";

export const DASHBOARD_ROUTE = "/dashboard";

export const routes = {
  auth: {
    login: "/login",
    register: "/register",
  },
  dashboard: {
    index: "/dashboard",
  },
  affiliate_link: (code: string) =>
    `${process.env.REACT_APP_ENDPOINT}/register?ref=${code}`,
};
