const onSuccess = async (
  response,
  dispatch,
  githubSignIn,
  setError,
  registerUserGithub,
  completeAuthentication,
  getGithubProfile
) => {
  console.log("response.code", response.code);

  try {
    const {
      avatar_url,
      email,
      gists_url,
      html_url,
      location,
      name,
    } = await githubSignIn(response.code)
      .then((res) => res)
      .catch((error) => setError(error));

    registerUserGithub({
      avatar_url,
      email,
      gists_url,
      html_url,
      location,
      name,
    }).then((res) => {
      completeAuthentication(res.data);
      getGithubProfile(res.data).then((res) => {
        dispatch({ type: "user", payload: res.data });
      });
      dispatch({ type: "isAuthWithGithub", payload: true });
    });
  } catch (error) {
    setError(error);
  }
};

export default onSuccess;
