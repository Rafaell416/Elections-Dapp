let Election = artifacts.require('Election.sol')

contract('Election', () => {
  it('initializes with 2 candidates', () => {
    return Election.deployed()
      .then(instance => instance.candidatesCount())
      .then(count => assert.equal(count, 2))
  })
})
