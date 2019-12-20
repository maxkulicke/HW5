# HW5
Day Planner

I made this way too complicated. I believe that I satisfied the criteria of the assignment, but in my effort to take this project to a higher level, I think I ended up biting off more than i could chew. a few outstanding issues that I would have preferred to resolve:

- i wanted to avoid hardcoding my hour block cards in the HTML. i have written functions to generate them dynamically, and i'm mostly there, they just aren't nesting the divs properly and I won't have time to sort it out.
- the clock loads way too slowly at the top of the page, and makes for a jerky launch of the page. i really don't like that. haven't figured out how to resolve that.
- i wanted every list item (event) to be individually removable. this was a lower priority for me, but a perfect version of this site would have that functionality.
- i simply could not figure out how to empty the text of the modal event input form. i have a bunch of javascript that should do it, but it doesn't quite. it's driving me crazy.

a few overarching goals for this assignment:

functions:
- concentrate on small, clean and clear functions, even if it means a lot of them. shooting for nothing longer than 10-12(ish) lines
- using function returns as arguments, eliminating variable creation as much as possible
- treating each iteration as its own function (as much as possible)

front end:
- hard code as little of the front end as possible. make it super reactive on the back end, and try to make almost anything "specific" (ie, date, time, hrs, events, etc) visually generatef by the back end.

UX:
- i built the day planner i would want, or at least tried to. tried to pay attention to little detail things that would hopefully shape and direct a real user
- tried to eliminate the possibility of unexpected or unwanted behaviors/actions (adding empty list events, accidentally clearing the day and it's data) 
- tried to focus on little things that would help with an actual calendar (it should visually update without needing refresh, should change states on the hour, etc)

observations/comments:
in my effort to make a more interactive, robust, and usable day planner than the assignment specified, while trying to execute while observing a few self imposed goals/guidelines/restrictions, i feel like i learned a lot. While the short and discrete function method is really appealing, and very intuitive to me, i think i approached a certain limit in my ability to trace all the paths properly within a single file. particularly when certain higher order functions have a sort of lightning bolt pathway, where one call to a higher order function results in maybe 3 lower level calls, which each result in 4 more even lower level calls, it was wasy for me to lose track of what one function revision would do to all the calls it sees. I had issues with this particularly regarding storage and loading, and visual displays.

I used a data/variable structure for this assignment that also seems to have pros and cons. my basic idea was:
  - have a local array (day[]) of objects (hour) that can be acted and changed in multiple ways
  - have a storage array that will always represent the most up to date version of all the hour objects.
  - the local array would be used to push changes to storage
  - the storage array would be used to ensure that the most recent saved version of the array was being used in the local array.

while it seems overly complicated, it actually seemed necessary if I was going to be able to have the events modal interactive and responsive in the way that I wanted it to be from a user's perspective. It seemed important to be able to add and view multiple events in real time, and then not have them committed to local storage if it was unwanted.

the cons to this approach are again, it was easy to confuse which was being used where, and when a push to or pull from storage might actually disrupt the functionality, or cause unforeseen errors.