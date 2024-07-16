class BallOperation {
    constructor({ ballService, bananaService }) {
      this.ballService = ballService;
      this.bananaService = bananaService;
    }
  
    async getBall() {
      return this.bananaService.getBall();
    }
  }
  
module.exports = BallOperation;