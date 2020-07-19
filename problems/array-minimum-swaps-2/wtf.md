First I thought it's the number of swaps that's important and did the **recursive version** obviously, which died with a timeout on HackerRank's server (but it clearly proves the minimum amount of steps needed).

Then I opened the comments section and saw tons of comments related to misunderstanding (?) the description and/or having timeouts.

So I sat down with a pen and a paper, did the math, implemented it and returned the swap count as a sideffect (this method does **NOT** prove the number of swaps).

Funny thing is that even without recursion the code timed out, until I optimized the hell out of it (no destructuring, no `forEach`, not even `for` etc.), but at this point I feel a burning hatred towards whoever wrote this question and whoever set the timeout range for HackerRank's node runner.

**Damn you, HackerRank.**
