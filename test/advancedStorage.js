const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
    let advancedStorage = null;
    
    before('should add an element to array', async () => {
        advancedStorage = await AdvancedStorage.deployed();
    });

    it('should add an element to array', async () => {
        await advancedStorage.add(10);
        const result = await advancedStorage.arrayStorage(0);
        assert(result.toNumber() === 10);
    });

    it('should get an element of the array', async () => {
        await advancedStorage.add(20);
        const result = await advancedStorage.arrayStorage(1);
        assert(result.toNumber() === 20);
    });

    it('should get the whole array', async () => {
        const array = await advancedStorage.getAll();
        const ids = array.map(id => id.toNumber());
        assert.deepEqual(ids, [10, 20]);
    });

    it('should get the length of array', async () => {
        const length = await advancedStorage.storageLength();
        assert(length.toNumber() === 2);
    });
});