const Message = artifacts.require('./Message.sol')

contract('Message', (accounts) => {
    before(async() => {
        this.Message = await Message.deployed("yoyoyoyooyoyoyo", 10)
    })

    it('deploys successfully', async() => {
        const address = await this.Message.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })


    it('Set Function work well', async() => {
        const Message = await this.Message.set("Message Contract")
        const Hello = await this.Message.s()
        assert.equal(Hello, "Message Contract")
    })
    it('Get Function work well', async() => {
        const Message = await this.Message.set("Message Contract")
        const Hello = await this.Message.get()
        assert.equal(Hello, "Message Contract")
    })


})