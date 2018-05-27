pragma solidity ^0.4.2;

contract Election {

  //Model a candidate
  struct Candidate {
    uint uid;
    string name;
    uint voteCount;
  }

  //store accounts that has voted
  mapping (address => bool) public voters;

  // Store a candidate
  //Fetch candidate
  mapping (uint => Candidate) public candidates;
  //Store candidates count
  uint public candidatesCount;

  //voted event
  event votedEvent(uint indexed _candidateId);

  constructor() public {
    addCandidate('Candidate 1');
    addCandidate('Candidate 2');
  }

  function addCandidate (string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote (uint _candidateId) public {
    //require that they haven't voted before
    require(!voters[msg.sender]);

    //require for a valid candidate
    require(_candidateId > 0 && _candidateId <= candidatesCount);

    //record that voter has voted
    voters[msg.sender] = true;

    //update candidate vote count
    candidates[_candidateId].voteCount ++;

    //trigger vote event
    emit votedEvent(_candidateId);
  }
}
