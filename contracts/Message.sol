
pragma solidity >=0.4.21 <0.6.0;

contract  Message {


    address public owner;
    string public s;
    uint public price  = 0;
    mapping (address => uint) balance;

    constructor (string memory _s, uint initial_balance) public {
    balance[msg.sender] = initial_balance;
        owner = msg.sender;
        s = _s;
    }

    function set (string memory _mess) public payable {
        s = _mess;
        price  = msg.value;
        owner = msg.sender;
    }

    function get () public view returns (string memory) {
        return (s);
    }

	function get_balance(address who) public view returns (uint val) {
  return (balance[who]);

  }
}