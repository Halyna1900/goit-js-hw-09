const feedbackForm = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

const fillFormField = event => {
  try {
    const formDataLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (formDataLS === null) {
      return;
    }
    formData = formDataLS;
    console.log(formData);
    for (const key in formDataLS) {
      feedbackForm.elements[key].value = formDataLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};

fillFormField();
const onFormFieldChange = event => {
  const formFieldEl = event.target;

  const fieldValue = formFieldEl.value;
  const fieldName = formFieldEl.name;

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  if (
    !(formData.email && formData.email.trim()) ||
    !(formData.message && formData.message.trim())
  ) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  formData = {};
  const formEl = event.currentTarget;

  formEl.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackForm.addEventListener('input', onFormFieldChange);
feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
