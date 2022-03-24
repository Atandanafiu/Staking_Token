contract("BGTStaking", (accounts) => {
    let bgtStaking;
    const tokenNum = BigNumber(10).pow(18).multipliedBy(1000);
    const owner = accounts[0];
    const user = accounts[1];

    before(async () => {
        bgtStaking = await BGTStaking.deployed();
    });

    
    describe('Staking', () => {
        beforeEach(async () => {
            bgtStaking = await BGTStaking.new(
                owner,
                manyTokens.toString(10)
            );
        });
    });


    it('createStake creates a stake.', async () => {
        await bgtStaking.transfer(user, 3, { from: owner });
        await bgtStaking.createStake(1, { from: user });

        assert.equal(await bgtStaking.balanceOf(user), 2);
        assert.equal(await bgtStaking.stakeOf(user), 1);
        assert.equal(
            await bgtStaking.totalSupply(), 
            manyTokens.minus(1).toString(10),
        );
        assert.equal(await bgtStaking.totalStakes(), 1);
    });

    it('rewards are distributed.', async () => {
        await bgtStaking.transfer(user, 100, { from: owner });
        await bgtStaking.createStake(100, { from: user });
        await bgtStaking.distributeRewards({ from: owner });
       
        assert.equal(await bgtStaking.rewardOf(user), 1);
        assert.equal(await bgtStaking.totalRewards(), 1);
    });

    it('rewards can be withdrawn.', async () => {
        await bgtStaking.transfer(user, 100, { from: owner });
        await bgtStaking.createStake(100, { from: user });
        await bgtStaking.distributeRewards({ from: owner });
        await bgtStaking.withdrawReward({ from: user });
       
        const initialSupply = manyTokens;
        const existingStakes = 100;
        const mintedAndWithdrawn = 1;

        assert.equal(await bgtStaking.balanceOf(user), 1);
        assert.equal(await bgtStaking.stakeOf(user), 100);
        assert.equal(await bgtStaking.rewardOf(user), 0);
        assert.equal(
            await bgtStaking.totalSupply(),
            initialSupply
                .minus(existingStakes)
                .plus(mintedAndWithdrawn)
                .toString(10)
            );
        assert.equal(await bgtStaking.totalStakes(), 100);
        assert.equal(await bgtStaking.totalRewards(), 0);
    });

    
});
