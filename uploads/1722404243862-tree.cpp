#include<bits/stdc++.h>
using namespace std;

class Node{
    public:
    int data;
    Node* left;
    Node* right;
    Node(int val){
        data = val;
        left = NULL;
        right = NULL;
    }
};

class BST{
    Node *root;
    public:
    //  int count=1;
     BST()
    {
        root = NULL;
    }
   void insertElement(int val);
};
// 30 18 45 10 42 67 18 10 45
void BST :: insertElement(int val){
    Node* new_node = new Node(val);
    if(root == NULL){                     //------------------->1
        root = new_node;            
        return ;
    }else{
        Node* temp = root;
        while(temp!=NULL)
        {
            if(new_node -> data == temp->data)             //------------------->2
            {
                // count++;
                cout<<"Duplicate value";//<<"times"<<endl;
                return;
            }else if(new_node -> data < temp->data)                         //------------------->3
            {
                if(temp->left ==NULL) 
                {
                   temp -> left = new_node;
                      return ;
                 }
                else if(new_node->data < temp->data){
                    temp = temp->left;
                    }         //------------------->4
                else if(new_node -> data >temp->data)              //------------------->5
                {
                    if(temp->right == NULL)
                     {
                         temp->right = new_node;
                      break;
                      }
                    }
                else{
                    temp = temp->right;            //------------------->6
                }
            }
        }
    }
    return;
}

int main(){
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



