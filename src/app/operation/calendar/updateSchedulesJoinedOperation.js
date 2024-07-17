class UpdateSchedulesJoined {
    constructor({ updateSchedulesJoinedService }) {
      this.updateSchedulesJoinedService = updateSchedulesJoinedService;
    }
  
    async updateSchedulesJoined({ id, schedulesJoined }) {
      try {
        return await this.updateSchedulesJoinedService.updateSchedulesJoined({ id, schedulesJoined });
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = UpdateSchedulesJoined;