//This component represents a boundary element that toggles on click. It is
//a node in the boundary hierarchy tree. Has to have an onclick listener which basically
//fetches the children on toggle. Closes up on toggle as well. HOw to implement this?
// Each element will have a URL property which will fetch its child nodes.
// Has to store ID as well?
/*
Example JSON:

active: 2
boundary_category: 11
boundary_type: 1
id: 9402
name: " 7 mile camp   "
parent: 491

1. What boundary_type/cat is school? Schools will have classes? 
2. How to find out when we reach the leaf node in the tree?
3. How to listen to onclick on "PrimarySchool/PreSchool" and then display the appropriate
tree? [Tackle first]
4. Hook up onclick listeners to each node of the tree and then perform action.
5. MainContentArea - show some static content there
*/