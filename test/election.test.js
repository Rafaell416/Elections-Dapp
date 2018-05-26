let Election = artifacts.require('Election.sol')

contract('Election', () => {
  let electionInstance

  it('initializes with 2 candidates', () => {
    return Election.deployed()
      .then(instance => instance.candidatesCount())
      .then(count => assert.equal(count, 2))
  })

  it('initializes the contract with correct values', () => {
    return Election.deployed()
      .then(instance => {
        electionInstance = instance
        return electionInstance.candidates(1)
      })
      .then(candidate => {
        assert.equal(candidate[0], 1, 'Contains the correct id')
        assert.equal(candidate[1], 'Candidate 1', 'Contains the correct name')
        assert.equal(candidate[2], 0, 'Contains the correct amount of votes')
        return electionInstance.candidates(2)
      })
      .then(candidate => {
        assert.equal(candidate[0], 2, 'Contains the correct id')
        assert.equal(candidate[1], 'Candidate 2', 'Contains the correct name')
        assert.equal(candidate[2], 0, 'Contains the correct amount of votes')
      })
  })
})
