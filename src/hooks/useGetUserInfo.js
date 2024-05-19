export const useGetUserInfo = () =>{
  const {name, profilePhoto, userId, isAUth} = JSON.parse(localStorage.getItem("auth"));
  return { name, profilePhoto, userId, isAUth}
}
