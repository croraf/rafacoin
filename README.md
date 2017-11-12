# rafacoin
My altcoin (inspired by bitcoin)

To test:

  1. Prerequisites: node.js >8 and npm >5 installed and added to path.

  2. Clone repository, 
  
  3. In project's root directory run 'npm install'
  
  4. In project's root directory run 'npm run dev' which will compile and run the project and also wait for code changes to recompile and rerun.
  
  
  
Current functionality:

  1. Creates several transactions and adds them to transaction's pool.
  
  2. Starts mining block after block (M times) including highest fee's transaction in each iteration,
  finds the satisfying nonce and adds the block to the end of the blockchain.
