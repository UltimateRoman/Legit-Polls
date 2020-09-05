pragma solidity ^0.5.0;

contract Legitpolls {
    uint public pCount=0;
    mapping(uint => Poll) public polls;

    struct Poll {
        uint id;
        address creator;
        string title;
        string option1;
        string option2;
        uint votes1;
        uint votes2;
        string detailsfile;
    }

    event pollCreated(
        uint id,
        address creator,
        string title,
        string option1,
        string option2,
        uint votes1,
        uint votes2,
        string detailsfile
    );

    event pollVoted(
        uint id
    );
 
    function createPoll(string memory _title, string memory _option1, string memory _option2, string memory _detailsfile) public {
        require(bytes(_title).length > 0);
        pCount++;        
        polls[pCount] = Poll(pCount, msg.sender, _title, _option1, _option2, 0, 0, _detailsfile);
        emit pollCreated(pCount, msg.sender, _title, _option1, _option2, 0, 0, _detailsfile);
    }

    function votePoll(uint _id, uint _option) public {
        require(_id > 0 && _id <= pCount);
        Poll memory _p = polls[_id];
        require(_option == 1 || _option == 2);
        if(_option==2){
            _p.votes1++;
        }
        if(_option==2){
            _p.votes2++;
        }
        polls[_id] = _p;
        
    }
}
