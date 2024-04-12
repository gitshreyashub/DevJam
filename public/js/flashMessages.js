fetch('/flash-messages')
  .then(response => response.json())
  .then(data => {
    const flashMessage = document.getElementById('flash-message');
    if (data.error) {
      flashMessage.innerText = data.error;
      flashMessage.style.color = 'red';
    } else if (data.success) {
      flashMessage.innerText = data.success;
      flashMessage.style.color = 'green';
    }
  })
  .catch(error => console.error('Error:', error));