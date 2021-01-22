const mock = {
  valid: {
    correctLoginData: {
      email: "Something@whatever.com",
      password: "123456",
    },
    wrongLoginData: { email: "nope", password: "1234" },
    correctUserData: {
      name: "Balthazar",
      surname: "Smith",
      email: "whatever@gmail.com",
      password: "123456",
    },
    correctGithubUserData: {
      name: "Balthazar",
      surname: "Smith",
      email: "whatever@gmail.com",
      avatar_url: "google.com",
      gists_url: "google.com",
      html_url: "google.com",
      location: "Mordor",
    },
    wrongUserData: {
      name: "",
      surname: "Smith",
      email: "nope",
      password: "1234",
    },
  },
  auth: {
    ctxError: { status: 403, body: "", request: { headers: () => false } },
    next: "whatever",
  },
};

module.exports = mock;
