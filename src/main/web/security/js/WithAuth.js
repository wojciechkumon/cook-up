import AuthChecking from "./AuthChecking";
import {WithAuthWrapper} from "../../util/js/WithAuthWrapper";

const WithAuth = WithAuthWrapper({
  authSelector: state => state.auth,
  predicate: (authData) => authData.loggedIn,
  authenticatingSelector: state => state.auth.isAuthenticating,
  LoadingComponent: AuthChecking
});

export default WithAuth;