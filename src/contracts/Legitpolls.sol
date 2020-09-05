pragma solidity ^0.5.0;

contract Pol {
    uint public noOfPolls=0;
    mapping(uint => Poll) public polls;

    struct Poll {
        uint id;
        uint noOfOptions;
        address author;
        string title;
        string description;
        bool active;
        string[4] optionDescription;
        uint[4] totalVotes;
        }
 
    function createPoll(uint _noOfOptions, string memory _title, string memory _description, string memory _optionDescription1,string memory _optionDescription2) public {
        require(_noOfOptions == 2);
        noOfPolls ++;        
        Poll storage p = polls[noOfPolls];
        p.id=noOfPolls;
        p.noOfOptions=_noOfOptions;
        p.author=msg.sender;
        p.title=_title;
        p.description=_description;
        p.active=true;
        p.optionDescription[0]=_optionDescription1;
        p.optionDescription[1]=_optionDescription2;
        p.totalVotes=[0,0];
    }
    function createPoll(uint _noOfOptions, string memory _title, string memory _description, string memory _optionDescription1,string memory _optionDescription2,string memory _optionDescription3) public {
        require(_noOfOptions == 3);
        noOfPolls ++;        
        Poll storage p = polls[noOfPolls];
        p.id=noOfPolls;
        p.noOfOptions=_noOfOptions;
        p.author=msg.sender;
        p.title=_title;
        p.description=_description;
        p.active=true; 
        p.optionDescription[0]=_optionDescription1;
        p.optionDescription[1]=_optionDescription2;
        p.optionDescription[2]=_optionDescription3;
        p.totalVotes=[0,0,0];
    }
    function createPoll(uint _noOfOptions, string memory _title, string memory _description, string memory _optionDescription1,string memory _optionDescription2,string memory _optionDescription3,string memory _optionDescription4) public {
        require(_noOfOptions == 4);
        noOfPolls ++;        
        Poll storage p = polls[noOfPolls];
        p.id=noOfPolls;
        p.noOfOptions=_noOfOptions;
        p.author=msg.sender;
        p.title=_title;
        p.description=_description;
        p.active=true;
        p.optionDescription[0]=_optionDescription1;
        p.optionDescription[1]=_optionDescription2;
        p.optionDescription[2]=_optionDescription3;
        p.optionDescription[3]=_optionDescription4;
        p.totalVotes=[0,0,0,0];
    }

}
