///////////////////////
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node(int val) {
        data = val;
        left = NULL;
        right = NULL;
    }
};

class BST {
    Node* root;
public:
    BST() {
        root = NULL;
    }
    void insertElement(int val);
};

void BST::insertElement(int val) {
    Node* new_node = new Node(val);
    if (root == NULL) {
        root = new_node;
        return;
    } else {
        Node* temp = root;
        while (temp != NULL) {
            if (new_node->data == temp->data) {
                cout << "Duplicate value" << endl;
                return;
            } else if (new_node->data < temp->data) {
                if (temp->left == NULL) {
                    temp->left = new_node;
                    return;
                } else {
                    temp = temp->left;
                }
            } else {
                if (temp->right == NULL) {
                    temp->right = new_node;
                    return;
                } else {
                    temp = temp->right;
                }
            }
        }
    }
}

int main() {
    BST tree;
    tree.insertElement(30);
    tree.insertElement(18);
    tree.insertElement(45);
    tree.insertElement(10);
    tree.insertElement(42);
    tree.insertElement(67);
    tree.insertElement(18);
    tree.insertElement(10);
    tree.insertElement(45);
    return 0;
}
