class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(number) {
    let node = this.root;

    for (let digit of number) {
      if (node.isEnd) {
       
        return false;
      }

      if (!node.children[digit]) {
        node.children[digit] = new TrieNode();
      }

      node = node.children[digit];
    }

 
    if (Object.keys(node.children).length > 0) {
      return false;
    }

    node.isEnd = true;
    return true;
  }
}

function solution(phone_book) {
  const trie = new Trie();

  phone_book.sort();

  for (let number of phone_book) {
    if (!trie.insert(number)) {
      return false;
    }
  }

  return true;
}
