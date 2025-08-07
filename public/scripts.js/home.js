// public/js/savePost.js

// This function is called when the user clicks the "Save" button
function savePost(postId) {
  fetch(`/pinterest/pin/save/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    })
    .catch(err => {
      console.error('Error saving post:', err);
      alert('Failed to save post');
    });
}


//redirecting to details route

function detail(id){
  res.redirect(`user/details/${id}`)
}


  const settingsBtn = document.getElementById('settingsBtn');
  const settingsMenu = document.getElementById('settingsMenu');

  settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
  });

  // Optional: Hide dropdown if clicked outside
  document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
      settingsMenu.classList.add('hidden');
    }
  });

