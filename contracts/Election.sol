pragma solidity ^0.4.2;

contract Election {

  //Model a candidate
  struct Candidate {
    uint uid;
    string name;
    uint voteCount;
  }

  // Store a candidate
  //Fetch candidate
  mapping (uint => Candidate) public candidates;
  //Store candidates count
  uint public candidatesCount;

  constructor() {
    addCandidate('Candidate 1');
    addCandidate('Candidate 2');
  }

  function addCandidate (string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
}
