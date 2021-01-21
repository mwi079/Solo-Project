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
      email: "bs@gmail.com",
      password: "123456",
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
