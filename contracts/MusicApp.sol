//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MusicApp {
    enum State {
        Purchased,
        Rejected,
        Pending
    }

    struct Music {
        uint256 id;
        uint256 musicID;
        uint256 price;
        bytes32 proof;
        address owner;
        address author;
        State state;
    }

    // mapping of musicHash to Music data
    mapping(bytes32 => Music) private ownedMusic;

    // mapping of musicID to MusicHash
    mapping(uint256 => bytes32) private ownedMusicHash;

    uint256 private totalOwnedMusic;

    address payable public owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Music has already a Owner!
    error MusicHasOwner();

    /// Music proof not Matched
    error MusicNotMatch();

    /// Only owner has access!
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    event Sent(address from, address to, uint256 amount);

    function purchaseMusic(
        bytes16 musicID,
        uint256 musID,
        bytes32 proof,
        address musician,
        address payable toReceiver
    ) external payable {
        //proof = 0x0000000000000000000000000000313000000000000000000000000000003130
        // Music id = 10
        // 0x00000000000000000000000000003130
        // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

        // 000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4
        //keccak256 = 0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37

        bytes32 musicHash = keccak256(abi.encodePacked(musicID, msg.sender));

        if (hasMusicOwnership(musicHash)) {
            ownedMusic[musicHash].state = State.Purchased;

            uint256 priceToArtist = msg.value - ((msg.value * 5) / 100);

            uint256 priceToStake = ((msg.value * 5) / 100);

            (bool sent, ) = toReceiver.call{value: priceToArtist}(" ");
            (bool sent2, ) = owner.call{value: priceToStake}(" ");

            require(sent, " Failed to send Ether");
            require(sent2, " Failed to send Ether");
        } else {
            uint256 id = totalOwnedMusic++;

            ownedMusicHash[id] = musicHash;


            ownedMusic[musicHash] = Music({
                id: id,
                musicID: musID,
                price: msg.value,
                proof : proof,
                owner: msg.sender,
                author: musician,
                state: State.Purchased
            });

            uint256 priceToArtist = msg.value - ((msg.value * 5) / 100);

            uint256 priceToStake = ((msg.value * 5) / 100);

            (bool sent, ) = toReceiver.call{value: priceToArtist}(" ");
            (bool sent2, ) = owner.call{value: priceToStake}(" ");

            require(sent, " Failed to send Ether");
            require(sent2, " Failed to send Ether");
        }
    }

    function makeOffer(
        bytes16 musicID,
        uint256 musID,
        bytes32 proof,
        address musician,
        address payable toReceiver
    ) external payable {
        bytes32 musicHash = keccak256(abi.encodePacked(musicID, msg.sender));

        if (hasMusicOwnership(musicHash)) {
            ownedMusic[musicHash].state = State.Pending;

            (bool sent, ) = toReceiver.call{value: msg.value}(" ");

            require(sent, " Failed to send Ether");
        } else {
            uint256 id = totalOwnedMusic++;

            ownedMusicHash[id] = musicHash;

            ownedMusic[musicHash] = Music({
                id: id,
                musicID: musID,
                price: msg.value,
                proof: proof,
                owner: msg.sender,
                author: musician,
                state: State.Pending
            });

            (bool sent, ) = toReceiver.call{value: msg.value}(" ");

            require(sent, " Failed to send Ether");
        }
    }

    function acceptOffer(bytes32 musicHash, address payable toReceive)
        external
        payable
    {
        if (hasMusicOfferOwnership(musicHash, toReceive)) {
            ownedMusic[musicHash].state = State.Purchased;

            uint256 priceToStake = ((ownedMusic[musicHash].price * 5) / 100);

            (bool sent, ) = owner.call{value: priceToStake}(" ");

            require(sent, " Failed to send Ether");
        } else {
            revert MusicNotMatch();
        }
    }

    function rejectOffer(bytes32 musicHash, address payable toReceive)
        external
        payable
    {
        if (hasMusicOfferOwnership(musicHash, toReceive)) {
            ownedMusic[musicHash].state = State.Rejected;

            uint256 refundPrice = ownedMusic[musicHash].price;

            (bool sent, ) = toReceive.call{value: refundPrice}(" ");

            require(sent, " Failed to send Ether");
        } else {
            revert MusicNotMatch();
        }
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getMusicCount() external view returns (uint256) {
        return totalOwnedMusic;
    }

    function getMusicAtIndex(uint256 index) external view returns (bytes32) {
        return ownedMusicHash[index];
    }

    function getMusicByHash(bytes32 musicHash)
        external
        view
        returns (Music memory)
    {
        return ownedMusic[musicHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function hasMusicOwnership(bytes32 musicHash) private view returns (bool) {
        return ownedMusic[musicHash].owner == msg.sender;
    }

    function hasMusicOfferOwnership(bytes32 musicHash, address buyer)
        private
        view
        returns (bool)
    {
        return ownedMusic[musicHash].owner == buyer;
    }
}
