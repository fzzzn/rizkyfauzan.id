---
name: ponytail-audit
description: Quality audit of a whole repo: bugs, security holes, what breaks under real load, risky code without tests, slow paths, and what to delete, merge or split. Ranked, each finding explained in plain English. One-shot report, changes nothing. Use for "audit this codebase", "review the whole repo", "find bloat", "what can I delete", /ponytail-audit.
---

Audit the whole repo with ponytail level FULL priorities.

First map it: entry points, how data moves, expected load. Then rank findings: what to fix first.

For each finding, in plain English: what the code does, what goes wrong, the fix, and what happens if skipped.

Cover: bugs, security at trust boundaries, behavior under real load, risky logic without a test, slow paths, and bloat to delete, merge or split.

End with the verdict (fix this first) and what you did not check. Change nothing.
