async function getData() {

  const response = await fetch('https://api.vk.com/method/get.wall', {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      access_token: 'vk1.a.DoZLc-3Uup1JZW5HqbSjFg_RBxYh3PIZ9ol1igw15x5B2ibWSKU3jqPiCE7jxc8OuWwADzs6JkdlHn5dxDmiKNRx59WQPssrSqxA7hRYQfaps3GR8sGJ08lKpWP8ZG94AxCKLWZX087_FwpYt80FrE0nzZM7M0AjdrEGL_oonZex7tRqLgQhUjW4UVn1yQU5',
      owner_id: '-33276697',
      count: 3
    }),
  });
  console.log(response);
}

getData();