/**
 * Método que realiza la petición HTTP loguear un usuario admin
 * @param {user} user - Username del usuario admin
 * @param {password} password - password del usuario admin
 * @Return True o False
 */
export const loginAuthentication = async (data) => {

  var response = false;

  if (data.get('username') === 'admin' && data.get('password') === "1234") {
    response = true;
  }

  return response;
};
