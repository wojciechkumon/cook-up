import AuthChecking from "./AuthChecking";
import {WithAuthWrapper} from "../../util/js/WithAuthWrapper";

const WithAuth = WithAuthWrapper({
  authSelector: state => state.user,
  predicate: (authData) => authData.loggedIn,
  authenticatingSelector: state => state.user.isAuthenticating,
  LoadingComponent: AuthChecking
});

export default WithAuth;