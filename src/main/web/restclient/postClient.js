class PostClient {

  nonAjaxPost(path, params, method) {
    method = method || 'post';

    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }
}

const postClient = new PostClient();

export default postClient;
