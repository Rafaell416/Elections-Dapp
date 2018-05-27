let Election = artifacts.require('Election.sol')

contract('Election', (accounts) => {
  let electionInstance
  let candidateId

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

  it('allows a voter to cast a vote', () => {
    return Election.deployed()
    .then(instance => {
      electionInstance = instance
      candidateId = 1
      return electionInstance.vote(candidateId, { from: accounts[0] })
    })
    .then(receipt => electionInstance.voters(accounts[0]))
    .then(voted => {
      assert(voted, 'the voter was marked as voted')
      return electionInstance.candidates(candidateId)
    })
    .then(candidate => {
      let voteCount = candidate[2]
      assert.equal(voteCount, 1, 'increments the candidates vote count')
    })
  })

  it("throws an exception for invalid candiates", () => {
    return Election.deployed()
    .then((instance) => {
      electionInstance = instance
      return electionInstance.vote(99, { from: accounts[1] })
    })
    .then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert")
      return electionInstance.candidates(1)
    })
    .then((candidate1) => {
      let voteCount = candidate1[2]
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes")
      return electionInstance.candidates(2)
    })
    .then((candidate2) => {
      let voteCount = candidate2[2]
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes")
    })
  })

  it("throws an exception for double voting", () => {
    return Election.deployed()
    .then((instance) => {
      electionInstance = instance
      candidateId = 2
      electionInstance.vote(candidateId, { from: accounts[1] })
      return electionInstance.candidates(candidateId)
    })
    .then((candidate) => {
      let voteCount = candidate[2]
      assert.equal(voteCount, 1, "accepts first vote")
      // Try to vote again
      return electionInstance.vote(candidateId, { from: accounts[1] })
    })
    .then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert")
      return electionInstance.candidates(1)
    })
    .then((candidate1) => {
      let voteCount = candidate1[2]
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes")
      return electionInstance.candidates(2)
    })
    .then((candidate2) => {
      let voteCount = candidate2[2]
      assert.equal(voteCount, 1, "candidate 2 did not receive any votes")
    })
  })
})
