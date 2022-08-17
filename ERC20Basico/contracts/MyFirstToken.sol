// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyFirstToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * (10**decimals()));
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

// Indica que vamos a crear 10,000 tokens
// No podemos poner directo 10,000 ya que esto no crea tal cantidad de tokens
// Esto debido openZeppelin utiliza 18 decimales
// 10_000 * (10 ** decimals())

// Podemos sobreescribir la función decimals
// Esto permite fraccionar el token

// Si la base es 6 decimales significa que voy a tener y le digo que voy a tener 10,000 tokens
// Esto significa que voy a tener 10 tokens pero puedo transaccionar en fracciones
// Voy a tener 10,000 * (10 ** 6) fracciones, esto es 10,000,000,000
