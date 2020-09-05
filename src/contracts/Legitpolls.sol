pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Legitpolls {
    uint public pCount=0;
    mapping(uint => Poll) public polls;

    struct Poll {
        uint id;
        uint noofOptions;
        address creator;
        string title;
        string[4] options;
        uint[4] votes;
        string detailsfile;
    }

    event pollCreated(
        uint id,
        uint noofOptions,
        address creator,
        string title
    );

    event pollVoted(
        uint id
    );
 
    function createPoll(uint _noofOptions, string memory _title, string[] memory _options, string memory _detailsfile) public {
        require(_noofOptions>=1 && _noofOptions <= 4);
        require(bytes(_title).length > 0);
        pCount++;        
        Poll memory _p = polls[pCount];
        _p.id=pCount;
        _p.noofOptions=_noofOptions;
        _p.creator=msg.sender;
        _p.title=_title;
        for(uint i=0; i<_noofOptions; ++i) {
            _p.options[i]=_options[i];
            _p.votes[i]=0;
        }
        _p.detailsfile=_detailsfile;
        polls[pCount] = _p;
        emit pollCreated(pCount, _noofOptions, msg.sender, _title);
    }

    function votePoll(uint _id, uint _option) public {
        require(_id > 0 && _id <= pCount);
        Poll memory _p = polls[pCount];
        require(_option >= 1 && _option <=_p.noofOptions);
        _p.votes[_option-1]++;
        polls[pCount] = _p;
        emit pollVoted(_id);
    }
}
