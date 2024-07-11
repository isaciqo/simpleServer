exports.createUser = async ({ email, name, role, senha }) => {
    try {
      const hashedPassword = await userService.hashPassword(senha);

      await sendEmailService.sendMail({ email, name, role, senha })
      return await userService.createUser({ email, name, role, senha: hashedPassword });
    } catch (error) {
      throw error;
    }
};