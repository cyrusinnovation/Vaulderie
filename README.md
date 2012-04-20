Vaulderie
=========

A webapp to make group Vaulderie less painful in LARPs

Requirements for development:
=============================
cd Vaulderie
npm install sinon # That's right, not npm install -g

----

Everyone puts in:

    Alpha: 7 traits
    Starting rating: NA/Alpha   2/beta   2/Charlie   1/delta   8/echo

    Beta: 6
    Starting rating: 3/Alpha   NA/beta   1/Charlie   1/delta   9/echo

    Charlie : 5
    Starting rating: 5/Alpha   6/beta   NA/Charlie   2/delta   7/echo

    Delta: 5
    Starting rating: 8/Alpha   7/beta    6/Charlie   NA/delta   9/echo

    Echo: 5
    Starting rating: 6/Alpha   5/beta   5/Charlie   1/delta   NA/echo

All these values are added up

    7+6+5+5+5=28 traits in all
    
Everyone takes out what they put in randomly

    (7) Alpha takes 7. 1 of his own, 2 from beta, 3 from Charlie, 0 from Delta and 1 from echo
    (6)Beta takes 6. 3 from alpha, 0 from beta, 0 from Charlie, 0 delta and 1 from echo
    (5)Charlie takes 5. 0 from alpha, 0 from Beta, 1 from Charlie. 3 delta and 1 from echo
    (5)Delta takes 5. 2 from alpha, 1 from beta, 1 from Charlie, 0 from delta and 1 from echo
    (5)Echo takes 5. 1 from alpha, 3 from beta, 0 from Charlie, 2 from delta and 1 from echo
    
Now is the hard part,
Each player must test against a each other to see if there rating go up.
Now let’s break down the results for Alpha:

    pulled one of his own traits which does nothing
    2 of beta’s traits vs his current rating of 2.
        1/3 chance for his rating to go up(loss)
        1/3 to stay the same (tie) rating =traits
        1/3 to have a chance to go down (win). If the chance to go down is pulled he has a 1/3 chance (win) of going down and a 2/3 chance to stay the same(tie or loss). 
    3 Charlie traits vs his current rating 2.
        2/3 or the rating going up(loss or tie) rating <traits
        1/3 to have a chance to go down (win). If the chance to go down is pulled he has a 1/3 chance (win) of going down and a 2/3 chance to stay the same(tie or loss).
    0 from delta, no change in rating
    1 of echos vs his rating of 8.
        1/3 or the rating going up(loss)
        1/3 of it staying the same (tie) rating >traits
        1/3 to have a chance to go down (win). If the chance to go down is pulled he has a 1/3 chance (win) of going down and a 2/3 chance to stay the same (tie or loss).

This process is repeated for each member
