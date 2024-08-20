pragma solidity ^0.4.17;

contract Tracking {

    int public count;

    function Tracking(int initialCount) public {
        count = initialCount;
    }

    function addCount() public {
        count = count + 1;
    }

    function getCount() public view returns(int) {
        return count;
    }
}