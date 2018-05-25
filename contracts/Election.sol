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

  constructor() {

  }
}
