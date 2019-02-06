import bcrypt from 'bcrypt';


const hashPwd = async (pwd) => {
  try {
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(pwd, salt);
  } catch (e) {
    throw e;
  }
};

const comparePwd = async (pwd, hshPwd) => {
  try {
    const response = await bcrypt.compare(pwd, hshPwd);
    return response;
  } catch (e) {
    throw e;
  }
};

export { hashPwd, comparePwd };
