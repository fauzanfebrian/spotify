module.exports = class CacheHandler {
    constructor(options) {
        this.options = options
    }

    async get(_key) {
        // This could be stored anywhere, like durable storage
        return null
    }

    async set(_key, _data, _ctx) {}

    async revalidateTag(_tag) {}
}
