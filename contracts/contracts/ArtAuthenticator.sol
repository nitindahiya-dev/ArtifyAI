// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ArtAuthenticator is ERC721, Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address public trustedSigner;
    uint256 private _tokenIdCounter;

    struct ArtMetadata {
        string ipfsCid;
        uint256 authenticityScore;
        uint256 timestamp;
    }

    mapping(uint256 => ArtMetadata) public artMetadata;

    event ArtMinted(uint256 indexed tokenId, address indexed owner, string ipfsCid, uint256 authenticityScore);

    constructor(address _trustedSigner) ERC721("ArtifyAI", "ARTAI") Ownable(msg.sender) {
        trustedSigner = _trustedSigner;
        _tokenIdCounter = 0;
    }

    function mintArt(
        address to,
        string memory ipfsCid,
        uint256 authenticityScore,
        bytes memory signature
    ) public {
        bytes32 messageHash = keccak256(abi.encodePacked(to, ipfsCid, authenticityScore));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        require(ethSignedMessageHash.recover(signature) == trustedSigner, "Invalid signature");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        _safeMint(to, tokenId);
        artMetadata[tokenId] = ArtMetadata({
            ipfsCid: ipfsCid,
            authenticityScore: authenticityScore,
            timestamp: block.timestamp
        });

        emit ArtMinted(tokenId, to, ipfsCid, authenticityScore);
    }

    function setTrustedSigner(address newSigner) external onlyOwner {
        trustedSigner = newSigner;
    }

    function getTokenMetadata(uint256 tokenId) external view returns (ArtMetadata memory) {
        return artMetadata[tokenId];
    }
}