---
name: ponytail-review
description: Quality review of a change: is the logic right, is it safe, does it hold under real load, is risky code tested, is it fast enough, and is every line needed. Reads the connected code, not only the diff. Each finding is explained in plain English. Use for "review this", "code review", "review the last commit", "review my PR", "is this over-engineered", /ponytail-review.
---

Review the change with ponytail level FULL rules (see the active ponytail ruleset).

Scope: the uncommitted diff by default; honor a target in plain words (`staged`, `branch`, a PR link).

Read the code the change touches, not only the diff: callers, exports, tests, fixtures, config.

For each finding, in plain English: what the code does, what goes wrong, the fix, and what happens if skipped. Rank: must fix, should fix, nice to have.

Check: bugs, security at trust boundaries, behavior under real load, risky logic without a test, slow paths, and what to cut (over-engineering, dead code, unneeded options).

End with what you did not check. Change nothing.
