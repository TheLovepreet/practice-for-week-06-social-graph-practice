// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    let idNumber = 0;
    for(let key in this.users){
      idNumber++;
    }
    let follows = new Set();
    let user = {};
    user["id"] = idNumber+1;
    user["name"] = name;
    

    this.users[idNumber+1] = user;
    this.follows[idNumber+1] = follows;
    return idNumber+1;
  }

  getUser(userID) {
    // Your code here
    if(this.users[userID]){
      return this.users[userID];
    }
    return null;
  }

  follow(userID1, userID2) {
    // Your code here
    if(this.users[userID1] && this.users[userID2]){
    this.follows[userID1].add(userID2);
    return true;
  }
  return false;
}

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();
    for(let key in this.users){
      if(this.follows[key].has(userID) == true){
      if(Number(key) !== userID){
        followers.add(Number(key));
      }
    }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let visited = new Set();
    let paths = [];
    let recommended = [];
    let currentPath = 0;
    paths.push([userID]);
    visited.add(userID);
    

    while(paths.length !== 0){
      currentPath = paths.shift();
      let currentNode = currentPath[currentPath.length-1];
      if(visited.has(currentNode) == false){
        visited.add(currentNode);

      if(currentPath.length > 1 && currentPath.length <= degrees + 1){
        recommended.push(currentNode);
      }

      let neighbours = this.getFollows(currentNode);
      for(let i = 0; i < Object.key(neighbours).length;i++){
        let pathCopy = [...currentPath];
        pathCopy.push(neighbours[i]);
        paths.push(pathCopy);
      }
    }
    }
  return recommended;
  }
}

module.exports = SocialNetwork;