class UpdateSchedulesJoined {
    constructor({ updateSchedulesJoinedService, getCalendarService }) {
      this.updateSchedulesJoinedService = updateSchedulesJoinedService;
      this.getCalendarService = getCalendarService;
    }
  
    async updateSchedulesJoined({ id }) {
      try {
        const schedulesJoined = await this.getCalendarService.getCalendar({ id });
        return this.updateSchedulesJoinedService.updateSchedulesJoined({ id, schedulesJoined });
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = UpdateSchedulesJoined;