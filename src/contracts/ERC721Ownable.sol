// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+opensource@gmail.com
// Website: https://ethberry.io/

pragma solidity ^0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Ownable is Ownable, ERC721Burnable {
  constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(_msgSender()) {}

  function mint(address to, uint256 tokenId) public virtual onlyOwner {
    _mint(to, tokenId);
  }

  function safeMint(address to, uint256 tokenId) public virtual onlyOwner {
    _safeMint(to, tokenId);
  }
}
