diff --git a/crafty-maze/cell.js b/crafty-maze/cell.js
index 1a9502f..f4fb267 100644
--- a/crafty-maze/cell.js
+++ b/crafty-maze/cell.js
@@ -1,6 +1,6 @@
 (function (Crafty) {
     "use strict";
-    var wallWidth = 0.25,
+    var wallWidth = 0.5,
         radius = 16;
     // our Cell component. Consists of four walls, positional information, and
     // information needed for DFS
@@ -106,4 +106,4 @@
             this.drawNode('rgb(0, 0, 255)');
         }
     });
-}(Crafty));
+}(Crafty));
\ No newline at end of file
diff --git a/crafty-maze/index.html b/crafty-maze/index.php
similarity index 96%
rename from crafty-maze/index.html
rename to crafty-maze/index.php
index b51724f..fd85290 100644
--- a/crafty-maze/index.html
+++ b/crafty-maze/index.php
@@ -8,4 +8,4 @@
 </head>
 <body>
 </body>
-</html>
+</html>
\ No newline at end of file
diff --git a/crafty-maze/maze.js b/crafty-maze/maze.js
index 7d502a6..f2d9ba0 100644
--- a/crafty-maze/maze.js
+++ b/crafty-maze/maze.js
@@ -65,7 +65,6 @@ window.onload = function () {
 
     click = function () {
         // on click, use dfs to search our maze
-
         var stack = dfsSearch(startCell, this),
             neighbor;
         if (stack.length) {
@@ -78,15 +77,15 @@ window.onload = function () {
                 startCell = neighbor;
             }
         }
-
     };
     // build the grid for our DFS and rendering
     for (y = 0; y < yCount; y++) {
         // row information is used to assign neighbors
         currentRow = [];
         for (x = 0; x < xCount; x++) {
+            id = x * y + y;
             cell = Crafty.e("2D, Mouse, Cell")
-                .attr({id: ++id, x: x * radius, y:  y * radius})
+                .attr({id: id, x: x * radius, y:  y * radius})
                 .bind('MouseDown', click);
             currentRow.push(cell);
             grid.push(cell);
@@ -110,7 +109,6 @@ window.onload = function () {
         // clear previous cell to prevent wrapped neighbors
         previousCell = false;
     }
-    id = 0;
 
     // use dfs to create our maze
     function dfsCreate(startCell) {
@@ -140,8 +138,7 @@ window.onload = function () {
         }
     }
     dfsCreate(grid[Math.floor(Math.random() * grid.length)]);
-    console.log(grid);
     for (g = 0; g < grid.length; g++) {
         grid[g].drawWalls();
     }
-};
+};
\ No newline at end of file
diff --git a/crafty-maze/trail.js b/crafty-maze/trail.js
index c986bff..5ba1894 100644
--- a/crafty-maze/trail.js
+++ b/crafty-maze/trail.js
@@ -14,8 +14,8 @@
             // starting cell. this could be changed to draw an arrow, for example, in the direct of "end"
             var centerX = start.x + (start.radius / 2),
                 centerY = start.y + (start.radius / 2),
-                width = Math.ceil(start.radius / 10),
-                height = Math.ceil(start.radius/ 10),
+                width = Math.ceil(start.radius / 6),
+                height = Math.ceil(start.radius/ 6),
                 t;
             // cells are aligned as such:
             // | x, y |
@@ -32,21 +32,25 @@
                 // change this square to be a horizontal rectangle
                 width = start.radius;
                 // move the rectangle to the left so that it crosses the border of the empty wall of the two cells
-                centerX = centerX - start.radius + height;
-            } else if (start.x < end.x) {
-                // is the first cell to the right of the second cell (Note: it could be neither if it is above or below)
+                centerX = centerX - start.radius;
+            }
+            // is the first cell to the right of the second cell (Note: it could be neither if it is above or below)
+            if (start.x < end.x) {
                 // change this square to be a horizontal rectangle
                 width = start.radius;
                 // there is no need to move this, as x,y starts at the center and we've grown this rectangle
                 // to the right
-            } else if (start.y > end.y) {
-                // is the first cell below the second cell
+            }
+            // is the first cell below the second cell
+            if (start.y > end.y) {
                 height = start.radius;
-                centerY = centerY - start.radius + width;
-            } else if (start.y < end.y) {
-              // is the first cell above the second cell (Note: it could be neither if it is to the right or left)
+                centerY = centerY - start.radius;
+            }
+            // is the first cell above the second cell (Note: it could be neither if it is to the right or left)
+            if (start.y < end.y) {
                 height = start.radius;
             }
+
             // show the trail as an animation
             if (this.slow) {
                 timeout += 25;
@@ -64,4 +68,4 @@
             });
         }
     });
-}(Crafty));
+}(Crafty));
\ No newline at end of file
