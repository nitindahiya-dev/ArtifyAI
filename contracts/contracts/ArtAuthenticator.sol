// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title ArtAuthenticator (ArtifyAi) - simple ERC721 storing provenance + AI report signature
/// @author ArtifyAi
/// @notice Stores IPFS CID and AI report metadata on mint. Optionally verifies server signatures.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtAuthenticator is ERC721, Ownable, Pausable {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    Counters.Counter private _tokenIdCounter;

    /// @dev Provenance struct stored for each token
    struct Provenance {
        string ipfsCid;       // IPFS directory CID containing image + report.json
        uint256 timestamp;    // block timestamp when minted
        address uploader;     // address that minted (owner of the minted token)
        uint8 aiScore;        // AI authenticity/confidence score (0-100)
        bytes signature;      // server signature bytes (Ethereum signed message)
        address signer;       // recovered signer address (who signed the report)
    }

    /// tokenId => provenance
    mapping(uint256 => Provenance) public provenance;

    /// Trusted signer address for verifying server reports (can be 0 for "not set")
    address public trustedSigner;

    /// If true, mintWithReport requires that signature recovers trustedSigner
    bool public requireVerifiedSignature = false;

    /// Events
    event Minted(uint256 indexed tokenId, address indexed minter, string ipfsCid, uint8 score, address signer);
    event TrustedSignerUpdated(address indexed newSigner);
    event RequireVerifiedSignatureUpdated(bool required);
    event AttestationAdded(uint256 indexed tokenId, address indexed attester, bool authentic, string note);

    constructor(address _trustedSigner) ERC721("ArtifyAi", "ARTFY") {
        trustedSigner = _trustedSigner;
    }

    /// @notice Set the trusted signer address (owner only)
    function setTrustedSigner(address _trustedSigner) external onlyOwner {
        trustedSigner = _trustedSigner;
        emit TrustedSignerUpdated(_trustedSigner);
    }

    /// @notice Toggle whether signature verification is required to mint
    function setRequireVerifiedSignature(bool _require) external onlyOwner {
        requireVerifiedSignature = _require;
        emit RequireVerifiedSignatureUpdated(_require);
    }

    /// @notice Pause minting and other state-changing actions
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Mint an NFT with an IPFS CID and AI report signature
    /// @dev The signature should be an Ethereum personal signature over keccak256(abi.encodePacked(cid, score, uploader))
    ///      i.e. the server should sign: keccak256(abi.encodePacked(cid, score, uploaderAddress))
    ///      and produce an Ethereum personal signature (eth_sign / personal_sign / web3.eth.accounts.sign).
    /// @param to recipient address (uploader)
    /// @param cid IPFS CID (string) where image + report.json are stored
    /// @param score AI score 0-100 (uint8)
    /// @param sig signature bytes produced by the AI/report service
    function mintWithReport(address to, string calldata cid, uint8 score, bytes calldata sig)
        external
        payable
        whenNotPaused
        returns (uint256)
    {
        require(to != address(0), "invalid to");

        // Recover signer from the provided signature based on the canonical message
        address recovered = _recoverSigner(cid, score, to, sig);

        if (requireVerifiedSignature) {
            require(trustedSigner != address(0), "trusted signer not set");
            require(recovered == trustedSigner, "signature not from trusted signer");
        }

        // mint
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);

        // store provenance
        provenance[tokenId] = Provenance({
            ipfsCid: cid,
            timestamp: block.timestamp,
            uploader: to,
            aiScore: score,
            signature: sig,
            signer: recovered
        });

        emit Minted(tokenId, to, cid, score, recovered);
        return tokenId;
    }

    /// @notice Simple attest function to let users add an on-chain attestation
    /// @dev currently just emits an event (no staking / reputation). Extend as needed.
    function attest(uint256 tokenId, bool authentic, string calldata note) external whenNotPaused {
        require(_exists(tokenId), "token does not exist");
        emit AttestationAdded(tokenId, msg.sender, authentic, note);
    }

    /// @dev Internal helper to recover signer from signature (assumes server signed the canonical message)
    function _recoverSigner(string calldata cid, uint8 score, address uploader, bytes calldata sig) internal pure returns (address) {
        // canonical payload: keccak256(abi.encodePacked(cid, score, uploader))
        bytes32 payloadHash = keccak256(abi.encodePacked(cid, score, uploader));
        // Apply the Ethereum Signed Message prefix
        bytes32 ethMessageHash = payloadHash.toEthSignedMessageHash();
        return ethMessageHash.recover(sig);
    }

    /// @notice Get provenance for token
    function getProvenance(uint256 tokenId) external view returns (Provenance memory) {
        require(_exists(tokenId), "token does not exist");
        return provenance[tokenId];
    }

    /// @notice Override _baseURI if you want IPFS gateway as base
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://";
    }
}
