#include<bits/stdc++.h>

using namespace std;

struct Tree{
    int data;
    struct Tree* left;
    struct Tree* right;

    Tree(int val){
        data = val;
        left = NULL;
        right = NULL;
    }
};

void preorder(struct Tree* root){
    if(root==NULL)
    return;
    cout<<root->data<<" ";
    preorder(root->left);
    preorder(root->right);
}

void inorder(struct Tree* root){
    if(root==NULL)
    return;
    inorder(root->left);
    cout<<root->data<<" ";
    inorder(root->right);
}

void postorder(struct Tree* root){
    if(root==NULL)
    return;
    postorder(root->left);
    postorder(root->right);
    cout<<root->data<<" ";
}

int main(){
    struct Tree* root = new Tree(1);
    root->left = new Tree(2);
    root->right = new Tree(3);
    root->left->left = new Tree(4);
    root->left->right = new Tree(5);
    root->right->left = new Tree(6);
    root->right->right = new Tree(7);

    preorder(root);
    cout<<endl;
    inorder(root);
    cout<<endl;
    postorder(root);

    return 0;
}