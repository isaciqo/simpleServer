class RequestReset {
    constructor({ requestResetService }) {
        this.requestResetService = requestResetService;
    }

    async requestReset({ email }) {
        try {
            return await this.requestResetService.requestReset({ email });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RequestReset;