class GetUserOperation {
    constructor({ getUserService }) {
      this.getUserService = getUserService;
    }
  
    async getUser(user_id) {
      try {
        return await this.getUserService.getUser(user_id);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = GetUserOperation;