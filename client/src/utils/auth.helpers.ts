const onSuccess = async (
  response: any,
  dispatch: any,
  githubSignIn: any,
  setError: any,
  registerUserGithub: any,
  completeAuthentication: any,
  getGithubProfile: any
) => {
  try {
    const {
      avatar_url,
      email,
      gists_url,
      html_url,
      location,
      name,
    } = await githubSignIn(response.code)
      .then((res: any) => res)
      .catch((error: any) => setError(error));

    registerUserGithub({
      avatar_url,
      email,
      gists_url,
      html_url,
      location,
      name,
    }).then((res: any) => {
      completeAuthentication(res.data);
      getGithubProfile(res.data).then((res: any) => {
        dispatch({ type: "user", payload: res.data });
      });
      dispatch({ type: "isAuthWithGithub", payload: true });
    });
  } catch (error: any) {
    setError(error);
  }
};

export default onSuccess;
