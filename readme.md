## Commands to RUN
```sh
npm install
npm start
```
Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

## Problem

You are to create a simple React App that displays result from a twitter search
api. This must consist of a search input to search for tweets and a view to show tweets with some form of pagination/infinite scroll. 

### Default View

```
---------------------------
      Search Tweets
---------------------------



        Welcome



---------------------------
```

### Search View

```
---------------------------
  #tomato
---------------------------
tweet 1
tweet 2
tweet 3
...
---------------------------
```

### Tweet component

```
---------------------------
        @user
  PIC   Rich media text
        date
---------------------------
```

We expect some basic styling to help with the presentation of App.

### Requirements

* You may NOT use any other library than React, and optionally redux.
* Search should show results without the need to press enter.
* Search be optimized to make api calls conservatively.
* Tweet should handle rich media text appropriately.
  * #hashtags should be distinctly noticable.
  * url links should be open in new tab.
  * you don't need to implement url link preview.
  * bold, italics, highlighted, underlined text should be handled.

### BONUS

* Infinite scroll.
* Refreshing the page should not lose results.
* Notify user when he/she is offline. Basic offline-first capabilities.
* Unit Tests.
