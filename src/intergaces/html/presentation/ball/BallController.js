class BallController {
    constructor({ ballOperation }) {
      this.ballOperation = ballOperation;
    }
  
    async getBall(req, res) {
      try {
        const result = await this.ballOperation.getBall();
        res.json({ message: result });
      } catch (error) {
        console.error('Error in getBall:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  module.exports = BallController;