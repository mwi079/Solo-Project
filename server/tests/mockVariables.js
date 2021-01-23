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
  topic: {
    correctTopic: {
      title: "Harry Potter learns Javascript",
      content:
        "Harry struggled to get a job after Hogwarts so decided to attent a codecamp",
    },
    wrongTopic: {
      title: "Harry Potter learns Javascript",
      content: "",
    },
  },
};

module.exports = mock;
