import client from "../../restclient/client";
import {reset} from "redux-form/es/actions";
import {fetchCommentsIfNeeded, invalidateComments} from "./actions/actions";

export const handleSubmit = (recipeId, dispatch) => values => {
  const recipeNum = Number(recipeId);
  const path = '/api/recipes/' + recipeNum + '/comments';
  const commentDto = {
    content: values.content
  };
  return client({method: 'POST', path, entity: commentDto})
    .then(() => dispatch(reset('new-comment-form')))
    .then(() => dispatch(invalidateComments(recipeNum)))
    .then(() => dispatch(fetchCommentsIfNeeded(recipeNum)));
};
