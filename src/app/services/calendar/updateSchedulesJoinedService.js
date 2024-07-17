const User = require('../../../database/models/user/userModel');

class UpdateSchedulesJoined {
  async updateSchedulesJoined({ id, schedulesJoined }) {
    try {
        console.log('id---------------', id)
        const user = await User.findOne({ user_id: id })
        console.log('schedulesJoined---------------', schedulesJoined)
      if (!user) {
        throw new Error('User not found');
      }

      user.schedulesJoined.push(schedulesJoined);

      const updatedUser = await user.save();

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UpdateSchedulesJoined;