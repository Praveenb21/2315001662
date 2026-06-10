Notification System Design

Priority Logic

Placement > Result > Event

Weights:

Placement = 3
Result = 2
Event = 1

Priority Formula

score = weight × constant + timestamp

Recent notifications get higher priority within the same category.

Top 10 Notifications

Notifications are sorted by score and top 10 are displayed.

For real-time systems, a Min Heap of size 10 can maintain top notifications efficiently.

Time Complexity:

Insert: O(log N)
Fetch Top N: O(N)

Logging Middleware

Every request is logged with timestamp, HTTP method, and URL.
