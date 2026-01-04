import bcrypt from 'bcryptjs';

export const generatePassword = () => {
    var length = 6;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#*$";
    let retVal: string = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const createPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(String(password), saltRounds);
    return hashedPassword
}