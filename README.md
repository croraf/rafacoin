# rafacoin
My altcoin (inspired by bitcoin)

To test:

  1. Prerequisites: node.js >8 and npm >5 installed and added to path.

  2. Clone repository, 
  
  3. In frontend and backend directories run 'npm install'
  
  4. Open two terminals and in each run 'npm run dev' which will compile and run the project and also wait for code changes to recompile and rerun.

  5. UI is available at 'localhost:8100'
  
  
Current functionality:

  1. UI manager which can create transactions, fetch unconfirmed transactions, start mining process (6 cycles), and fetch the blockchain.

  2. Mining selects current unconfirmed transactions by fee (2 at most).

  3. TODO: Create real transactions (inputs linked to unspent outputs), p2p functionality
